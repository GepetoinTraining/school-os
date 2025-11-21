'use client';

import { PublicHeader } from '@/components/PublicHeader';
import { Container, Group, Text, Anchor } from '@mantine/core';

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', backgroundColor: '#ffffff' }}>
      
      <PublicHeader />

      <main style={{ flex: 1 }}>
        {children}
      </main>

      <footer style={{ borderTop: '1px solid #eee', padding: '3rem 0', backgroundColor: '#f8f9fa' }}>
        <Container size="xl">
          <Group justify="space-between" align="start">
             <div style={{ maxWidth: 300 }}>
                <Text fw={700} mb="xs">SchoolOS Metasystem</Text>
                <Text size="sm" c="dimmed" lh={1.6}>
                    Empowering the next generation of nodes through symbiotic learning and biological resonance.
                </Text>
             </div>
             
             <Group gap={50} align="start">
                <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                    <Text fw={600} size="sm">Admissions</Text>
                    <Anchor component="a" href="/courses" size="sm" c="dimmed">Courses</Anchor>
                    <Anchor component="a" href="/enroll" size="sm" c="dimmed">Tuition</Anchor>
                    <Anchor component="a" href="/enroll" size="sm" c="dimmed">Scholarships</Anchor>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                    <Text fw={600} size="sm">Connect</Text>
                    <Anchor component="a" href="/login" size="sm" c="dimmed">Portal</Anchor>
                    <Anchor component="a" href="#" size="sm" c="dimmed">Instagram</Anchor>
                    <Anchor component="a" href="#" size="sm" c="dimmed">WhatsApp</Anchor>
                </div>
             </Group>
          </Group>
          <Text size="xs" c="dimmed" mt="xl" ta="center">
            © 2025 SchoolOS. Built in Balneário Camboriú.
          </Text>
        </Container>
      </footer>
    </div>
  );
}