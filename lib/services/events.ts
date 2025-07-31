import { prisma } from "@/lib/db"
import type { EventType, EventStatut, ParticipationStatut, Prisma } from "@prisma/client"

export type CreateEventData = {
  titre: string
  description?: string
  dateDebut: Date
  dateFin: Date
  lieu?: string
  capacite?: number
  type: EventType
  organisateurId: string
  poleId?: string
}

export type UpdateEventData = Partial<CreateEventData> & {
  statut?: EventStatut
}

export type EventFilters = {
  searchTerm?: string
  type?: EventType
  statut?: EventStatut
  organisateurId?: string
  poleId?: string
  dateDebut?: Date
  dateFin?: Date
  capaciteMin?: number
  capaciteMax?: number
  selectedOrganisateurs?: string[]
  selectedLieux?: string[]
}

export class EventService {
  static async create(data: CreateEventData) {
    return await prisma.event.create({
      data,
      include: {
        organisateur: true,
        pole: true,
        participants: {
          include: {
            user: true,
          },
        },
        _count: {
          select: {
            participants: true,
          },
        },
      },
    })
  }

  static async findById(id: string) {
    return await prisma.event.findUnique({
      where: { id },
      include: {
        organisateur: true,
        pole: true,
        participants: {
          include: {
            user: true,
          },
        },
        _count: {
          select: {
            participants: true,
          },
        },
      },
    })
  }

  static async findMany(filters: EventFilters = {}, page = 1, limit = 10) {
    const where: Prisma.EventWhereInput = {}

    if (filters.searchTerm) {
      where.OR = [
        { titre: { contains: filters.searchTerm, mode: "insensitive" } },
        { description: { contains: filters.searchTerm, mode: "insensitive" } },
        { lieu: { contains: filters.searchTerm, mode: "insensitive" } },
      ]
    }

    if (filters.type) {
      where.type = filters.type
    }

    if (filters.statut) {
      where.statut = filters.statut
    }

    if (filters.organisateurId) {
      where.organisateurId = filters.organisateurId
    }

    if (filters.poleId) {
      where.poleId = filters.poleId
    }

    if (filters.dateDebut) {
      where.dateDebut = { gte: filters.dateDebut }
    }

    if (filters.dateFin) {
      where.dateFin = { lte: filters.dateFin }
    }

    if (filters.capaciteMin) {
      where.capacite = { gte: filters.capaciteMin }
    }

    if (filters.capaciteMax) {
      where.capacite = { ...where.capacite, lte: filters.capaciteMax }
    }

    if (filters.selectedOrganisateurs && filters.selectedOrganisateurs.length > 0) {
      where.organisateur = {
        OR: filters.selectedOrganisateurs.map((nom) => ({
          OR: [{ nom: { contains: nom, mode: "insensitive" } }, { prenom: { contains: nom, mode: "insensitive" } }],
        })),
      }
    }

    if (filters.selectedLieux && filters.selectedLieux.length > 0) {
      where.lieu = {
        in: filters.selectedLieux,
      }
    }

    const [events, total] = await Promise.all([
      prisma.event.findMany({
        where,
        include: {
          organisateur: true,
          pole: true,
          participants: {
            include: {
              user: true,
            },
          },
          _count: {
            select: {
              participants: true,
            },
          },
        },
        skip: (page - 1) * limit,
        take: limit,
        orderBy: { dateDebut: "desc" },
      }),
      prisma.event.count({ where }),
    ])

    return {
      events,
      total,
      pages: Math.ceil(total / limit),
      currentPage: page,
    }
  }

  static async update(id: string, data: UpdateEventData) {
    return await prisma.event.update({
      where: { id },
      data,
      include: {
        organisateur: true,
        pole: true,
        participants: {
          include: {
            user: true,
          },
        },
        _count: {
          select: {
            participants: true,
          },
        },
      },
    })
  }

  static async delete(id: string) {
    return await prisma.event.delete({
      where: { id },
    })
  }

  static async addParticipant(eventId: string, userId: string, statut: ParticipationStatut = "CONFIRME") {
    return await prisma.eventParticipant.create({
      data: {
        eventId,
        userId,
        statut,
      },
      include: {
        user: true,
        event: true,
      },
    })
  }

  static async removeParticipant(eventId: string, userId: string) {
    return await prisma.eventParticipant.delete({
      where: {
        eventId_userId: {
          eventId,
          userId,
        },
      },
    })
  }

  static async getStats() {
    const [total, parStatut, parType, prochains, passes] = await Promise.all([
      prisma.event.count(),
      prisma.event.groupBy({
        by: ["statut"],
        _count: true,
      }),
      prisma.event.groupBy({
        by: ["type"],
        _count: true,
      }),
      prisma.event.count({
        where: {
          dateDebut: {
            gte: new Date(),
          },
        },
      }),
      prisma.event.count({
        where: {
          dateDebut: {
            lt: new Date(),
          },
        },
      }),
    ])

    return {
      total,
      parStatut,
      parType,
      prochains,
      passes,
    }
  }
}
