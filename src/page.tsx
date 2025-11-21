import { Container, Title, Text, Group, Button, Paper, Stack, ThemeIcon } from '@mantine/core';
import { ArrowRight, Building2, UserCheck } from 'lucide-react';
import Link from 'next/link';

export default function GatewayPage() {
  return (
    <div style={{ 
      height: '100vh', 
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'center',
      background: 'radial-gradient(circle at center, #f8f9fa 0%, #e9ecef 100%)' 
    }}>
      <Container size="xs">
        <Paper shadow="xl" p="xl" radius="lg" withBorder style={{ borderColor: 'rgba(0,0,0,0.1)' }}>
          <Stack align="center" gap="lg" mb="xl">
            <ThemeIcon size={64} radius="md" variant="gradient" gradient={{ from: 'black', to: 'gray', deg: 145 }}>
              <Building2 size={32} />
            </ThemeIcon>
            <div style={{ textAlign: 'center' }}>
              <Title order={2}>SchoolOS</Title>
              <Text c="dimmed">Metasystem Access Control</Text>
            </div>
          </Stack>

          <Stack gap="md">
            {/* Option A: The Insider */}
            <Button 
              component={Link} 
              href="/login" 
              fullWidth 
              size="lg" 
              color="black"
              rightSection={<UserCheck size={20} />}
              justify="space-between"
            >
              I am a Member
            </Button>

            {/* Option B: The Outsider */}
            <Button 
              component={Link} 
              href="/home" 
              fullWidth 
              size="lg" 
              variant="default"
              rightSection={<ArrowRight size={20} />}
              justify="space-between"
            >
              I want to learn more
            </Button>
          </Stack>
          
          <Text c="dimmed" size="xs" ta="center" mt="xl">
            v0.4 (The Synapse) • System Operational
          </Text>
        </Paper>
      </Container>
    </div>
  );
}