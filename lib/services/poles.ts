import { prisma } from "@/lib/db"
import type { Prisma } from "@prisma/client"

export type CreatePoleData = {
  nom: string
  description?: string
  couleur?: string
  icone?: string
  responsableId?: string
}

export type UpdatePoleData = Partial<CreatePoleData>

export type PoleFilters = {
  searchTerm?: string
  responsableId?: string
}

export class PoleService {
  static async create(data: CreatePoleData) {
    return await prisma.pole.create({
      data,
      include: {
        membres: true,
        _count: {
          select: {
            membres: true,
            candidatures: true,
            events: true,
          },
        },
      },
    })
  }

  static async findById(id: string) {
    return await prisma.pole.findUnique({
      where: { id },
      include: {
        membres: true,
        candidatures: {
          include: {
            evaluateur: true,
          },
        },
        events: {
          include: {
            organisateur: true,
          },
        },
        _count: {
          select: {
            membres: true,
            candidatures: true,
            events: true,
          },
        },
      },
    })
  }

  static async findMany(filters: PoleFilters = {}, page = 1, limit = 10) {
    const where: Prisma.PoleWhereInput = {}

    if (filters.searchTerm) {
      where.OR = [
        { nom: { contains: filters.searchTerm, mode: "insensitive" } },
        { description: { contains: filters.searchTerm, mode: "insensitive" } },
      ]
    }

    const [poles, total] = await Promise.all([
      prisma.pole.findMany({
        where,
        include: {
          membres: true,
          _count: {
            select: {
              membres: true,
              candidatures: true,
              events: true,
            },
          },
        },
        skip: (page - 1) * limit,
        take: limit,
        orderBy: { nom: "asc" },
      }),
      prisma.pole.count({ where }),
    ])

    return {
      poles,
      total,
      pages: Math.ceil(total / limit),
      currentPage: page,
    }
  }

  static async update(id: string, data: UpdatePoleData) {
    return await prisma.pole.update({
      where: { id },
      data,
      include: {
        membres: true,
        _count: {
          select: {
            membres: true,
            candidatures: true,
            events: true,
          },
        },
      },
    })
  }

  static async delete(id: string) {
    return await prisma.pole.delete({
      where: { id },
    })
  }

  static async getStats() {
    const [total, withMembers, avgMembersPerPole] = await Promise.all([
      prisma.pole.count(),
      prisma.pole.count({
        where: {
          membres: {
            some: {},
          },
        },
      }),
      prisma.pole.aggregate({
        _avg: {
          membres: {
            _count: true,
          },
        },
      }),
    ])

    return {
      total,
      withMembers,
      withoutMembers: total - withMembers,
      avgMembersPerPole: avgMembersPerPole._avg || 0,
    }
  }
}
