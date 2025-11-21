import { Group, Paper, SimpleGrid, Text, ThemeIcon } from '@mantine/core';
import { ArrowUpRight, ArrowDownRight, Wallet, Users, Activity, LucideIcon } from 'lucide-react';

// Define the shape of the data we expect
interface StatData {
  title: string;
  value: string;
  diff: number;
  icon: LucideIcon;
  note: string;
}

interface StatsGroupProps {
  data: {
    financial: string; // Pre-formatted currency string
    students: number;
    resonance: number;
  };
}

export function StatsGroup({ data }: StatsGroupProps) {
  const stats: StatData[] = [
    { 
      title: 'Monthly Recurring Revenue', 
      value: data.financial, 
      diff: 0, // We'll calculate real diffs later (Phase 2)
      icon: Wallet,
      note: 'Lucro Real (Cash Basis)' 
    },
    { 
      title: 'Active Human Nodes', 
      value: data.students.toString(), 
      diff: 0, 
      icon: Users,
      note: 'Students Enrolled'
    },
    { 
      title: 'Avg. Resonance Score', 
      value: data.resonance.toFixed(1), 
      diff: 0, 
      icon: Activity,
      note: 'AI/Student Sync'
    },
  ];

  const statsItems = stats.map((stat) => {
    const DiffIcon = stat.diff >= 0 ? ArrowUpRight : ArrowDownRight;
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
          <Text c={stat.diff >= 0 ? 'teal' : 'red'} size="sm" fw={500} lh={1}>
            <span>{stat.diff}%</span>
            <DiffIcon size={12} />
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