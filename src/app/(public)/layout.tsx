import { Container, Group, Text, Button, ThemeIcon, Anchor } from '@mantine/core';
import { BrainCircuit } from 'lucide-react';
import Link from 'next/link';

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      {/* Institutional Header */}
      <header style={{ borderBottom: '1px solid #eee', padding: '1rem 0' }}>
        <Container size="xl">
          <Group justify="space-between">
            <Group gap="xs">
              <ThemeIcon variant="light" size="lg" color="blue">
                <BrainCircuit size={20} />
              </ThemeIcon>
              <Text fw={700} size="lg" style={{ letterSpacing: '-1px' }}>
                SchoolOS
              </Text>
            </Group>
            <Group>
              <Button component={Link} href="/login" variant="subtle">
                Access Portal
              </Button>
              <Button component={Link} href="/about" variant="outline" display="none">
                About
              </Button>
            </Group>
          </Group>
        </Container>
      </header>

      {/* Main Content */}
      <main style={{ flex: 1, backgroundColor: '#f8f9fa' }}>
        {children}
      </main>

      {/* Institutional Footer */}
      <footer style={{ borderTop: '1px solid #eee', padding: '2rem 0', backgroundColor: 'white' }}>
        <Container size="xl">
          <Group justify="space-between">
             <Text size="xs" c="dimmed">
                © 2025 SchoolOS Metasystem. Balneário Camboriú.
             </Text>
             <Group gap="lg">
                <Anchor size="xs" c="dimmed" href="#">Privacy</Anchor>
                <Anchor size="xs" c="dimmed" href="#">Terms</Anchor>
                <Anchor size="xs" c="dimmed" href="#">Contact</Anchor>
             </Group>
          </Group>
        </Container>
      </footer>
    </div>
  );
}