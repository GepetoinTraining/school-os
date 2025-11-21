import { prisma } from '@/lib/prisma';
import { StudentList } from '@/components/StudentList';
import { Container, Title, Text, Group, Button } from '@mantine/core';
import { UserPlus } from 'lucide-react';
// Import types explicitly
import type { Student, User } from '@prisma/client';

export const dynamic = 'force-dynamic';

// Define the combined type for the query result
type StudentWithUser = Student & { user: User };

export default async function StudentsPage() {
  // Fetch students with their associated User data
  // We explicitly cast the result to ensure TS knows the shape
  const studentsRaw = await prisma.student.findMany({
    include: {
      user: true,
    },
    orderBy: {
      academicGPA: 'desc',
    },
  }) as StudentWithUser[];

  // Transform data for the UI
  const students = studentsRaw.map((s: StudentWithUser) => ({
    id: s.id,
    name: s.user.email.split('@')[0],
    email: s.user.email,
    gpa: s.academicGPA,
    attendance: s.attendanceRate,
    balance: new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(s.financialBalance.toNumber()),
    status: s.academicGPA < 6 ? 'RISK' : 'GOOD' as const,
  }));

  return (
    <Container size="xl" py="md">
      <Group justify="space-between" mb="lg">
        <div>
          <Title order={2}>Human Nodes</Title>
          <Text c="dimmed" size="sm">Active Student Directory</Text>
        </div>
        <Button leftSection={<UserPlus size={16} />}>Enroll Node</Button>
      </Group>
      
      <StudentList students={students} />
    </Container>
  );
}