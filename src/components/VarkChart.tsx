'use client';

import { Paper, Text, Group } from '@mantine/core';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, ResponsiveContainer } from 'recharts';

interface VarkData {
  subject: string;
  A: number; // Student Score
  fullMark: number;
}

export function VarkChart({ data }: { data: { visual: number; aural: number; readWrite: number; kinesthetic: number } }) {
  const chartData: VarkData[] = [
    { subject: 'Visual', A: data.visual, fullMark: 100 },
    { subject: 'Aural', A: data.aural, fullMark: 100 },
    { subject: 'R/W', A: data.readWrite, fullMark: 100 },
    { subject: 'Kinesthetic', A: data.kinesthetic, fullMark: 100 },
  ];

  return (
    <Paper withBorder p="md" radius="md" h={350}>
      <Group justify="space-between" mb="sm">
        <Text size="sm" fw={700}>Cognitive DNA (VARK)</Text>
        <Text size="xs" c="dimmed">Input Hardware</Text>
      </Group>
      <ResponsiveContainer width="100%" height="100%">
        <RadarChart cx="50%" cy="50%" outerRadius="80%" data={chartData}>
          <PolarGrid stroke="#e5e7eb" />
          <PolarAngleAxis dataKey="subject" tick={{ fill: '#888', fontSize: 12 }} />
          <Radar
            name="Student"
            dataKey="A"
            stroke="#7c3aed" // Violet
            fill="#7c3aed"
            fillOpacity={0.3}
          />
        </RadarChart>
      </ResponsiveContainer>
    </Paper>
  );
}