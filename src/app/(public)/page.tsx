import { Container, Title, Text, Button, Group, Paper, SimpleGrid, ThemeIcon } from '@mantine/core';
import { ArrowRight, BrainCircuit, ShieldCheck, Zap } from 'lucide-react';
import Link from 'next/link';

export default function LandingPage() {
  return (
    <Container size="xl" py={80}>
      {/* Hero Section */}
      <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
        <ThemeIcon variant="light" size={60} radius="xl" color="blue" mb="md">
           <BrainCircuit size={32} />
        </ThemeIcon>
        <Title order={1} size="3.5rem" mb="sm" style={{ letterSpacing: '-2px' }}>
           The Cognitive Operating System
        </Title>
        <Text c="dimmed" size="xl" maw={600} mx="auto" mb="xl">
          Co-evolution of Human and Artificial Intelligence. 
          Optimizing Yield of Capital, Space, and Soul.
        </Text>
        <Button component={Link} href="/login" size="lg" rightSection={<ArrowRight size={16} />}>
          Enter the Metasystem
        </Button>
      </div>

      {/* Value Props */}
      <SimpleGrid cols={{ base: 1, md: 3 }} spacing="xl" mt={50}>
        <Paper withBorder p="xl" radius="md">
          <ThemeIcon variant="light" color="teal" size="lg" mb="md">
            <Zap size={20} />
          </ThemeIcon>
          <Title order={3} mb="sm">Flow State</Title>
          <Text c="dimmed" size="sm">
            Real-time nervous system tracking for classroom engagement and resonance optimization.
          </Text>
        </Paper>

        <Paper withBorder p="xl" radius="md">
          <ThemeIcon variant="light" color="indigo" size="lg" mb="md">
            <BrainCircuit size={20} />
          </ThemeIcon>
          <Title order={3} mb="sm">Symbiosis</Title>
          <Text c="dimmed" size="sm">
            AI Shards assigned to every student node, evolving with their cognitive profile.
          </Text>
        </Paper>

        <Paper withBorder p="xl" radius="md">
          <ThemeIcon variant="light" color="orange" size="lg" mb="md">
            <ShieldCheck size={20} />
          </ThemeIcon>
          <Title order={3} mb="sm">Sovereignty</Title>
          <Text c="dimmed" size="sm">
            Local-first architecture ensures your franchise data never leaves your control.
          </Text>
        </Paper>
      </SimpleGrid>
    </Container>
  );
}