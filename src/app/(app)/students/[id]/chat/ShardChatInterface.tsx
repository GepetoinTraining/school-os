'use client';

import { useState, useRef, useEffect } from 'react';
import { Box, TextInput, ActionIcon, Group, Text, Avatar, Badge, Tooltip } from '@mantine/core';
import { Send, Bot, User as UserIcon, Sparkles, ShieldAlert, Zap } from 'lucide-react';
import { sendShardMessage } from '@/app/actions/shard';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  mode?: string;
}

export function ShardChatInterface({ studentId, shardVersion }: { studentId: string, shardVersion: string }) {
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [currentMode, setCurrentMode] = useState<string>('SOCRATIC_TEACHER');
  const [messages, setMessages] = useState<Message[]>([
    {
        id: 'init',
        role: 'assistant',
        content: `Neural Link Established. Version ${shardVersion}. I am reading your cognitive weights...`,
        timestamp: new Date()
    }
  ]);
  
  const viewport = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    if (viewport.current) {
        viewport.current.scrollTo({ top: viewport.current.scrollHeight, behavior: 'smooth' });
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMsg: Message = { id: Date.now().toString(), role: 'user', content: input, timestamp: new Date() };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setLoading(true);

    try {
        const response = await sendShardMessage(studentId, userMsg.content);
        if (response.success && response.data) {
            setMessages(prev => [...prev, { ...response.data, id: Date.now().toString() } as Message]);
            if (response.data.mode) setCurrentMode(response.data.mode);
        }
    } catch (error) {
        console.error("Link disrupted", error);
    } finally {
        setLoading(false);
    }
  };

  // Dynamic UI based on Mode
  const modeConfig = 
    currentMode === 'SUPPORTIVE_COACH' ? { color: 'blue', icon: <ShieldAlert size={14}/>, label: 'SUPPORT MODE' } :
    currentMode === 'STRICT_TUTOR' ? { color: 'orange', icon: <Zap size={14}/>, label: 'CHALLENGE MODE' } :
    { color: 'violet', icon: <Sparkles size={14}/>, label: 'STANDARD MODE' };

  return (
    <>
      {/* Status Header */}
      <Box p="xs" bg="gray.0" style={{ borderBottom: '1px solid #eee' }}>
        <Group justify="center">
            <Tooltip label="The AI adapts its personality based on your Flow Logs">
                <Badge 
                    variant="light" 
                    color={modeConfig.color} 
                    leftSection={modeConfig.icon}
                >
                    {modeConfig.label}
                </Badge>
            </Tooltip>
        </Group>
      </Box>

      <Box flex={1} style={{ position: 'relative', overflow: 'hidden' }}>
        <div ref={viewport} style={{ height: '100%', overflowY: 'auto', padding: '1rem' }}>
            {messages.map((msg) => (
                <Group key={msg.id} justify={msg.role === 'user' ? 'flex-end' : 'flex-start'} mb="md" align="flex-start">
                    {msg.role === 'assistant' && (
                        <Avatar color={modeConfig.color} radius="xl"><Bot size={18} /></Avatar>
                    )}
                    
                    <Box 
                        style={{ 
                            maxWidth: '75%', 
                            padding: '12px 16px', 
                            borderRadius: '12px',
                            backgroundColor: msg.role === 'user' ? '#228be6' : '#f8f9fa',
                            color: msg.role === 'user' ? 'white' : 'black',
                            borderTopLeftRadius: msg.role === 'assistant' ? 0 : 12,
                            borderTopRightRadius: msg.role === 'user' ? 0 : 12,
                        }}
                    >
                        <Text size="sm">{msg.content}</Text>
                    </Box>

                    {msg.role === 'user' && (
                        <Avatar color="gray" radius="xl"><UserIcon size={18} /></Avatar>
                    )}
                </Group>
            ))}
            {loading && <Text size="xs" c="dimmed" ml={50}>Thinking...</Text>}
        </div>
      </Box>

      <Box p="md" style={{ borderTop: '1px solid #eee' }}>
        <Group>
            <TextInput 
                placeholder="Transmit thought..." 
                value={input}
                onChange={(e) => setInput(e.currentTarget.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                style={{ flex: 1 }}
                disabled={loading}
            />
            <ActionIcon 
                variant="filled" 
                color="black" 
                size="lg" 
                onClick={handleSend}
                loading={loading}
            >
                <Send size={18} />
            </ActionIcon>
        </Group>
      </Box>
    </>
  );
}