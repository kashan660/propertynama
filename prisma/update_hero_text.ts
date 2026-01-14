
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  console.log('Updating Hero Text...')

  const page = await prisma.page.findUnique({
    where: { slug: 'home' },
    include: { sections: true }
  })

  if (!page) {
    console.error('Home page not found!')
    return
  }

  const heroSection = page.sections.find(s => s.type === 'HERO')
  if (!heroSection) {
    console.error('Hero section not found!')
    return
  }

  const content = JSON.parse(heroSection.content)
  
  // Update title and subtitle
  content.title = "RIGHT PLACE TO SECURE YOUR INVESTMENT"
  content.subtitle = "We Suggest The Best Investment Opportunity"
  
  await prisma.section.update({
    where: { id: heroSection.id },
    data: {
      content: JSON.stringify(content)
    }
  })

  console.log('Hero section text updated successfully!')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
