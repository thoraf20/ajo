import { RequestHandler } from "express"
import httpStatus from 'http-status-codes'
import Joi from "joi"
import { APIError } from "../utils"
import { OrganizationService } from "../services/organization.service"

export const createOrganizationHandler: RequestHandler = async (req, res, next) => {
  const requestSchema = Joi.object({
    name: Joi.string().required(),
    logo: Joi.string(),
  })

  const { value, error } = requestSchema.validate(req.body)

  if (error) {
    return next(new APIError({
      code: 90,
      status: httpStatus.BAD_REQUEST,
      message: error.message
    }))
  }

  const organization = await OrganizationService.findByName(value.name)

   if (
     organization && organization?.name.toLowerCase() === value.name.toLowerCase()
   ) {
     return next(
       new APIError({
         code: 90,
         status: httpStatus.CONFLICT,
         message: 'organization already exists',
       })
     )
   }

   const createdOrg = await OrganizationService.create(value)

   return res.status(httpStatus.CREATED).json({
     data: createdOrg,
   })
}

export const getOrganizationHandler: RequestHandler = async (
  req,
  res,
  next
) => {
  const requestSchema = Joi.object({
    organizationId: Joi.string().uuid().required(),
  })

  const { error, value } = requestSchema.validate(req.query)

  if (error) {
    return next(
      new APIError({
        code: 90,
        status: httpStatus.BAD_REQUEST,
        message: error.message,
      })
    )
  }
  // const isAllowed = await checkPermission(
  //   res,
  //   AppFeature.Organization,
  //   'can_view'
  // )

  // if (!isAllowed) {
  //   return next(
  //     new APIError({
  //       code: 92,
  //       status: httpStatus.FORBIDDEN,
  //       message: 'unauthorize',
  //     })
  //   )
  // }

  const organization = await OrganizationService.findById(value.organizationId)

  if (!organization) {
    return next(
      new APIError({
        code: 92,
        status: httpStatus.NOT_FOUND,
        message: 'organization not found',
      })
    )
  }

  return res.status(httpStatus.OK).json({
    responseCode: '00',
    data: organization,
  })
}