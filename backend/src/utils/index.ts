import { StatusCodes } from 'http-status-codes'
import * as jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import { JWTPayload } from './types'

export function APIError({
  code,
  message,
  status,
}: {
  code: number
  message: string
  status: StatusCodes
}) {
  this.code = code
  this.message = message
  this.status = status
  this.name = 'APIError'
}

export const generateRandomAlphaNumeric = (length: number) => {
  let s = ''
  Array.from({ length }).some(() => {
    s += Math.random().toString(36).slice(2)
    return s.length >= length
  })
  return s.slice(0, length)
}

export const generateSlug = (name: string) => {
  return `${name.toLowerCase().replace(/\s+/g, '-')}`
}

export const hashPassword = (password: string): string => {
  return bcrypt.hashSync(password, 10)
}

export const comparePassword = (password: string, hash: string): boolean => {
  return bcrypt.compareSync(password, hash)
}

export const generateAccessToken = (input: JWTPayload): string => {
  return jwt.sign({ ...input }, `${process.env.JWT_SECRET}`, {
    expiresIn: `${process.env.JWT_SECRET_EXPIRATION}`,
  })
}

export const generatePasswordToken = (input: string): string => {
  return jwt.sign({ input }, `${process.env.JWT_SECRET}`, {
    expiresIn: `${process.env.JWT_SECRET_EXPIRATION}`,
  })
}

export const verifyJWT = (token: string) => {
  try {
    return {
      payload: jwt.verify(token, `${process.env.JWT_SECRET}`),
      expired: false,
    }
  } catch (error) {
    if ((error as Error).name == 'jwt expired') {
      return { payload: jwt.decode(token) as JWTPayload, expired: true }
    }
    throw error
  }
}

export * from './enum'