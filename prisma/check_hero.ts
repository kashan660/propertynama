import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  const page = await prisma.page.findUnique({
    where: { slug: 'home' },
    include: { sections: { orderBy: { order: 'asc' } } }
  })

  if (!page) {
    console.log("Home page not found in DB")
    return
  }

  const heroSection = page.sections.find(s => s.type === 'HERO')
  if (!heroSection) {
    console.log("Hero section not found in DB")
    return
  }

  const heroContent = JSON.parse(heroSection.content)
  console.log("Hero Content:", JSON.stringify(heroContent, null, 2))
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect())
