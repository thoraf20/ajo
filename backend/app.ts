import express, { Request, Response, NextFunction } from 'express'
import helmet from 'helmet'
import cookieParser from 'cookie-parser'
import dotenv from 'dotenv'
import cors from 'cors'
import 'reflect-metadata'
import httpStatus from 'http-status-codes'
import { requestLogger } from './src/middleware/requestLogger'
import { checkJwt, decodeJwt, routesExcludedFromJwtAuthentication } from './src/middleware/authenticate'
import { dataSource } from './src/config'
import logger from './src/lib/logger'
import { APIError } from './src/utils'
import v1Router from './urls'
import v1APIRouter from './apiUrls'

dotenv.config()

const unless = (path: string[], middleware: any) => {
  return (req: Request, res: Response, next: NextFunction) => {
    if (path.includes(req.path)) {
      return next()
    } else {
      return middleware(req, res, next)
    }
  }
}

const app = express()
const port = process.env.PORT || 4002

app.use(cors())
app.use(express.json({ limit: '50mb' }))
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())
app.use(requestLogger)

// API Handlers
app.use(
  '/api/v1',
  (req, res, next) => {
    const authorization = req.header('Authorization')
    const accessToken = authorization?.split(' ')[1] as string

    if (!accessToken) {
      return next(
        new APIError({
          code: 90,
          message: `No authorization token found`,
          status: httpStatus.FORBIDDEN,
        })
      )
    }
    res.locals.user = { secret: accessToken }
    res.locals.source = 'API'
    // res.locals.user = { id: '07e63dc5-ffc2-42e6-bb2e-c76967c2241b' } // TODO: HMAC Authentication for third-party consumers

    next()
  },
  v1APIRouter
)


app.use(unless(routesExcludedFromJwtAuthentication, checkJwt), decodeJwt)
app.use('/v1', v1Router)

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore

  return res.status(err.status).json({ message: err.message, code: err.code })
})

// Security
if (process.env.NODE_ENV === 'production') {
  app.use(helmet())
}

// establish database connection
dataSource.initialize().catch((err) => {
  logger.error('Database connection error: ', err)
})

app.listen(port, () => {
  logger.info(`Server is up and running at port: ${port}.`)
})

export default app