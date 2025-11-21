import { prisma } from '@/lib/prisma';
import { Container, Grid, Title, Text, Badge, Group, Paper, SimpleGrid, ThemeIcon } from '@mantine/core';
import { VarkChart } from '@/components/VarkChart';
import { BrainCircuit, Wallet, GraduationCap, Activity } from 'lucide-react';
import { notFound } from 'next/navigation';

export const dynamic = 'force-dynamic';

interface Props {
  params: Promise<{ id: string }>;
}

export default async function StudentProfilePage({ params }: Props) {
  const { id } = await params;

  const student = await prisma.student.findUnique({
    where: { id },
    include: {
      user: true,
      varkProfile: true,
      shard: true,
    },
  });

  if (!student) return notFound();

  // Default VARK if missing
  const vark = student.varkProfile || { visual: 25, aural: 25, readWrite: 25, kinesthetic: 25 };

  return (
    <Container size="xl" py="md">
      {/* Header */}
      <Group justify="space-between" mb="lg">
        <div>
          <Group align="center" gap="xs">
            <Title order={2}>{student.user.email.split('@')[0]}</Title>
            <Badge color={student.academicGPA < 6 ? 'red' : 'teal'}>
              {student.academicGPA < 6 ? 'RISK NODE' : 'STABLE'}
            </Badge>
          </Group>
          <Text c="dimmed" size="sm">{student.user.email} • {student.referralCode}</Text>
        </div>
        <Group>
           <Badge variant="outline" color="gray" leftSection={<BrainCircuit size={12} />}>
             Shard: {student.shard?.version || 'Unlinked'}
           </Badge>
        </Group>
      </Group>

      <Grid>
        {/* Left Column: Vitals */}
        <Grid.Col span={{ base: 12, md: 4 }}>
          <VarkChart data={vark} />
          
          <Paper withBorder p="md" radius="md" mt="md">
            <Text size="sm" fw={700} mb="md">Financial Yield</Text>
            <Group justify="space-between" mb="xs">
              <Group gap="xs">
                <ThemeIcon color="gray" variant="light" size="sm"><Wallet size={14}/></ThemeIcon>
                <Text size="sm">Balance</Text>
              </Group>
              <Text size="sm" fw={700} c={student.financialBalance.toNumber() < 0 ? 'red' : 'teal'}>
                R$ {student.financialBalance.toNumber().toFixed(2)}
              </Text>
            </Group>
            <Group justify="space-between">
              <Group gap="xs">
                <ThemeIcon color="gray" variant="light" size="sm"><Activity size={14}/></ThemeIcon>
                <Text size="sm">Attendance</Text>
              </Group>
              <Text size="sm" fw={700}>{student.attendanceRate}%</Text>
            </Group>
          </Paper>
        </Grid.Col>

        {/* Right Column: Performance (Placeholder for Flow Engine) */}
        <Grid.Col span={{ base: 12, md: 8 }}>
          <SimpleGrid cols={2} mb="md">
             <Paper withBorder p="md" radius="md">
               <Group gap="xs" mb="xs">
                 <ThemeIcon color="blue" variant="light"><GraduationCap size={16}/></ThemeIcon>
                 <Text size="xs" fw={700} tt="uppercase" c="dimmed">Academic GPA</Text>
               </Group>
               <Text size="4xl" fw={900} lh={1}>{student.academicGPA.toFixed(1)}</Text>
               <Text size="xs" c="dimmed">Last calculated 24h ago</Text>
             </Paper>
             <Paper withBorder p="md" radius="md">
               <Group gap="xs" mb="xs">
                 <ThemeIcon color="violet" variant="light"><BrainCircuit size={16}/></ThemeIcon>
                 <Text size="xs" fw={700} tt="uppercase" c="dimmed">Flow State Index</Text>
               </Group>
               <Text size="4xl" fw={900} lh={1}>{student.npsScore.toFixed(1)}</Text>
               <Text size="xs" c="dimmed">Based on 12 micro-interactions</Text>
             </Paper>
          </SimpleGrid>
          
          <Paper withBorder p="xl" radius="md" bg="gray.0">
            <Text c="dimmed" ta="center" fs="italic">
              "Flow Logs" visualization module coming in Phase 2. 
              Data aggregation is currently active in background.
            </Text>
          </Paper>
        </Grid.Col>
      </Grid>
    </Container>
  );
}