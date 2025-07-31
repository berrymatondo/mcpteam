import { prisma } from "@/lib/db"

export type CreatePermissionData = {
  nom: string
  description?: string
  module: string
  action: string
}

export type UpdatePermissionData = Partial<CreatePermissionData>

export class PermissionService {
  static async create(data: CreatePermissionData) {
    return await prisma.permission.create({
      data,
    })
  }

  static async findById(id: string) {
    return await prisma.permission.findUnique({
      where: { id },
      include: {
        userPermissions: {
          include: {
            user: true,
          },
        },
      },
    })
  }

  static async findMany() {
    return await prisma.permission.findMany({
      include: {
        _count: {
          select: {
            userPermissions: true,
          },
        },
      },
      orderBy: { module: "asc" },
    })
  }

  static async update(id: string, data: UpdatePermissionData) {
    return await prisma.permission.update({
      where: { id },
      data,
    })
  }

  static async delete(id: string) {
    return await prisma.permission.delete({
      where: { id },
    })
  }

  static async assignToUser(userId: string, permissionId: string) {
    return await prisma.userPermission.create({
      data: {
        userId,
        permissionId,
      },
      include: {
        user: true,
        permission: true,
      },
    })
  }

  static async removeFromUser(userId: string, permissionId: string) {
    return await prisma.userPermission.delete({
      where: {
        userId_permissionId: {
          userId,
          permissionId,
        },
      },
    })
  }

  static async getUserPermissions(userId: string) {
    return await prisma.userPermission.findMany({
      where: { userId },
      include: {
        permission: true,
      },
    })
  }

  static async checkUserPermission(userId: string, module: string, action: string) {
    const permission = await prisma.userPermission.findFirst({
      where: {
        userId,
        permission: {
          module,
          action,
        },
      },
    })

    return !!permission
  }
}
