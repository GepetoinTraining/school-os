import { prisma } from '@/lib/prisma';
import { SchoolOSShell } from '@/components/SchoolOSShell';
import { StatsGroup } from '@/components/StatsGroup';
import { RecentActivity } from '@/components/RecentActivity';
import { Container, Title, Text, Group } from '@mantine/core';

// Force dynamic rendering to ensure we see real-time data
export const dynamic = 'force-dynamic';

async function getSystemVitalSigns() {
  // 1. Yield of Soul: Count Active Students
  const studentCount = await prisma.student.count();

  // 2. Yield of Capital: Calculate Lucro Real (Income - Expenses)
  const income = await prisma.ledgerTransaction.aggregate({
    where: { type: 'INCOME' },
    _sum: { amount: true },
  });
  const expense = await prisma.ledgerTransaction.aggregate({
    where: { type: 'EXPENSE' },
    _sum: { amount: true },
  });
  
  const netRevenue = (income._sum.amount?.toNumber() || 0) - (expense._sum.amount?.toNumber() || 0);

  // 3. Yield of Cognition: Average Resonance
  const resonanceStats = await prisma.resonanceLog.aggregate({
    _avg: { score: true },
  });
  const avgResonance = resonanceStats._avg.score || 0;

  return {
    studentCount,
    netRevenue,
    avgResonance
  };
}

export default async function Home() {
  const vitals = await getSystemVitalSigns();

  const formattedRevenue = new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(vitals.netRevenue);

  return (
    <SchoolOSShell>
      <Container size="xl" py="md">
        <Group mb="lg">
            <div>
                <Title order={2}>Cockpit</Title>
                <Text c="dimmed" size="sm">System Overview & Vital Signs</Text>
            </div>
        </Group>
        
        <StatsGroup 
          data={{
            financial: formattedRevenue,
            students: vitals.studentCount,
            resonance: vitals.avgResonance
          }}
        />

        <RecentActivity />
      </Container>
    </SchoolOSShell>
  );
}