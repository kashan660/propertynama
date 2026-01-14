
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

// Helper for Unsplash WebP images
const getUnsplashUrl = (id: string, width = 1200) => 
  `https://images.unsplash.com/${id}?fm=webp&w=${width}&q=80&fit=crop`

async function main() {
  console.log('Start seeding...')

  // Clear existing data
  await prisma.section.deleteMany()
  await prisma.page.deleteMany()
  await prisma.blogPost.deleteMany()
  await prisma.newsItem.deleteMany()
  // await prisma.property.deleteMany() // Optional: Clear properties if needed

  // --- 1. HOME PAGE ---
  await prisma.page.create({
    data: {
      slug: 'home',
      title: 'PropertyNama - #1 Real Estate Portal for Overseas Pakistanis',
      metaTitle: 'Buy Plots & Houses in Pakistan | Trusted by Overseas Pakistanis',
      metaDescription: 'Find the best investment opportunities in Bahria Town, DHA, Faisal Town, and Rudn Enclave. Secure, transparent, and profitable real estate deals for overseas Pakistanis.',
      keywords: 'Real Estate Pakistan, Buy Plots Islamabad, Overseas Pakistanis Investment, PropertyNama, Bahria Town, DHA, Faisal Town Phase 2',
      ogImage: getUnsplashUrl('photo-1560518883-ce09059eeffa'),
      sections: {
        create: [
          {
            type: 'HERO',
            order: 1,
            content: JSON.stringify({
              title: 'RIGHT PLACE TO SECURE YOUR INVESTMENT',
              subtitle: 'We Suggest The Best Investment Opportunity',
              ctaText: 'Explore Projects',
              ctaLink: '/faisal-town/phase-2',
              backgroundImage: getUnsplashUrl('photo-1600585154340-be6161a56a0c', 1920)
            })
          },
          {
            type: 'FEATURED_PROJECTS',
            order: 2,
            content: JSON.stringify({
              title: 'Top Rated Projects',
              projects: [
                { title: 'Faisal Town Phase 2', location: 'M-2 Motorway, Islamabad', image: getUnsplashUrl('photo-1592595896551-12b371d546d5'), link: '/faisal-town/phase-2' },
                { title: 'Rudn Enclave', location: 'Adiala Road, Rawalpindi', image: getUnsplashUrl('photo-1448630360428-65456885c650'), link: '/ruden-enclave-details' },
                { title: 'Eighteen Islamabad', location: 'Kashmir Highway', image: getUnsplashUrl('photo-1613490493576-7fde63acd811'), link: '/eighteen' }
              ]
            })
          }
        ]
      }
    }
  })

  // --- 2. ABOUT US PAGE ---
  await prisma.page.create({
    data: {
      slug: 'about-us',
      title: 'About PropertyNama',
      metaTitle: 'About Us - Leading Real Estate Consultants in Pakistan',
      metaDescription: 'PropertyNama is a premier real estate consultancy firm specializing in safe and profitable investments for overseas Pakistanis since 2013.',
      keywords: 'Real Estate Consultants, Property Experts Pakistan, Investment Advisors, PropertyNama CEO',
      ogImage: getUnsplashUrl('photo-1556761175-5973dc0f32e7'),
      content: `
        <h2>Who We Are</h2>
        <p>PropertyNama is Pakistan's leading real estate consultancy, dedicated to serving the needs of overseas Pakistanis. Since 2013, we have helped thousands of clients find their dream homes and profitable investment opportunities.</p>
        <h2>Our Mission</h2>
        <p>To provide transparent, secure, and high-return real estate opportunities while simplifying the buying process for clients abroad.</p>
        <h2>Why Choose Us?</h2>
        <ul>
          <li><strong>Expertise:</strong> Deep market knowledge of Islamabad, Rawalpindi, and Lahore.</li>
          <li><strong>Trust:</strong> Verified listings and legally sound documentation.</li>
          <li><strong>Support:</strong> 24/7 assistance for international clients.</li>
        </ul>
      `,
      sections: {
        create: [
          {
            type: 'TEAM',
            order: 1,
            content: JSON.stringify({
              title: 'Meet Our Experts',
              members: [
                { name: 'Muhammad Ismail', role: 'CEO', image: getUnsplashUrl('photo-1560250097-0b93528c311a') },
                { name: 'Sarah Khan', role: 'Senior Consultant', image: getUnsplashUrl('photo-1573496359-136d475583dc') }
              ]
            })
          }
        ]
      }
    }
  })

  // --- 3. RUDN ENCLAVE PAGE ---
  await prisma.page.create({
    data: {
      slug: 'ruden-enclave',
      title: 'Rudn Enclave Rawalpindi',
      metaTitle: 'Rudn Enclave Payment Plan & Location | Best Investment 2024',
      metaDescription: 'Complete guide to Rudn Enclave Rawalpindi. Check latest payment plans, map, and booking details. Ideal for low-budget investment near Ring Road.',
      keywords: 'Rudn Enclave, Rudn Enclave Payment Plan, Rawalpindi Ring Road, General Block, Executive Block, HMR Block',
      ogImage: getUnsplashUrl('photo-1582407947304-fd86f028f716'),
      sections: {
        create: [
          {
            type: 'HERO',
            order: 1,
            content: JSON.stringify({
              title: 'Rudn Enclave',
              subtitle: 'The Jewel of Rawalpindi - A Project by RMRSCO',
              ctaText: 'Download Payment Plan',
              ctaLink: '#payment-plan',
              backgroundImage: getUnsplashUrl('photo-1582407947304-fd86f028f716', 1920)
            })
          },
          {
            type: 'TEXT',
            order: 2,
            content: JSON.stringify({
              heading: 'Project Overview',
              body: 'Rudn Enclave is a master-planned gated community located on Adiala Road, adjacent to the Rawalpindi Ring Road. It offers residential and commercial plots at affordable rates, making it a top choice for investors.'
            })
          }
        ]
      }
    }
  })

  // --- 4. EIGHTEEN PAGE ---
  await prisma.page.create({
    data: {
      slug: 'eighteen',
      title: 'Eighteen Islamabad',
      metaTitle: 'Eighteen Islamabad Luxury Villas & Apartments | Elite Living',
      metaDescription: 'Experience the ultimate luxury at Eighteen Islamabad. High-end villas, apartments, and golf course living. Book your unit today with PropertyNama.',
      keywords: 'Eighteen Islamabad, Luxury Villas Islamabad, Golf Course Community, Elite Real Estate Pakistan',
      ogImage: getUnsplashUrl('photo-1613977257363-707ba9348227'),
      sections: {
        create: [
          {
            type: 'HERO',
            order: 1,
            content: JSON.stringify({
              title: 'Eighteen Islamabad',
              subtitle: 'A World Class Lifestyle Destination',
              ctaText: 'View Villas',
              ctaLink: '#villas',
              backgroundImage: getUnsplashUrl('photo-1613977257363-707ba9348227', 1920)
            })
          }
        ]
      }
    }
  })

  // --- 5. BLOG POSTS ---
  const blogs = [
    {
      title: 'Why Overseas Pakistanis Should Invest in Real Estate in 2024',
      slug: 'overseas-investment-guide-2024',
      excerpt: 'Discover the top reasons why 2024 is the golden year for real estate investment in Pakistan.',
      content: 'With the rupee devaluation and attractive payment plans from top developers like Faisal Town and Capital Smart City, overseas Pakistanis have a unique opportunity to maximize their ROI...',
      image: getUnsplashUrl('photo-1554469384-e58fac16e23a'),
      metaTitle: 'Best Real Estate Investment for Overseas Pakistanis 2024',
      metaDescription: 'Expert analysis on why 2024 is the best time for overseas Pakistanis to buy property in Pakistan.',
      keywords: 'Investment Guide 2024, Overseas Pakistanis, Real Estate ROI'
    },
    {
      title: 'Rawalpindi Ring Road: A Game Changer for Real Estate',
      slug: 'ring-road-impact',
      excerpt: 'How the RRR project will boost property prices in Rudn Enclave and Blue World City.',
      content: 'The Rawalpindi Ring Road (RRR) is set to revolutionize connectivity in the twin cities. Projects located near the RRR route, such as Rudn Enclave, are expected to see a 50-100% appreciation...',
      image: getUnsplashUrl('photo-1469854523086-cc02fe5d8800'),
      metaTitle: 'Rawalpindi Ring Road Impact on Property Prices',
      metaDescription: 'Analyze the impact of Rawalpindi Ring Road on real estate prices in Adiala Road and Chakri Road sectors.',
      keywords: 'Rawalpindi Ring Road, RRR Route, Rudn Enclave Prices'
    },
    {
      title: 'Faisal Town Phase 2: Complete Booking Details',
      slug: 'faisal-town-phase-2-booking',
      excerpt: 'Everything you need to know about booking a plot in Faisal Town Phase 2.',
      content: 'Faisal Town Phase 2 is the latest venture by Chaudhry Abdul Majeed. Located ideally on the Thalian Interchange, it offers easy access to the motorway and airport...',
      image: getUnsplashUrl('photo-1592595896551-12b371d546d5'),
      metaTitle: 'Faisal Town Phase 2 Booking & Payment Plan',
      metaDescription: 'Secure your plot in Faisal Town Phase 2. Check down payment, installments, and balloting details.',
      keywords: 'Faisal Town Phase 2, Chaudhry Abdul Majeed, Thalian Interchange'
    },
    {
      title: '2 Bed Apartment for Sale in Bahria Town Rawalpindi',
      slug: '2-bed-apartment-for-sale-in-bahria-town-rawalpindi',
      excerpt: '2 Bed Apartment for Sale in Bahria Town Rawalpindi. Price , Location & Complete details regarding this apartment in this blog.',
      content: 'Detailed information about the 2 Bed Apartment for Sale in Bahria Town Rawalpindi. Located in a prime area with modern amenities. Contact PropertyNaama for booking.',
      image: 'https://propertynaama.com/wp-content/uploads/2024/09/WhatsApp-Image-2024-09-05-at-3.07.09-PM-1.jpeg',
      metaTitle: '2 Bed Apartment for Sale in Bahria Town Rawalpindi',
      metaDescription: '2 Bed Apartment for Sale in Bahria Town Rawalpindi. Price , Location & Complete details regarding this apartment in this blog.',
      keywords: '2 Bed Apartment, Bahria Town Rawalpindi, Sale, Apartment for Sale, Rawalpindi Real Estate, Property Naama'
    }
  ]

  for (const blog of blogs) {
    await prisma.blogPost.create({ data: blog })
  }

  // --- 6. NEWS ITEMS ---
  const news = [
    {
      title: 'Capital Smart City Announces Possession for Overseas Prime',
      slug: 'csc-overseas-prime-possession',
      excerpt: 'Good news for members! Possession for Overseas Prime block has been announced.',
      content: 'Capital Smart City has officially announced the possession for Overseas Prime block. Members can now apply for possession and start construction...',
      image: getUnsplashUrl('photo-1503387762-592deb58ef4e'),
      source: 'Official Press Release',
      metaTitle: 'Capital Smart City Possession Update 2024',
      metaDescription: 'Latest news: Capital Smart City grants possession for Overseas Prime block. Start building your dream home.',
      keywords: 'Capital Smart City, Possession Update, Overseas Prime'
    },
    {
      title: 'DHA Quetta Installment Deadline Extended',
      slug: 'dha-quetta-deadline-extended',
      excerpt: 'Relief for investors as DHA Quetta extends the surcharge waiver deadline.',
      content: 'The administration of DHA Quetta has decided to extend the deadline for surcharge waivers on overdue installments. This is a great opportunity for investors to clear their dues...',
      image: getUnsplashUrl('photo-1591123720617-e85cede4a342'),
      source: 'DHA Updates',
      metaTitle: 'DHA Quetta Deadline Extension Notification',
      metaDescription: 'DHA Quetta extends installment deadline. Check the new date and surcharge waiver details.',
      keywords: 'DHA Quetta, Surcharge Waiver, Installment Deadline'
    }
  ]

  for (const item of news) {
    await prisma.newsItem.create({ data: item })
  }

  console.log('Seeding finished.')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
