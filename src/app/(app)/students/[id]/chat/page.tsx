import { prisma } from '@/lib/prisma';
import { Container, Title, Text, Paper, Group, ScrollArea, TextInput, ActionIcon, Avatar, Badge, Button, Center, Stack } from '@mantine/core';
import { Send, Cpu, Zap, BrainCircuit } from 'lucide-react';
import { ShardChatInterface } from './ShardChatInterface'; // Client Component

// Server Component
export default async function ShardChatPage({ params }: { params: { id: string } }) {
  const student = await prisma.student.findUnique({
    where: { id: params.id },
    include: { 
      user: true,
      shard: true 
    }
  });

  if (!student) return <Text>Student not found</Text>;

  return (
    <Container size="md" h="calc(100vh - 100px)" py="md">
      {/* Header: The Neural Link Status */}
      <Group justify="space-between" mb="md">
        <Group>
          <ThemeIcon size="lg" variant="light" color="violet">
             <BrainCircuit size={20} />
          </ThemeIcon>
          <div>
            <Title order={3}>Neural Link</Title>
            <Text c="dimmed" size="xs">
              Connected to {student.user.email}
            </Text>
          </div>
        </Group>
        
        {student.shard ? (
            <Badge color="teal" variant="dot" size="lg">LINK ACTIVE</Badge>
        ) : (
            <Badge color="red" variant="outline">OFFLINE</Badge>
        )}
      </Group>

      {/* The Interface Body */}
      <Paper shadow="sm" radius="md" withBorder h="100%" style={{ overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
        
        {student.shard ? (
            <ShardChatInterface 
                studentId={student.id} 
                shardVersion={student.shard.version}
            />
        ) : (
            <Center h="100%">
                <Stack align="center">
                    <Cpu size={48} className="text-gray-300" />
                    <Text c="dimmed">No AI Shard assigned to this node.</Text>
                    <Button variant="light" color="violet" leftSection={<Zap size={16}/>}>
                        Ignite Genesis Shard
                    </Button>
                </Stack>
            </Center>
        )}
      </Paper>
    </Container>
  );
}

function ThemeIcon({ children, ...props }: any) {
    return <div {...props} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: 32, height: 32, borderRadius: 4, background: 'rgba(130, 87, 229, 0.1)', color: '#8257e5' }}>{children}</div>
}