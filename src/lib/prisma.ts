import { Prisma, PrismaClient } from '@prisma/client'

// global に prisma クライアントを保存する
const globalForPrisma = global as unknown as { prisma: PrismaClient }

const prisma = globalForPrisma.prisma || new PrismaClient({
    log: [ "query" ]
})

if (process.env.NODE_ENV !== "production") {
    globalForPrisma.prisma = prisma
}

export { Prisma, prisma }