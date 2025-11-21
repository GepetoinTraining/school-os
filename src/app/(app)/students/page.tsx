import { prisma } from '@/lib/prisma';
import { StudentList } from '@/components/StudentList';
import { Container, Title, Text, Group, Button } from '@mantine/core';
import { UserPlus } from 'lucide-react';
import type { Student, User } from '@prisma/client';
import Link from 'next/link'; // Import Link

export const dynamic = 'force-dynamic';

type StudentWithUser = Student & { user: User };

export default async function StudentsPage() {
  const studentsRaw = await prisma.student.findMany({
    include: { user: true },
    orderBy: { academicGPA: 'desc' },
  }) as StudentWithUser[];

  const students = studentsRaw.map((s) => ({
    id: s.id,
    name: s.user.email.split('@')[0],
    email: s.user.email,
    gpa: s.academicGPA,
    attendance: s.attendanceRate,
    balance: new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(s.financialBalance.toNumber()),
    status: (s.academicGPA < 6 ? 'RISK' : 'GOOD') as "RISK" | "GOOD" | "CRITICAL",
  }));

  return (
    <Container size="xl" py="md">
      <Group justify="space-between" mb="lg">
        <div>
          <Title order={2}>Human Nodes</Title>
          <Text c="dimmed" size="sm">
            Active biological agents in the network.
          </Text>
        </div>
        {/* LINKED BUTTON */}
        <Button 
            component={Link} 
            href="/settings" 
            leftSection={<UserPlus size={16} />}
            variant="light"
        >
          Ingest Node
        </Button>
      </Group>

      <StudentList students={students} />
    </Container>
  );
}