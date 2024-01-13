import { expressjwt } from 'express-jwt'
import { NextFunction, Request, Response } from 'express'
import jwt from 'jsonwebtoken'
import { JWTPayload } from '../utils/types'

export const checkJwt = expressjwt({
  secret: `${process.env.JWT_SECRET}`,
  algorithms: ['HS256']
})

export const decodeJwt = (req: Request, res: Response, next: NextFunction) => {
  const authorization = req.header('Authorization')
  const accessToken = authorization?.split(' ')[1] as string
  const decoded = jwt.decode(accessToken) as JWTPayload
  res.locals.user = { id: decoded?.id, email: decoded?.email }

  next()
}

export const routesExcludedFromJwtAuthentication = [
  '/v1/organization',
]