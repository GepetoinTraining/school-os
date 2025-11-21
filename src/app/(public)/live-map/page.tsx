'use client';

import { Container, Title, Text, SimpleGrid, Paper, RingProgress, Group, Center, ThemeIcon, Badge } from '@mantine/core';
import { Activity, Clock, Users, Zap } from 'lucide-react';

// Mock Data for the Alpha - In Beta this connects to FlowLog
const rooms = [
    { name: 'Lab 01', subject: 'Python', flow: 85, status: 'FLOW' },
    { name: 'Studio A', subject: 'Bio-Arts', flow: 92, status: 'FLOW' },
    { name: 'Room 101', subject: 'History', flow: 45, status: 'ANXIETY' },
    { name: 'Room 102', subject: 'Physics', flow: 60, status: 'NEUTRAL' },
];

export default function LiveMapPage() {
  return (
    <Container size="xl" py={60}>
      <Group justify="space-between" mb="xl">
        <div>
            <Title order={1}>Metasystem Live Pulse</Title>
            <Text c="dimmed">Real-time biological resonance across the campus.</Text>
        </div>
        <Badge size="lg" color="green" variant="dot">LIVE FEED</Badge>
      </Group>

      <SimpleGrid cols={{ base: 1, md: 2, lg: 4 }} spacing="lg">
        {rooms.map((room) => (
            <Paper key={room.name} withBorder p="md" radius="md">
                <Group justify="space-between" mb="md">
                    <Text fw={700}>{room.name}</Text>
                    <Badge color={room.flow > 80 ? 'green' : room.flow < 50 ? 'red' : 'yellow'}>
                        {room.status}
                    </Badge>
                </Group>
                
                <Center>
                    <RingProgress
                        size={140}
                        thickness={12}
                        roundCaps
                        sections={[{ value: room.flow, color: room.flow > 80 ? 'green' : room.flow < 50 ? 'red' : 'yellow' }]}
                        label={
                            <Center>
                                <ThemeIcon variant="light" radius="xl" size="xl" color="gray">
                                    <Activity size={20} />
                                </ThemeIcon>
                            </Center>
                        }
                    />
                </Center>
                
                <Group justify="center" mt="md">
                    <Text size="sm" fw={500}>{room.subject}</Text>
                    <Text size="xs" c="dimmed">Resonance: {room.flow}%</Text>
                </Group>
            </Paper>
        ))}
      </SimpleGrid>

      <Paper withBorder p="xl" radius="md" mt={40} bg="gray.0">
         <Group justify="space-around">
            <Group>
                <ThemeIcon size="lg" variant="white" color="blue"><Users /></ThemeIcon>
                <div>
                    <Text size="xl" fw={700}>142</Text>
                    <Text size="xs" c="dimmed">Active Nodes</Text>
                </div>
            </Group>
            <Group>
                <ThemeIcon size="lg" variant="white" color="orange"><Zap /></ThemeIcon>
                <div>
                    <Text size="xl" fw={700}>89%</Text>
                    <Text size="xs" c="dimmed">Avg Engagement</Text>
                </div>
            </Group>
            <Group>
                <ThemeIcon size="lg" variant="white" color="teal"><Clock /></ThemeIcon>
                <div>
                    <Text size="xl" fw={700}>14:35</Text>
                    <Text size="xs" c="dimmed">System Time</Text>
                </div>
            </Group>
         </Group>
      </Paper>
    </Container>
  );
}