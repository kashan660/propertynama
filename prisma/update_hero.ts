import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  console.log('Starting Hero section update...')

  // Ensure Home page exists
  const homePage = await prisma.page.upsert({
    where: { slug: 'home' },
    update: {},
    create: {
      slug: 'home',
      title: 'PropertyNama - Real Estate consultant',
      metaTitle: 'PropertyNama - Trusted Real Estate consultant in Pakistan',
      metaDescription: 'RIGHT PLACE FOR CONSULTANT & PERFECT PLACE FOR CHOOSING SUCCESSFUL PROPERTIES.',
      keywords: 'faisal town, faisal town 2, faisaltown phase2, price of faisal town, real price faisal town, how book plot, rda approved socities, cda approved socities, best socities for overseas, overseas choice, overseas pakistani investmetn, rudn enclave, kingdom valley, plots, investment'
    }
  })

  // Define Hero Content
  const heroContent = {
    title: "Invest in Pakistan with Confidence",
    subtitle: "Your trusted partner for residential and commercial properties in Faisal Town, Rudn Enclave, and Kingdom Valley.",
    ctaText: "Explore Projects",
    ctaLink: "/faisal-town/phase-2",
    backgroundImage: "https://images.unsplash.com/photo-1600596542815-600025529871?auto=format&fit=crop&w=1920&q=80",
    backgroundImageAlt: "Luxury Modern Property in Pakistan - PropertyNama"
  }

  // Check if hero section exists
  const existingHero = await prisma.section.findFirst({
    where: {
      pageId: homePage.id,
      type: 'HERO'
    }
  })

  if (existingHero) {
    await prisma.section.update({
      where: { id: existingHero.id },
      data: {
        content: JSON.stringify(heroContent)
      }
    })
    console.log('✅ Updated existing Hero section with new image')
  } else {
    await prisma.section.create({
      data: {
        type: 'HERO',
        order: 0,
        content: JSON.stringify(heroContent),
        pageId: homePage.id
      }
    })
    console.log('✅ Created new Hero section with new image')
  }
}

main()
  .catch((e) => {
    console.error('❌ Error updating Hero section:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
