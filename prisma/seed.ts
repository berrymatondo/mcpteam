import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  await prisma.pole.createMany({
    data: [
      { id: 'dev', name: 'Development' },
      { id: 'design', name: 'Design' },
      { id: 'marketing', name: 'Marketing' },
    ],
  })
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
