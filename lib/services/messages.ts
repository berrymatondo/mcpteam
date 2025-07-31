import { prisma } from "@/lib/db"
import type { Prisma } from "@prisma/client"

export type CreateMessageData = {
  contenu: string
  senderId: string
  receiverId: string
}

export type MessageFilters = {
  userId?: string
  conversationWith?: string
  unreadOnly?: boolean
}

export class MessageService {
  static async create(data: CreateMessageData) {
    return await prisma.message.create({
      data,
      include: {
        sender: true,
        receiver: true,
      },
    })
  }

  static async findById(id: string) {
    return await prisma.message.findUnique({
      where: { id },
      include: {
        sender: true,
        receiver: true,
      },
    })
  }

  static async findMany(filters: MessageFilters = {}, page = 1, limit = 20) {
    const where: Prisma.MessageWhereInput = {}

    if (filters.userId) {
      where.OR = [{ senderId: filters.userId }, { receiverId: filters.userId }]
    }

    if (filters.conversationWith && filters.userId) {
      where.OR = [
        { senderId: filters.userId, receiverId: filters.conversationWith },
        { senderId: filters.conversationWith, receiverId: filters.userId },
      ]
    }

    if (filters.unreadOnly) {
      where.lu = false
    }

    const [messages, total] = await Promise.all([
      prisma.message.findMany({
        where,
        include: {
          sender: true,
          receiver: true,
        },
        skip: (page - 1) * limit,
        take: limit,
        orderBy: { createdAt: "desc" },
      }),
      prisma.message.count({ where }),
    ])

    return {
      messages,
      total,
      pages: Math.ceil(total / limit),
      currentPage: page,
    }
  }

  static async markAsRead(id: string) {
    return await prisma.message.update({
      where: { id },
      data: { lu: true },
    })
  }

  static async markConversationAsRead(userId: string, conversationWith: string) {
    return await prisma.message.updateMany({
      where: {
        senderId: conversationWith,
        receiverId: userId,
        lu: false,
      },
      data: { lu: true },
    })
  }

  static async delete(id: string) {
    return await prisma.message.delete({
      where: { id },
    })
  }

  static async getConversations(userId: string) {
    const conversations = await prisma.$queryRaw`
      SELECT DISTINCT
        CASE 
          WHEN sender_id = ${userId} THEN receiver_id
          ELSE sender_id
        END as user_id,
        MAX(created_at) as last_message_date,
        COUNT(CASE WHEN receiver_id = ${userId} AND lu = false THEN 1 END) as unread_count
      FROM messages
      WHERE sender_id = ${userId} OR receiver_id = ${userId}
      GROUP BY user_id
      ORDER BY last_message_date DESC
    `

    return conversations
  }

  static async getUnreadCount(userId: string) {
    return await prisma.message.count({
      where: {
        receiverId: userId,
        lu: false,
      },
    })
  }
}
