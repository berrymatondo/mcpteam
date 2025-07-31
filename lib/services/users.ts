import { prisma } from "@/lib/db"
import type { UserStatut, UserRole, Prisma } from "@prisma/client"

export type CreateUserData = {
  email: string
  nom: string
  prenom: string
  telephone?: string
  avatar?: string
  statut?: UserStatut
  role?: UserRole
  poleId?: string
  dateNaissance?: Date
  dateEmbauche?: Date
  adresse?: string
  ville?: string
  codePostal?: string
  competences?: string[]
  bio?: string
}

export type UpdateUserData = Partial<CreateUserData>

export type UserFilters = {
  searchTerm?: string
  poleId?: string
  statut?: UserStatut
  role?: UserRole
}

export class UserService {
  static async create(data: CreateUserData) {
    return await prisma.user.create({
      data,
      include: {
        pole: true,
        _count: {
          select: {
            eventsOrganises: true,
            eventsParticipes: true,
          },
        },
      },
    })
  }

  static async findById(id: string) {
    return await prisma.user.findUnique({
      where: { id },
      include: {
        pole: true,
        eventsOrganises: true,
        eventsParticipes: {
          include: {
            event: true,
          },
        },
        permissions: {
          include: {
            permission: true,
          },
        },
        _count: {
          select: {
            candidatures: true,
            eventsOrganises: true,
            eventsParticipes: true,
            messagesEnvoyes: true,
            messagesRecus: true,
          },
        },
      },
    })
  }

  static async findMany(filters: UserFilters = {}, page = 1, limit = 10) {
    const where: Prisma.UserWhereInput = {}

    if (filters.searchTerm) {
      where.OR = [
        { nom: { contains: filters.searchTerm, mode: "insensitive" } },
        { prenom: { contains: filters.searchTerm, mode: "insensitive" } },
        { email: { contains: filters.searchTerm, mode: "insensitive" } },
      ]
    }

    if (filters.poleId) {
      where.poleId = filters.poleId
    }

    if (filters.statut) {
      where.statut = filters.statut
    }

    if (filters.role) {
      where.role = filters.role
    }

    const [users, total] = await Promise.all([
      prisma.user.findMany({
        where,
        include: {
          pole: true,
          _count: {
            select: {
              eventsOrganises: true,
              eventsParticipes: true,
            },
          },
        },
        skip: (page - 1) * limit,
        take: limit,
        orderBy: { createdAt: "desc" },
      }),
      prisma.user.count({ where }),
    ])

    return {
      users,
      total,
      pages: Math.ceil(total / limit),
      currentPage: page,
    }
  }

  static async update(id: string, data: UpdateUserData) {
    return await prisma.user.update({
      where: { id },
      data,
      include: {
        pole: true,
        _count: {
          select: {
            eventsOrganises: true,
            eventsParticipes: true,
          },
        },
      },
    })
  }

  static async delete(id: string) {
    return await prisma.user.delete({
      where: { id },
    })
  }

  static async getStats() {
    const [total, actifs, parPole, parRole] = await Promise.all([
      prisma.user.count(),
      prisma.user.count({ where: { statut: "ACTIF" } }),
      prisma.user.groupBy({
        by: ["poleId"],
        _count: true,
        where: { poleId: { not: null } },
      }),
      prisma.user.groupBy({
        by: ["role"],
        _count: true,
      }),
    ])

    return {
      total,
      actifs,
      inactifs: total - actifs,
      parPole,
      parRole,
    }
  }
}
