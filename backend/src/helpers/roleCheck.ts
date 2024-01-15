// import { Role } from '../entity/role'
// import { Permission } from '../entity/permission'
// import { Response } from 'express'
// import UserService from '../services/user.service'
// import { Status } from '../utils'

// export const checkPermission = async (
//   res: Response,
//   feature: string,
//   permName: string,
// ) => {
//   const user = await UserService.getCurrentUser(res)

//   if (!user) return false

//   if (user.status !== Status.ACTIVE) return false

//   const role = await Role.findOne({
//     where: { id: user?.roleId },
//   })

//   if (role?.name === 'super_admin') return true

//   const rolePermissions = await Permission.findOne({
//     where: { roleId: user?.roleId, feature },
//   })

//   const permissionExist = rolePermissions?.permission.includes(permName)

//   if (permissionExist) {
//     return true
//   } else {
//     return false
//   }
// }
