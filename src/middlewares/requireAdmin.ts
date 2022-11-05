import { Request, Response, NextFunction } from 'express'

const requireAdmin = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
  if (req.session.user?.idRol === 1) return next()
  else return res.status(403).json({ msg: 'User must be admin' })
}

export default requireAdmin
