import bcrypt from 'bcrypt'
import User from '../db/models/user.model'
import { UserAttributes, UserLogin } from '../types'
import { Request, Response } from 'express'
import { createAccessToken } from '../utils/jwt.utils'

export const signUp = async (req: Request, res: Response): Promise<Response> => {
  // verificar si el email ya existe

  const user = {
    ...req.body
  }
  console.log(user)
  let userStored: User | null
  try {
    userStored = await User.findOne({ where: { email: user.email } })
  } catch (error) {
    userStored = null
  }

  if (userStored !== null) return res.status(400).json({ msg: 'User Already Exists' })

  // guardar y devolver nuevo usuario

  const salt = await bcrypt.genSalt(10)
  user.password = await bcrypt.hash(user.password, salt) // encriptar password

  const createUser: User = {
    ...user,
    idUser: Math.floor(Math.random() * 1000),
    idRol: 2
  }

  try {
    await User.create(createUser)
  } catch (error) {
    console.log(error)
  }

  return res.status(200).json({ msg: 'User registered succesfully' })
}

export const login = async (req: Request, res: Response): Promise<Response> => {
  const user = {
    ...req.body
  }

  let userStored: User | null

  try {
    userStored = await User.findOne({ where: { email: user.email } })
  } catch (error) {
    userStored = null
  }
  if (userStored === null) return res.status(403).json({ msg: 'User not exists' })

  if (await userStored.checkPassword(user.password) === false) return res.status(401).json({ msg: 'Password Incorrect' })

  const userLogin: UserLogin = {
    ...userStored.getNonSensibilityInfo(),
    token: createAccessToken(userStored.idUser)
  }

  return res.status(200).json(userLogin)
}

export const updateInfo = async (req: Request, res: Response): Promise<Response> => {
  // verificar si el email ya existe
  const user = { ...req.body }
  let userStored: User | null
  try {
    userStored = await User.findOne({ where: { email: user.email } })
  } catch (error) {
    userStored = null
  }

  if (userStored === null) return res.status(400).json({ msg: 'User not Exits' })
  if (userStored.idUser !== req.session.user?.idUser) return res.status(403).json({ msg: 'Unauthorized Action' })

  userStored.name = user.name
  userStored.phone = user.phone
  userStored.address = user.address
  await userStored.save()
  return res.status(200).json({ msg: 'User was updated' })
}

export const getUsers = async (_req: Request, res: Response): Promise<Response> => {
  try {
    const users: UserAttributes[] = await User.findAll()
    return res.status(200).json(users)
  } catch (e) {
    const error = new Error('There was an error')
    return res.status(400).json({ msg: error })
  }
}
