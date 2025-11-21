'use client';

import { Paper, Table, Badge, Group, Text, Avatar } from '@mantine/core';
import { Network } from 'lucide-react';

export interface NetworkNode {
  id: string;
  name: string;
  referralsMade: number;
  gpa: number;
  ltv: string; // Lifetime Value (mocked)
}

export function ReferralTable({ nodes }: { nodes: NetworkNode[] }) {
  const rows = nodes.map((node) => (
    <Table.Tr key={node.id}>
      <Table.Td>
        <Group gap="sm">
          <Avatar color="blue" radius="xl">{node.name.substring(0,2).toUpperCase()}</Avatar>
          <div>
            <Text size="sm" fw={500}>{node.name}</Text>
            <Badge size="xs" variant="dot" color={node.gpa < 6 ? 'red' : 'gray'}>
              GPA: {node.gpa.toFixed(1)}
            </Badge>
          </div>
        </Group>
      </Table.Td>
      <Table.Td>
        <Group gap="xs">
          <Network size={14} className="text-gray-400" />
          <Text size="sm" fw={700}>{node.referralsMade}</Text>
        </Group>
      </Table.Td>
      <Table.Td style={{ fontFamily: 'monospace' }}>{node.ltv}</Table.Td>
      <Table.Td>
        {node.referralsMade > 5 ? (
          <Badge color="violet">Whale</Badge>
        ) : node.referralsMade > 0 ? (
          <Badge color="blue" variant="light">Connector</Badge>
        ) : (
          <Text size="xs" c="dimmed">-</Text>
        )}
      </Table.Td>
    </Table.Tr>
  ));

  return (
    <Paper withBorder p="md" radius="md">
      <Table verticalSpacing="sm">
        <Table.Thead>
          <Table.Tr>
            <Table.Th>Network Node</Table.Th>
            <Table.Th>Downline Size</Table.Th>
            <Table.Th>Shadow LTV</Table.Th>
            <Table.Th>Archetype</Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>{rows}</Table.Tbody>
      </Table>
    </Paper>
  );
}