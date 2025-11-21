'use client';

import { Paper, Table, Badge, Text } from '@mantine/core';
import { format } from 'date-fns';

interface Transaction {
  id: string;
  date: Date;
  description: string;
  amount: string; // Formatted
  rawAmount: number;
  type: 'INCOME' | 'EXPENSE';
  regime: string | null;
}

export function FinancialLedger({ transactions }: { transactions: Transaction[] }) {
  const rows = transactions.map((tx) => (
    <Table.Tr key={tx.id}>
      <Table.Td style={{ fontFamily: 'monospace' }} c="dimmed">
        {format(tx.date, 'dd/MM/yyyy HH:mm')}
      </Table.Td>
      <Table.Td fw={500}>{tx.description}</Table.Td>
      <Table.Td>
        <Badge 
          color={tx.type === 'INCOME' ? 'teal' : 'pink'} 
          variant="dot"
        >
          {tx.type}
        </Badge>
      </Table.Td>
      <Table.Td>
        {tx.regime ? <Badge variant="outline" size="xs">{tx.regime}</Badge> : '-'}
      </Table.Td>
      <Table.Td style={{ textAlign: 'right', fontFamily: 'monospace', fontWeight: 600 }}>
        <Text c={tx.type === 'INCOME' ? 'teal' : 'red'}>
          {tx.type === 'EXPENSE' ? '-' : '+'}{tx.amount}
        </Text>
      </Table.Td>
    </Table.Tr>
  ));

  return (
    <Paper withBorder p="md" radius="md">
      <Table verticalSpacing="xs">
        <Table.Thead>
          <Table.Tr>
            <Table.Th>Timestamp</Table.Th>
            <Table.Th>Description</Table.Th>
            <Table.Th>Type</Table.Th>
            <Table.Th>Tax Regime</Table.Th>
            <Table.Th style={{ textAlign: 'right' }}>Value (Real)</Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>{rows}</Table.Tbody>
      </Table>
    </Paper>
  );
}