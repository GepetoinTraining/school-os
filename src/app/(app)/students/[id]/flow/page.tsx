import { prisma } from '@/lib/prisma';
import { analyzeStudentPulse } from '@/app/actions/cortex'; // We just made this
import { FlowRhythm } from '@/components/FlowRhythm'; // We just made this
import { Container, Title, Text, Group, SimpleGrid, Card, ThemeIcon } from '@mantine/core';
import { Brain, Zap, AlertTriangle } from 'lucide-react';

export default async function StudentFlowPage({ params }: { params: { id: string } }) {
  const student = await prisma.student.findUnique({
    where: { id: params.id },
    include: { user: true }
  });

  if (!student) return <div>Node not found</div>;

  const analysis = await analyzeStudentPulse(student.id);

  // FIX: Defensive mapping. 
  // If history is somehow undefined, fallback to empty array.
  const chartData = (analysis.history || []).map(log => ({
    timestamp: new Date(log.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    score: log.score,
    state: log.state
  })).reverse();

  return (
    <Container size="xl" py="md">
      <Group mb="xl">
        <ThemeIcon size={42} radius="md" variant="light" color="orange">
            <Zap size={24} />
        </ThemeIcon>
        <div>
            <Title order={2}>Nervous System Monitor</Title>
            <Text c="dimmed">Biometric tracking for {student.user.email}</Text>
        </div>
      </Group>

      {/* The Main Biorhythm Chart */}
      <FlowRhythm 
        data={chartData} 
        average={analysis.avgScore ?? 0} // FIX: Fallback to 0 if undefined
        trend={analysis.trend} 
      />

      {/* Deep Analysis Cards */}
      <SimpleGrid cols={{ base: 1, sm: 3 }} mt="lg">
        <Card withBorder padding="lg" radius="md">
            <Group mb="xs">
                <Brain size={20} className="text-violet-500" />
                <Text fw={700}>Cognitive Load</Text>
            </Group>
            <Text size="sm" c="dimmed">
                {analysis.state === 'FLOW' ? 
                    "Optimal engagement. The subject is operating at peak capacity." : 
                 analysis.state === 'ANXIETY' ? 
                    "Overload detected. Subject may be facing difficulty spikes." : 
                    "Under-stimulation detected. Subject requires higher complexity tasks."
                }
            </Text>
        </Card>

        <Card withBorder padding="lg" radius="md">
            <Group mb="xs">
                <Zap size={20} className="text-yellow-500" />
                <Text fw={700}>Intervention Protocol</Text>
            </Group>
            <Text size="sm" c="dimmed">
                {analysis.trend === 'CRASHING' ? 
                    "IMMEDIATE: Suggest a break or a 'quick win' task to restore dopamine baseline." : 
                    "MONITOR: Maintain current difficulty curve. Do not interrupt."
                }
            </Text>
        </Card>
      </SimpleGrid>
    </Container>
  );
}