'use client';

import { Container, Title, Text, SimpleGrid, Card, Image, Badge, Group, Button, ThemeIcon } from '@mantine/core';
import { Code, FlaskConical, Globe, Palette } from 'lucide-react';
import Link from 'next/link';

const courses = [
  {
    title: 'Cognitive Python',
    category: 'Computer Science',
    level: 'Beginner',
    icon: <Code size={24} />,
    color: 'blue',
    description: 'Learn to code by building your own AI shard. A symbiotic approach to logic and syntax.'
  },
  {
    title: 'Biological Arts',
    category: 'Design',
    level: 'Intermediate',
    icon: <Palette size={24} />,
    color: 'pink',
    description: 'Exploring aesthetics through the lens of natural patterns and golden ratios.'
  },
  {
    title: 'Global Systems',
    category: 'Humanities',
    level: 'Advanced',
    icon: <Globe size={24} />,
    color: 'teal',
    description: 'Understanding the flow of capital, history, and sociology in a connected world.'
  },
  {
    title: 'Applied Physics',
    category: 'Science',
    level: 'Intermediate',
    icon: <FlaskConical size={24} />,
    color: 'orange',
    description: 'From Newton to Quantum mechanics, creating a foundation for engineering reality.'
  }
];

export default function CoursesPage() {
  return (
    <Container size="xl" py={60}>
      <Title order={1} mb="md" ta="center">Academic Pathways</Title>
      <Text c="dimmed" ta="center" maw={600} mx="auto" mb={60}>
        Our curriculum is designed not just to transfer knowledge, but to increase the resonance of every student node.
      </Text>

      <SimpleGrid cols={{ base: 1, sm: 2, md: 4 }} spacing="lg">
        {courses.map((course) => (
          <Card key={course.title} padding="lg" radius="md" withBorder>
            <Group justify="space-between" mb="md">
                <ThemeIcon size="xl" radius="md" color={course.color} variant="light">
                    {course.icon}
                </ThemeIcon>
                <Badge variant="light" color="gray">{course.level}</Badge>
            </Group>
            
            <Text fw={700} size="lg" mt="md">{course.title}</Text>
            <Text size="xs" c="dimmed" tt="uppercase" fw={700} mt="xs" color={course.color}>
                {course.category}
            </Text>
            
            <Text size="sm" c="dimmed" mt="sm" style={{ minHeight: 60 }}>
                {course.description}
            </Text>

            <Button component={Link} href="/enroll" variant="light" color={course.color} fullWidth mt="md">
                View Syllabus
            </Button>
          </Card>
        ))}
      </SimpleGrid>
    </Container>
  );
}