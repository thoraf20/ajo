import { Request, Response, NextFunction } from 'express'
import logger from '../lib/logger'
import dotenv from 'dotenv'

dotenv.config()

const requestLogger = (req: Request, res: Response, next: NextFunction) => {
  const log = `${req.method}: ${req.url}`
  logger.http(log)

  next()
}

export { requestLogger }
