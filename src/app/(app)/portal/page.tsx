import { prisma } from '@/lib/prisma';
import { auth } from '@/auth';
import { Container, Title, Text, Group, Card, SimpleGrid, Badge } from '@mantine/core';
import { BrainCircuit, Wallet, GraduationCap } from 'lucide-react';
import { LinkButton } from '@/components/LinkButton'; // <--- NEW IMPORT

export const dynamic = 'force-dynamic';

export default async function StudentPortalPage() {
  const session = await auth();
  const userEmail = session?.user?.email;

  if (!userEmail) return <div>Access Denied</div>;

  const student = await prisma.student.findFirst({
    where: { user: { email: userEmail } },
    include: { 
        shard: true,
        user: true
    }
  });

  if (!student) {
    return (
        <Container size="sm" py="xl">
            <Card withBorder radius="md" p="xl" ta="center">
                <Title order={2}>Activation Pending</Title>
                <Text c="dimmed" mt="md">
                    Your biological node has not been linked to a Student Record yet.
                    Please contact the Director.
                </Text>
            </Card>
        </Container>
    );
  }

  return (
    <Container size="lg" py="xl">
      <Group mb="xl" justify="space-between">
        <div>
            <Title>Welcome back, {student.user.email?.split('@')[0]}</Title>
            <Text c="dimmed">SchoolOS Student Portal</Text>
        </div>
        {student.shard && (
            <Badge size="lg" color="violet" variant="dot">AI Shard Active</Badge>
        )}
      </Group>

      <SimpleGrid cols={{ base: 1, md: 3 }} spacing="lg">
        
        {/* 1. The Neural Link */}
        <Card shadow="sm" padding="lg" radius="md" withBorder>
          <Card.Section withBorder inheritPadding py="xs">
            <Group justify="space-between">
              <Text fw={500}>Neural Link</Text>
              <BrainCircuit size={20} className="text-violet-500" />
            </Group>
          </Card.Section>
          
          <Text mt="sm" size="sm" c="dimmed">
            Access your personal AI Shard for cognitive support and tutoring.
          </Text>
          
          {/* FIX: Using LinkButton to avoid serialization error */}
          <LinkButton 
            href={`/students/${student.id}/chat`} 
            fullWidth 
            mt="md" 
            color="violet" 
            variant="light"
          >
            Open Interface
          </LinkButton>
        </Card>

        {/* 2. Financial Status */}
        <Card shadow="sm" padding="lg" radius="md" withBorder>
          <Card.Section withBorder inheritPadding py="xs">
            <Group justify="space-between">
              <Text fw={500}>Yield of Capital</Text>
              <Wallet size={20} className="text-green-500" />
            </Group>
          </Card.Section>
          
          <Group mt="md" align="flex-end">
            <Title order={2}>
                {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(Number(student.financialBalance))}
            </Title>
          </Group>
          <Text size="xs" c="dimmed">Current Balance</Text>
        </Card>

        {/* 3. Academic Performance */}
        <Card shadow="sm" padding="lg" radius="md" withBorder>
          <Card.Section withBorder inheritPadding py="xs">
            <Group justify="space-between">
              <Text fw={500}>Performance</Text>
              <GraduationCap size={20} className="text-blue-500" />
            </Group>
          </Card.Section>
          
          <Group mt="md" align="flex-end">
            <Title order={2}>{student.academicGPA.toFixed(1)}</Title>
            <Text size="sm" mb={4} c="dimmed">/ 10.0</Text>
          </Group>
          <Text size="xs" c="dimmed">Current GPA</Text>
        </Card>

      </SimpleGrid>
    </Container>
  );
}