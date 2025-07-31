import { prisma } from "@/lib/db"
import type { CandidatureStatut, Prisma } from "@prisma/client"

export type CreateCandidatureData = {
  nom: string
  prenom: string
  email: string
  telephone?: string
  motivation: string
  cv?: string
  poleId: string
  evaluateurId?: string
  commentaires?: string
  dateEntretien?: Date
}

export type UpdateCandidatureData = Partial<CreateCandidatureData> & {
  statut?: CandidatureStatut
}

export type CandidatureFilters = {
  searchTerm?: string
  poleId?: string
  statut?: CandidatureStatut
  evaluateurId?: string
}

export class CandidatureService {
  static async create(data: CreateCandidatureData) {
    return await prisma.candidature.create({
      data,
      include: {
        pole: true,
        evaluateur: true,
      },
    })
  }

  static async findById(id: string) {
    return await prisma.candidature.findUnique({
      where: { id },
      include: {
        pole: true,
        evaluateur: true,
      },
    })
  }

  static async findMany(filters: CandidatureFilters = {}, page = 1, limit = 10) {
    const where: Prisma.CandidatureWhereInput = {}

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

    if (filters.evaluateurId) {
      where.evaluateurId = filters.evaluateurId
    }

    const [candidatures, total] = await Promise.all([
      prisma.candidature.findMany({
        where,
        include: {
          pole: true,
          evaluateur: true,
        },
        skip: (page - 1) * limit,
        take: limit,
        orderBy: { createdAt: "desc" },
      }),
      prisma.candidature.count({ where }),
    ])

    return {
      candidatures,
      total,
      pages: Math.ceil(total / limit),
      currentPage: page,
    }
  }

  static async update(id: string, data: UpdateCandidatureData) {
    return await prisma.candidature.update({
      where: { id },
      data,
      include: {
        pole: true,
        evaluateur: true,
      },
    })
  }

  static async delete(id: string) {
    return await prisma.candidature.delete({
      where: { id },
    })
  }

  static async getStats() {
    const [total, parStatut, parPole, recent] = await Promise.all([
      prisma.candidature.count(),
      prisma.candidature.groupBy({
        by: ["statut"],
        _count: true,
      }),
      prisma.candidature.groupBy({
        by: ["poleId"],
        _count: true,
      }),
      prisma.candidature.count({
        where: {
          createdAt: {
            gte: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000), // 7 jours
          },
        },
      }),
    ])

    return {
      total,
      parStatut,
      parPole,
      recent,
    }
  }
}
