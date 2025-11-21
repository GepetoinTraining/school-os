'use client';

import { useDisclosure } from '@mantine/hooks';
import { Modal, Button, TextInput, NumberInput, Select, Group, Stack, SegmentedControl } from '@mantine/core';
import { Plus, ArrowUpRight, ArrowDownLeft } from 'lucide-react';
import { recordTransaction } from '@/app/actions/finance';
import { useState } from 'react';
import { notifications } from '@mantine/notifications';

export function TransactionLogger() {
  const [opened, { open, close }] = useDisclosure(false);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(formData: FormData) {
    setLoading(true);
    const result = await recordTransaction(formData);
    setLoading(false);

    if (result.success) {
      notifications.show({
        title: 'Ledger Updated',
        message: 'Capital flow recorded successfully.',
        color: 'teal',
      });
      close();
    } else {
      notifications.show({
        title: 'Transaction Failed',
        message: result.error,
        color: 'red',
      });
    }
  }

  return (
    <>
      <Button leftSection={<Plus size={16} />} color="black" onClick={open}>
        New Entry
      </Button>

      <Modal opened={opened} onClose={close} title="Log Capital Flow" centered>
        <form action={handleSubmit}>
          <Stack>
            <SegmentedControl
              name="type"
              fullWidth
              data={[
                { label: 'Income', value: 'INCOME' },
                { label: 'Expense', value: 'EXPENSE' },
              ]}
              color="gray"
            />

            <TextInput 
              name="description" 
              label="Description" 
              placeholder="e.g. Tuition Payment - Alice" 
              required 
            />

            <TextInput
              name="amount"
              label="Amount (BRL)"
              placeholder="0.00"
              type="number"
              step="0.01"
              required
              leftSection="R$"
            />

            <Select
              name="taxRegime"
              label="Tax Regime (Optional)"
              placeholder="Select regime"
              data={['ISS', 'ICMS']}
              clearable
            />

            <Group justify="flex-end" mt="md">
              <Button variant="default" onClick={close}>Cancel</Button>
              <Button type="submit" color="black" loading={loading}>Record</Button>
            </Group>
          </Stack>
        </form>
      </Modal>
    </>
  );
}