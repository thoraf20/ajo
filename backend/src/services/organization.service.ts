import { generateSlug } from "../utils";
import { Organization } from "../entity/organization";
import { Role } from "../entity/role";
import { Feature } from "../entity/feature";
import { Permission } from "../entity/permission";
import { dataSource } from "../config";

export class OrganizationService {
  static create = async (
    data: { name: string, logo: string }
  ): Promise<{ organization: Organization; super_admin: string }> => {
    const newOrganization = new Organization()
    newOrganization.name = data.name
    ;(newOrganization.logo = data.logo),
      (newOrganization.slug = generateSlug(data.name))

    await newOrganization.save()

    const newRole = new Role()
    ;(newRole.organizationId = newOrganization.id),
      (newRole.name = 'super_admin'),
      await newRole.save()

    const features = await Feature.find()

    features.map(async (feature) => {
      await dataSource
        .getRepository(Permission)
        .createQueryBuilder('permission')
        .insert()
        .into(Permission)
        .values({
          roleId: newRole.id,
          feature: feature.name,
          permission: feature.permission,
        })
        .execute()
    })

    return { organization: newOrganization, super_admin: newRole.id }
  }

  static findByName = async (name: string): Promise<Organization | null> => {
    const organization = await Organization.findOne({ where: { name } })

    return organization
  }

  static findById = async (id: string): Promise<Organization | null> => {
    const organization = await Organization.findOne({ where: { id } })

    return organization
  }
}