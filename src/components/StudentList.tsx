'use client';

import { Paper, Table, Badge, Group, Text, ActionIcon } from '@mantine/core';
import { Eye, MoreHorizontal } from 'lucide-react';
import Link from 'next/link';

interface StudentData {
  id: string;
  name: string; // From User relation
  email: string; // From User relation
  gpa: number;
  attendance: number;
  balance: string; // Formatted currency
  status: 'GOOD' | 'RISK' | 'CRITICAL';
}

export function StudentList({ students }: { students: StudentData[] }) {
  const rows = students.map((student) => (
    <Table.Tr key={student.id}>
      <Table.Td>
        <Group gap="sm">
          <div>
            <Text size="sm" fw={500}>{student.name || 'Unknown Node'}</Text>
            <Text size="xs" c="dimmed">{student.email}</Text>
          </div>
        </Group>
      </Table.Td>
      <Table.Td>
        <Badge 
          color={student.gpa >= 7 ? 'teal' : student.gpa >= 5 ? 'yellow' : 'red'} 
          variant="light"
        >
          {student.gpa.toFixed(1)}
        </Badge>
      </Table.Td>
      <Table.Td>{student.attendance}%</Table.Td>
      <Table.Td style={{ fontFamily: 'monospace' }}>{student.balance}</Table.Td>
      <Table.Td>
        <Group gap={0} justify="flex-end">
          <ActionIcon 
  variant="subtle" 
  color="gray" 
  component={Link} 
  href={`/students/${student.id}`}
>
  <Eye size={16} />
</ActionIcon>
          <ActionIcon variant="subtle" color="gray">
            <MoreHorizontal size={16} />
          </ActionIcon>
        </Group>
      </Table.Td>
    </Table.Tr>
  ));

  return (
    <Paper withBorder p="md" radius="md">
      <Table verticalSpacing="sm">
        <Table.Thead>
          <Table.Tr>
            <Table.Th>Student Node</Table.Th>
            <Table.Th>Academic GPA</Table.Th>
            <Table.Th>Attendance</Table.Th>
            <Table.Th>Balance (BRL)</Table.Th>
            <Table.Th />
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>{rows}</Table.Tbody>
      </Table>
    </Paper>
  );
}