import { prisma } from '@/lib/prisma';
import { ReferralTable } from '@/components/ReferralTable';
import { Container, Title, Text, Alert } from '@mantine/core';
import { InfoIcon } from 'lucide-react';
import type { Student, User } from '@prisma/client';

export const dynamic = 'force-dynamic';

// Complex type for relation aggregation
type StudentWithNetwork = Student & { 
  user: User; 
  _count: { referrals: number } 
};

export default async function NetworkPage() {
  // Find students who have referred at least one person
  const networkNodesRaw = await prisma.student.findMany({
    where: {
      referrals: {
        some: {} // Only get students who have referrals
      }
    },
    include: {
      user: true,
      _count: {
        select: { referrals: true }
      }
    },
    orderBy: {
      referrals: {
        _count: 'desc'
      }
    }
  }) as StudentWithNetwork[];

  const nodes = networkNodesRaw.map((s) => ({
    id: s.id,
    name: s.user.email.split('@')[0],
    gpa: s.academicGPA,
    referralsMade: s._count.referrals,
    // Mock calculation: Base Tuition * 12 * (1 + Referrals)
    ltv: new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(1200 * 12 * (1 + s._count.referrals)),
  }));

  return (
    <Container size="xl" py="md">
      <Title order={2} mb={4}>The Network</Title>
      <Text c="dimmed" mb="lg">Social Capital & High-Leverage Nodes</Text>

      {nodes.length === 0 ? (
        <Alert icon={<InfoIcon size={16} />} title="Network Silent" color="blue">
          No referral connections detected in the current dataset. The "Bruno Effect" is dormant.
        </Alert>
      ) : (
        <ReferralTable nodes={nodes} />
      )}
    </Container>
  );
}