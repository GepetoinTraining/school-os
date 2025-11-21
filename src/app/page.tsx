import { prisma } from '@/lib/prisma';
import { SchoolOSShell } from '@/components/SchoolOSShell';
import { StatsGroup } from '@/components/StatsGroup';
import { Container, Title, Text, Paper, Table, Badge, Group } from '@mantine/core';

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

  // Format currency for display (BRL)
  const formattedRevenue = new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(vitals.netRevenue);

  // Mock activity feed (We will connect this to AuditLog later)
  const rows = [
    { id: '1', user: 'Bruno (Student)', action: 'Resonance Drop', time: '2 mins ago', status: 'RISK' },
    { id: '2', user: 'Alice (Student)', action: 'Flow State Logged', time: '15 mins ago', status: 'OK' },
    { id: '3', user: 'Prof. Julia', action: 'Prep Log Submitted', time: '1 hour ago', status: 'OK' },
    { id: '4', user: 'System Daemon', action: 'Ledger Balanced', time: '4 hours ago', status: 'SYSTEM' },
  ];

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

        <Paper withBorder p="md" radius="md" mt="lg">
          <Title order={4} mb="md">Live Neural Feed</Title>
          <Table>
            <Table.Thead>
              <Table.Tr>
                <Table.Th>User Node</Table.Th>
                <Table.Th>Action</Table.Th>
                <Table.Th>Time</Table.Th>
                <Table.Th>Status</Table.Th>
              </Table.Tr>
            </Table.Thead>
            <Table.Tbody>
              {rows.map((row) => (
                <Table.Tr key={row.id}>
                  <Table.Td>{row.user}</Table.Td>
                  <Table.Td>{row.action}</Table.Td>
                  <Table.Td c="dimmed">{row.time}</Table.Td>
                  <Table.Td>
                    <Badge 
                        color={row.status === 'RISK' ? 'red' : row.status === 'SYSTEM' ? 'blue' : 'teal'} 
                        variant="light"
                    >
                      {row.status}
                    </Badge>
                  </Table.Td>
                </Table.Tr>
              ))}
            </Table.Tbody>
          </Table>
        </Paper>
      </Container>
    </SchoolOSShell>
  );
}