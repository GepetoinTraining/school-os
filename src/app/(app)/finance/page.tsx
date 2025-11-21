import { prisma } from '@/lib/prisma';
import { FinancialLedger } from '@/components/FinancialLedger';
import { TransactionLogger } from '@/components/TransactionLogger'; // Import this
import { Container, Title, Text, Group, Button } from '@mantine/core';
import { Download } from 'lucide-react';
import type { LedgerTransaction } from '@prisma/client';

export const dynamic = 'force-dynamic';

export default async function FinancePage() {
  // ... existing data fetching logic ...
  const transactionsRaw = await prisma.ledgerTransaction.findMany({
    take: 50,
    orderBy: { timestamp: 'desc' },
  });

  const transactions = transactionsRaw.map((tx) => ({
    id: tx.id,
    date: tx.timestamp,
    description: tx.description,
    type: tx.type,
    regime: tx.taxRegime,
    rawAmount: tx.amount.toNumber(),
    amount: new Intl.NumberFormat('pt-BR', { minimumFractionDigits: 2 }).format(tx.amount.toNumber()),
  }));

  return (
    <Container size="xl" py="md">
      <Group justify="space-between" mb="lg">
        <div>
          <Title order={2}>Ledger</Title>
          <Text c="dimmed" size="sm">Lucro Real / Sequential Log</Text>
        </div>
        
        <Group>
             <Button variant="outline" leftSection={<Download size={16} />}>Export CSV</Button>
             {/* The Pen is now active */}
             <TransactionLogger />
        </Group>
      </Group>
      
      <FinancialLedger transactions={transactions} />
    </Container>
  );
}