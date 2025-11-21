'use client';

import {
  Paper,
  TextInput,
  PasswordInput,
  Checkbox,
  Button,
  Title,
  Text,
  Container,
  Group,
  Anchor,
} from '@mantine/core';

export default function LoginPage() {
  return (
    <Container size={420} my={40}>
      <Title ta="center">
        SchoolOS
      </Title>
      <Text c="dimmed" size="sm" ta="center" mt={5}>
        Identity Gate v0.1
      </Text>

      <Paper withBorder shadow="md" p={30} mt={30} radius="md">
        <TextInput label="Operational ID" placeholder="director@schoolos.local" required />
        <PasswordInput label="Access Key" placeholder="Your password" required mt="md" />
        
        <Group justify="space-between" mt="lg">
          <Checkbox label="Keep session active" />
          <Anchor component="button" size="sm">
            Forgot key?
          </Anchor>
        </Group>
        
        <Button fullWidth mt="xl">
          Authenticate
        </Button>
      </Paper>
    </Container>
  );
}