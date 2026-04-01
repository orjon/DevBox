import "dotenv/config"
import { PrismaClient } from "../src/generated/prisma/client"
import { PrismaNeon } from "@prisma/adapter-neon"
import { neonConfig } from "@neondatabase/serverless"
import ws from "ws"

neonConfig.webSocketConstructor = ws

const adapter = new PrismaNeon({
  connectionString: process.env.DATABASE_URL!,
})
const prisma = new PrismaClient({ adapter })

async function main() {
  console.log("Connecting to database...")

  const [userCount, itemCount, collectionCount, itemTypes] = await Promise.all([
    prisma.user.count(),
    prisma.item.count(),
    prisma.collection.count(),
    prisma.itemType.findMany({ include: { _count: { select: { items: true } } } }),
  ])

  console.log("Connection successful!\n")
  console.log(`  users:       ${userCount}`)
  console.log(`  items:       ${itemCount}`)
  console.log(`  collections: ${collectionCount}`)
  console.log(`  item types:  ${itemTypes.length}\n`)

  if (itemTypes.length > 0) {
    console.log("Item type breakdown:")
    for (const type of itemTypes) {
      console.log(`  ${type.name.padEnd(12)} ${type._count.items} item(s)`)
    }
    const totalFromTypes = itemTypes.reduce((sum, t) => sum + t._count.items, 0)
    console.log(`\n  total items: ${totalFromTypes}`)
  } else {
    console.log("No item types found.")
  }
}

main()
  .catch((e) => {
    console.error("Database connection failed:", e)
    process.exit(1)
  })
  .finally(() => prisma.$disconnect())
