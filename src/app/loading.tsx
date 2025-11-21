// src/app/loading.tsx
import { Center, Loader, Stack, Text, ThemeIcon } from '@mantine/core';
import { BrainCircuit } from 'lucide-react';

export default function GlobalLoading() {
  return (
    <Center h="100vh" bg="gray.0">
      <Stack align="center" gap="md">
        <ThemeIcon 
          size={80} 
          radius="xl" 
          variant="gradient" 
          gradient={{ from: 'blue', to: 'cyan', deg: 45 }}
        >
          <BrainCircuit size={40} className="animate-pulse" />
        </ThemeIcon>
        
        <Loader size="xl" type="dots" color="blue" />
        
        <Text c="dimmed" size="sm" fw={500} className="animate-pulse">
          SYNCHRONIZING METASYSTEM...
        </Text>
      </Stack>
    </Center>
  );
}