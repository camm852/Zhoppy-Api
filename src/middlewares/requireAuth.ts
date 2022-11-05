import jwt from 'jsonwebtoken'
import User from '../db/models/user.model'
import { JWT } from '../types'
import { Request, Response, RequestHandler, NextFunction } from 'express'

const requireAuth: RequestHandler = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
  let token = ''
  if (
    req.headers.authorization !== undefined && !!req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      token = req.headers.authorization.split(' ')[1]
      const decodedToken = jwt.verify(token, process.env.JWT_SECRET ?? 'secret') as JWT

      const user = await User.findByPk(decodedToken.id)

      req.session.user = user?.toJSON()
    } catch (error) {
      return res.status(404).json({ msg: 'There was an error' })
    }
  }
  if (token === '') {
    const error = new Error('Invalid token')
    return res.status(403).json({ msg: error.message })
  }

  return next() // next middleware
}

export default requireAuth
