import { prisma } from '@/lib/prisma';
import { StatsGroup } from '@/components/StatsGroup';
import { RecentActivity } from '@/components/RecentActivity';
import { Container, Title, Text, Group, Grid, Paper, ThemeIcon, RingProgress, Center } from '@mantine/core';
import { Activity, TrendingUp } from 'lucide-react';

export const dynamic = 'force-dynamic';

async function getSystemVitalSigns() {
  // 1. Biological Count
  const studentCount = await prisma.student.count();

  // 2. Yield of Capital (Lucro Real)
  const income = await prisma.ledgerTransaction.aggregate({
    where: { type: 'INCOME' },
    _sum: { amount: true },
  });
  const expense = await prisma.ledgerTransaction.aggregate({
    where: { type: 'EXPENSE' },
    _sum: { amount: true },
  });
  const netRevenue = (income._sum.amount?.toNumber() || 0) - (expense._sum.amount?.toNumber() || 0);

  // 3. Yield of Soul (Resonance)
  const resonanceStats = await prisma.resonanceLog.aggregate({
    _avg: { score: true },
  });
  
  // 4. The Nervous System (Flow State - Last 24h)
  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  
  const flowLogs = await prisma.flowLog.findMany({
    where: { timestamp: { gte: yesterday } },
    select: { score: true }
  });
  
  const avgFlow = flowLogs.length > 0 
    ? flowLogs.reduce((acc, log) => acc + log.score, 0) / flowLogs.length 
    : 0;

  return {
    studentCount,
    netRevenue,
    avgResonance: resonanceStats._avg.score || 0,
    avgFlow,
    flowCount: flowLogs.length
  };
}

export default async function DashboardPage() {
  const vitals = await getSystemVitalSigns();

  const formattedRevenue = new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(vitals.netRevenue);

  return (
    <Container size="xl" py="md">
      <Group mb="lg">
          <div>
              <Title order={2}>Metasystem Cockpit</Title>
              <Text c="dimmed" size="sm">Real-time Operational Awareness</Text>
          </div>
      </Group>
      
      {/* Core Vitals */}
      <StatsGroup 
        data={{
          financial: formattedRevenue,
          students: vitals.studentCount,
          resonance: vitals.avgResonance
        }}
      />

      <Grid mt="lg">
        {/* Left Col: Nervous System Monitor */}
        <Grid.Col span={{ base: 12, md: 4 }}>
            <Paper withBorder p="md" radius="md" h="100%">
                <Group justify="space-between" mb="md">
                    <Text fw={700}>Nervous System (24h)</Text>
                    <ThemeIcon variant="light" color={vitals.avgFlow > 7 ? 'green' : 'orange'}>
                        <Activity size={16} />
                    </ThemeIcon>
                </Group>
                
                <Center my="xl">
                    <RingProgress
                        size={160}
                        roundCaps
                        thickness={16}
                        sections={[{ value: vitals.avgFlow * 10, color: vitals.avgFlow > 7 ? 'teal' : 'orange' }]}
                        label={
                            <Center>
                                <div>
                                    <Text ta="center" fz="xl" fw={700}>{vitals.avgFlow.toFixed(1)}</Text>
                                    <Text ta="center" fz="xs" c="dimmed">Flow Index</Text>
                                </div>
                            </Center>
                        }
                    />
                </Center>
                
                <Group justify="center" gap="xs">
                     <TrendingUp size={14} className="text-gray-400" />
                     <Text size="xs" c="dimmed">
                        Based on {vitals.flowCount} recent signals
                     </Text>
                </Group>
            </Paper>
        </Grid.Col>

        {/* Right Col: Recent Activity Stream */}
        <Grid.Col span={{ base: 12, md: 8 }}>
             <RecentActivity />
        </Grid.Col>
      </Grid>
    </Container>
  );
}