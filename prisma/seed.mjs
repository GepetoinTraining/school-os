import { PrismaClient } from '@prisma/client';
import { Pool } from 'pg';
import { PrismaPg } from '@prisma/adapter-pg';

const connectionString = process.env.DATABASE_URL;

// 1. Initialize the Adapter (Biological Link)
const pool = new Pool({ connectionString });
const adapter = new PrismaPg(pool);

// 2. Initialize the Client with the Adapter
const prisma = new PrismaClient({ adapter });

async function main() {
  console.log('🌱 Seeding the Metasystem...');

  // --- 1. CLEAR THE BOARD ---
  await prisma.enrollment.deleteMany();
  await prisma.resonanceLog.deleteMany();
  await prisma.aIShard.deleteMany();
  await prisma.cognitiveProfile.deleteMany();
  await prisma.student.deleteMany();
  await prisma.teacher.deleteMany();
  await prisma.user.deleteMany();
  
  console.log('🧹 Chaos cleared. Tabula Rasa.');

  // --- 2. THE ACTORS (Users) ---
  
  // Student 1: Alice
  const aliceUser = await prisma.user.create({
    data: {
      email: 'alice@schoolos.local',
      role: 'STUDENT',
      studentProfile: {
        create: {
          referralCode: 'ALICE2025',
          academicGPA: 9.2,
          financialBalance: 0.00,
          attendanceRate: 98.5,
          npsScore: 9,
          varkProfile: {
            create: { visual: 30, aural: 30, readWrite: 40, kinesthetic: 0 }
          }
        }
      }
    }
  });

  // Student 2: Bruno
  const brunoUser = await prisma.user.create({
    data: {
      email: 'bruno@schoolos.local',
      role: 'STUDENT',
      studentProfile: {
        create: {
          referralCode: 'BRUNO_VIP',
          academicGPA: 5.8,
          financialBalance: -1500.00,
          attendanceRate: 72.0,
          npsScore: 7,
          varkProfile: {
            create: { visual: 85, aural: 15, readWrite: 20, kinesthetic: 80 }
          }
        }
      }
    }
  });

  // Teacher 1: Prof. Julia
  const juliaUser = await prisma.user.create({
    data: {
      email: 'julia@schoolos.local',
      role: 'TEACHER',
      teacherProfile: {
        create: {
          archetype: 'CREATIVE',
          hourlyRate: 35.00,
          prepLogs: {
            create: [
              { hours: 5.0, cost: 175.00, leverage: 1.2 },
              { hours: 4.0, cost: 140.00, leverage: 1.5 }
            ]
          }
        }
      }
    }
  });

  // Teacher 2: Prof. Elena
  const elenaUser = await prisma.user.create({
    data: {
      email: 'elena@schoolos.local',
      role: 'TEACHER',
      teacherProfile: {
        create: {
          archetype: 'ACADEMIC',
          hourlyRate: 60.00,
          prepLogs: {
            create: [
              { hours: 2.0, cost: 120.00, leverage: 8.5 },
            ]
          }
        }
      }
    }
  });

  // --- 3. THE SYMBIOSIS (Shards) ---

  // Give Bruno his Shard
  // We fetch the student ID reliably now
  const brunoStudent = await prisma.student.findUnique({where: {userId: brunoUser.id}});
  
  if (brunoStudent) {
      await prisma.aIShard.create({
        data: {
          studentId: brunoStudent.id,
          version: 'v1.0_untrained',
          lastResonanceSync: new Date(),
          cognitiveWeights: { risk_tolerance: 0.9, social_connectivity: 0.95 },
          isVaulted: false
        }
      });
  }

  console.log('🌱 Database seeded with Archetypes.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });