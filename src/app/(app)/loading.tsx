// src/app/(app)/loading.tsx
import { Center, Loader, Stack, Text } from '@mantine/core';

export default function DashboardLoading() {
  return (
    <Center h="100%" style={{ minHeight: 'calc(100vh - 100px)' }}>
      <Stack align="center" gap="xs">
        <Loader color="violet" size="lg" type="bars" />
        <Text size="xs" c="dimmed" tt="uppercase" fw={700} style={{ letterSpacing: '2px' }}>
          Fetching Node Data
        </Text>
      </Stack>
    </Center>
  );
}