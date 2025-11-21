import { prisma } from '@/lib/prisma';
import { ShardGrid } from '@/components/ShardGrid';
import { Container, Title, Text, Group, Button } from '@mantine/core';
import { Sparkles } from 'lucide-react';
import type { AIShard, Student, User } from '@prisma/client';

export const dynamic = 'force-dynamic';

// Type intersection for the raw database result
type ShardWithStudent = AIShard & { 
  student: Student & { 
    user: User 
  } 
};

export default async function ShardsPage() {
  const shardsRaw = await prisma.aIShard.findMany({
    include: {
      student: {
        include: { user: true }
      }
    }
  }) as ShardWithStudent[];

  const shards = shardsRaw.map((s) => ({
    id: s.id,
    studentName: s.student.user.email.split('@')[0], // Placeholder logic
    version: s.version,
    // Calculate resonance from Logs (mocked for now as we don't have logs in seed yet)
    syncScore: 8.5, 
    weights: JSON.stringify(s.cognitiveWeights, null, 2),
    isVaulted: s.isVaulted,
  }));

  return (
    <Container size="xl" py="md">
      <Group justify="space-between" mb="lg">
        <div>
          <Title order={2}>Symbiosis Engine</Title>
          <Text c="dimmed" size="sm">Active Neural Shards</Text>
        </div>
        <Button leftSection={<Sparkles size={16} />} color="violet">Genesis Protocol</Button>
      </Group>
      
      <ShardGrid shards={shards} />
    </Container>
  );
}