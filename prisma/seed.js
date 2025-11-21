const { PrismaClient } = require('@prisma/client');

// Initialize the Client (The Truth Layer)
const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Seeding the Metasystem...');

  // --- 1. CLEAR THE BOARD ---
  // We clean slate to ensure atomic integrity during dev cycles
  await prisma.enrollment.deleteMany();
  await prisma.resonanceLog.deleteMany();
  await prisma.aIShard.deleteMany();
  await prisma.cognitiveProfile.deleteMany();
  await prisma.student.deleteMany();
  await prisma.teacher.deleteMany();
  await prisma.user.deleteMany();
  
  console.log('🧹 Chaos cleared. Tabula Rasa.');

  // --- 2. THE ACTORS (Users) ---
  
  // Student 1: Alice (The Academic Anchor)
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

  // Student 2: Bruno (The Social Catalyst / High Risk)
  const brunoUser = await prisma.user.create({
    data: {
      email: 'bruno@schoolos.local',
      role: 'STUDENT',
      studentProfile: {
        create: {
          referralCode: 'BRUNO_VIP',
          academicGPA: 5.8, // Risk
          financialBalance: -1500.00, // Debt
          attendanceRate: 72.0,
          npsScore: 7,
          // Bruno referred Alice (Networking) - Complex relation update needed typically, keeping simple for seed
          varkProfile: {
            create: { visual: 85, aural: 15, readWrite: 20, kinesthetic: 80 }
          }
        }
      }
    }
  });

  // Teacher 1: Prof. Julia (The Hidden Gem)
  // High NPS, Low Efficiency (Manual Prep)
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
              { hours: 5.0, cost: 175.00, leverage: 1.2 }, // Low leverage prep
              { hours: 4.0, cost: 140.00, leverage: 1.5 }
            ]
          }
        }
      }
    }
  });

  // Teacher 2: Prof. Elena (The Rockstar)
  // High Cost, Massive Leverage
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
              { hours: 2.0, cost: 120.00, leverage: 8.5 }, // Massive leverage
            ]
          }
        }
      }
    }
  });

  // --- 3. THE SYMBIOSIS (Shards) ---

  // Give Bruno his Shard
  // Note: We use a mock UUID for the shard to simulate the Genesis Protocol
  await prisma.aIShard.create({
    data: {
      studentId: brunoUser.studentProfile ? (await prisma.student.findUnique({where: {userId: brunoUser.id}})).id : '', // Fetch ID dynamically in real app
      // For seeding simplicity, we assume the create above worked and we'd query it, 
      // but let's attach it via nested write logic usually.
      // Re-querying to be safe:
      student: { connect: { userId: brunoUser.id } },
      version: 'v1.0_untrained',
      lastResonanceSync: new Date(),
      cognitiveWeights: { risk_tolerance: 0.9, social_connectivity: 0.95 }, // High risk/social
      isVaulted: false
    }
  });

  console.log('🌱 Database seeded with Archetypes:');
  console.log('   - Alice (Academic)');
  console.log('   - Bruno (Social Node)');
  console.log('   - Prof. Julia (Creative)');
  console.log('   - Prof. Elena (Academic)');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });