import jwt, { SignOptions } from 'jsonwebtoken'

export const createAccessToken = (id: number): string => {
  const signInOptions: SignOptions = {
    expiresIn: '30d'
  }
  return jwt.sign({ id }, process.env.JWT_SECRET ?? 'secret', signInOptions)
}
