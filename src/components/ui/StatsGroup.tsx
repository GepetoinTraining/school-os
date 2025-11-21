'use client';

import { Group, Paper, SimpleGrid, Text, ThemeIcon } from '@mantine/core';
import { ArrowUpRight, ArrowDownRight, Wallet, Users, Activity } from 'lucide-react';

const stats = [
  { 
    title: 'Monthly Recurring Revenue', 
    value: 'R$ 42.500', 
    diff: 12, 
    icon: Wallet,
    note: 'Lucro Real' 
  },
  { 
    title: 'Active Human Nodes', 
    value: '142', 
    diff: 4, 
    icon: Users,
    note: 'Students Enrolled'
  },
  { 
    title: 'Avg. Resonance Score', 
    value: '8.4', 
    diff: -2, 
    icon: Activity,
    note: 'AI/Student Sync'
  },
];

export function StatsGroup() {
  const statsItems = stats.map((stat) => {
    const DiffIcon = stat.diff > 0 ? ArrowUpRight : ArrowDownRight;
    const Icon = stat.icon;

    return (
      <Paper withBorder p="md" radius="md" key={stat.title}>
        <Group justify="space-between">
          <Text size="xs" c="dimmed" fw={700} tt="uppercase">
            {stat.title}
          </Text>
          <ThemeIcon color="gray" variant="light" size="sm">
            <Icon size={14} />
          </ThemeIcon>
        </Group>

        <Group align="flex-end" gap="xs" mt={25}>
          <Text fw={700} size="2xl" lh={1}>
            {stat.value}
          </Text>
          <Text c={stat.diff > 0 ? 'teal' : 'red'} size="sm" fw={500} lh={1}>
            <span>{stat.diff}%</span>
            <DiffIcon size={12} style={{ marginLeft: 4 }} />
          </Text>
        </Group>

        <Text size="xs" c="dimmed" mt={7}>
          {stat.note}
        </Text>
      </Paper>
    );
  });

  return (
    <SimpleGrid cols={{ base: 1, sm: 3 }}>
      {statsItems}
    </SimpleGrid>
  );
}