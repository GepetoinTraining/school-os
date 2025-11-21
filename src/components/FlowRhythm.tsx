'use client';

import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine } from 'recharts';
import { Paper, Text, Group, Badge, RingProgress, Center, Stack } from '@mantine/core';
import { Activity, TrendingUp, TrendingDown, Minus } from 'lucide-react';

interface FlowData {
  timestamp: string;
  score: number;
  state: string;
}

export function FlowRhythm({ data, average, trend }: { data: FlowData[], average: number, trend: string }) {
  
  // Gradient definition for the chart
  const gradientOffset = () => {
    return 0.5; // Simplified split
  };

  return (
    <Group align="stretch" grow>
        {/* The Metric Card */}
        <Paper withBorder p="md" radius="md" style={{ flex: '0 0 250px' }}>
            <Text size="xs" tt="uppercase" fw={700} c="dimmed">Current Resonance</Text>
            
            <Center my="xl">
                <RingProgress
                    size={140}
                    thickness={12}
                    roundCaps
                    sections={[{ value: average * 10, color: average > 7 ? 'teal' : average < 4 ? 'red' : 'yellow' }]}
                    label={
                        <Stack gap={0} align="center">
                            <Text fz={32} fw={700} lh={1}>{average.toFixed(1)}</Text>
                            <Text fz="xs" c="dimmed">/ 10</Text>
                        </Stack>
                    }
                />
            </Center>
            
            <Group justify="space-between" mt="md">
                <Text size="sm" fw={500}>Trend vector</Text>
                {trend === 'ASCENDING' && <Badge color="green" leftSection={<TrendingUp size={12}/>}>RISING</Badge>}
                {trend === 'CRASHING' && <Badge color="red" leftSection={<TrendingDown size={12}/>}>FALLING</Badge>}
                {trend === 'STABLE' && <Badge color="gray" leftSection={<Minus size={12}/>}>STABLE</Badge>}
            </Group>
        </Paper>

        {/* The Chart */}
        <Paper withBorder p="md" radius="md" style={{ flex: 1, height: '300px' }}>
            <Group mb="md" justify="space-between">
                <Group gap="xs">
                    <Activity size={16} />
                    <Text fw={700}>Flow State Velocity (Last 10 Sessions)</Text>
                </Group>
                <Badge variant="light">Real-time</Badge>
            </Group>

            <ResponsiveContainer width="100%" height="85%">
                <AreaChart data={data}>
                    <defs>
                        <linearGradient id="splitColor" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#12b886" stopOpacity={0.8}/>
                            <stop offset="95%" stopColor="#12b886" stopOpacity={0}/>
                        </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} opacity={0.5} />
                    <XAxis dataKey="timestamp" tick={{fontSize: 12}} hide />
                    <YAxis domain={[0, 10]} hide />
                    <Tooltip 
                        contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                        labelStyle={{ color: '#999' }}
                    />
                    <ReferenceLine y={7} stroke="green" strokeDasharray="3 3" label="FLOW" />
                    <ReferenceLine y={4} stroke="red" strokeDasharray="3 3" label="ANXIETY" />
                    <Area 
                        type="monotone" 
                        dataKey="score" 
                        stroke="#12b886" 
                        fill="url(#splitColor)" 
                        strokeWidth={3}
                        animationDuration={1500}
                    />
                </AreaChart>
            </ResponsiveContainer>
        </Paper>
    </Group>
  );
}