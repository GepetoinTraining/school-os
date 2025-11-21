'use client';

import { SchoolOSShell } from '@/components/SchoolOSShell';
import { StatsGroup } from '@/components/StatsGroup';
import { Container, Title, Text, Paper, Table, Badge, Group } from '@mantine/core';

export default function Home() {
  // Mock data reflecting the Seed we ran (Alice & Bruno)
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
        
        <StatsGroup />

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