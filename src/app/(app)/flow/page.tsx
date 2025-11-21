import { Container, Title, SimpleGrid, Card, Text, Avatar, Group, Button, Badge } from '@mantine/core';
import { prisma } from '@/lib/prisma';
import { LogFlowButton } from '@/components/LogFlowButton'; // We'll inline this logic or create it next
import { BrainCircuit } from 'lucide-react';

export const dynamic = 'force-dynamic';

async function getActiveStudents() {
  return await prisma.student.findMany({
    include: { user: true },
    orderBy: { academicGPA: 'desc' }, // Just a default sort
    take: 20 // Limit for Alpha testing
  });
}

export default async function FlowHUD() {
  const students = await getActiveStudents();

  return (
    <Container size="sm" py="md">
      <Group mb="lg" justify="space-between">
        <div>
          <Title order={3}>Teacher HUD</Title>
          <Text c="dimmed" size="sm">Real-time Nervous System</Text>
        </div>
        <Badge color="green" variant="light">Live</Badge>
      </Group>

      <SimpleGrid cols={{ base: 1, sm: 2 }}>
        {students.map((student) => (
          <Card key={student.id} withBorder shadow="sm" radius="md">
            <Group mb="md">
              <Avatar color="blue" radius="xl">
                {student.user.email[0].toUpperCase()}
              </Avatar>
              <div>
                <Text fw={500} size="sm">{student.user.email}</Text>
                <Text size="xs" c="dimmed">GPA: {student.academicGPA.toFixed(1)}</Text>
              </div>
            </Group>
            
            <Group grow>
                {/* These will be client components invoking the server action */}
                <LogFlowButton studentId={student.id} />
            </Group>
          </Card>
        ))}
      </SimpleGrid>
    </Container>
  );
}