import { Container, Title, Text, Button, Paper, Switch, Group, Stack, Divider } from '@mantine/core';
import { ShieldAlert, Database, Server } from 'lucide-react';

export const dynamic = 'force-dynamic';

export default function SettingsPage() {
  return (
    <Container size="xl" py="md">
      <Title order={2} mb="md">Configuration</Title>
      
      <Paper withBorder p="md" radius="md" mb="lg">
        <Group mb="md">
          <ShieldAlert size={20} className="text-orange-500" />
          <Text fw={700}>Franchise Shield (Data Sovereignty)</Text>
        </Group>
        <Text size="sm" c="dimmed" mb="lg">
          Configure how data leaves the local instance. By default, all "Cognitive" data is stripped before export.
        </Text>
        
        <Stack gap="md">
          <Group justify="space-between">
            <Text size="sm">Sanitize Export (Remove Shard Data)</Text>
            <Switch defaultChecked onLabel="ON" offLabel="OFF" color="orange" />
          </Group>
          <Divider />
          <Group justify="space-between">
            <Text size="sm">Block External Sync (Air Gap Mode)</Text>
            <Switch defaultChecked onLabel="ON" offLabel="OFF" />
          </Group>
        </Stack>
      </Paper>

      <Paper withBorder p="md" radius="md">
        <Group mb="md">
          <Server size={20} />
          <Text fw={700}>Data Operations</Text>
        </Group>
        <Group>
          <Button variant="outline" color="gray" leftSection={<Database size={16} />}>
            Run Seed Script
          </Button>
          <Button variant="outline" color="red">
            Purge Cache
          </Button>
        </Group>
      </Paper>
    </Container>
  );
}