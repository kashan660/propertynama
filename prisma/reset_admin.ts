
import { PrismaClient } from '@prisma/client'
import { pbkdf2Sync, randomBytes } from 'crypto'

const prisma = new PrismaClient()

function hashPassword(password: string): string {
  const salt = randomBytes(16).toString('hex')
  const hash = pbkdf2Sync(password, salt, 1000, 64, 'sha512').toString('hex')
  return `${salt}:${hash}`
}

async function main() {
  const email = 'admin@propertynama.pk'
  const password = 'Wilson@8088' 
  const hashedPassword = hashPassword(password)

  console.log(`Resetting admin user...`)
  console.log(`Email: ${email}`)
  console.log(`Password: ${password}`)

  // First, check if the old admin exists and update it, or create a new one
  // We'll search by email first. If not found, we might want to check if there's any admin to update, 
  // but for safety, let's just create/update this specific email user as admin.
  
  const user = await prisma.user.upsert({
    where: { email },
    update: {
      password: hashedPassword,
      role: 'ADMIN',
      name: 'Admin User'
    },
    create: {
      email,
      password: hashedPassword,
      role: 'ADMIN',
      name: 'Admin User'
    }
  })

  console.log('✅ Admin user reset successfully!')
  console.log('You can now login with the credentials above.')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
