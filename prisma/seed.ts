import "dotenv/config"
import { PrismaClient } from "../src/generated/prisma/client"
import { PrismaNeon } from "@prisma/adapter-neon"
import { neonConfig } from "@neondatabase/serverless"
import ws from "ws"

neonConfig.webSocketConstructor = ws

const adapter = new PrismaNeon({ connectionString: process.env.DATABASE_URL! })
const prisma = new PrismaClient({ adapter })

const systemTypes = [
  { name: "Snippet", icon: "Code",       color: "#3b82f6", isSystem: true },
  { name: "Prompt",  icon: "Sparkles",   color: "#8b5cf6", isSystem: true },
  { name: "Command", icon: "Terminal",   color: "#f97316", isSystem: true },
  { name: "Note",    icon: "StickyNote", color: "#fde047", isSystem: true },
  { name: "File",    icon: "File",       color: "#6b7280", isSystem: true },
  { name: "Image",   icon: "Image",      color: "#ec4899", isSystem: true },
  { name: "Link",    icon: "Link",       color: "#10b981", isSystem: true },
]

async function main() {
  console.log("Seeding system item types...")

  for (const type of systemTypes) {
    const existing = await prisma.itemType.findFirst({
      where: { name: type.name, userId: null },
    })
    if (existing) {
      await prisma.itemType.update({
        where: { id: existing.id },
        data:  { icon: type.icon, color: type.color },
      })
    } else {
      await prisma.itemType.create({ data: { ...type, userId: null } })
    }
    console.log(`  ✓ ${type.name}`)
  }

  console.log("\nDone.")
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(() => prisma.$disconnect())
