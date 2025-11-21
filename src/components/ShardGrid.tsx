'use client';

import { SimpleGrid, Paper, Text, Group, Badge, ThemeIcon, Progress, Code } from '@mantine/core';
import { BrainCircuit, Cpu, Lock } from 'lucide-react';

export interface ShardData {
  id: string;
  studentName: string;
  version: string;
  syncScore: number; // 0-100
  weights: string; // JSON string representation
  isVaulted: boolean;
}

export function ShardGrid({ shards }: { shards: ShardData[] }) {
  return (
    <SimpleGrid cols={{ base: 1, sm: 2, lg: 3 }}>
      {shards.map((shard) => (
        <Paper key={shard.id} withBorder p="md" radius="md">
          <Group justify="space-between" mb="xs">
            <Group gap="xs">
              <ThemeIcon variant="light" color={shard.isVaulted ? 'gray' : 'violet'}>
                {shard.isVaulted ? <Lock size={16} /> : <BrainCircuit size={16} />}
              </ThemeIcon>
              <Text size="sm" fw={500}>{shard.studentName}</Text>
            </Group>
            <Badge variant="outline" color="gray" size="xs">{shard.version}</Badge>
          </Group>

          <Text size="xs" c="dimmed" mt="sm">Resonance Sync</Text>
          <Group gap="xs" align="center" mb="md">
            <Progress 
              value={shard.syncScore * 10} 
              color={shard.syncScore > 8 ? 'teal' : shard.syncScore > 5 ? 'yellow' : 'red'} 
              size="sm" 
              flex={1} 
            />
            <Text size="sm" fw={700}>{shard.syncScore.toFixed(1)}</Text>
          </Group>

          <Text size="xs" c="dimmed">Cognitive Matrix</Text>
          <Code block fz="xs" mt={4} c="dimmed">
            {shard.weights}
          </Code>
        </Paper>
      ))}
    </SimpleGrid>
  );
}