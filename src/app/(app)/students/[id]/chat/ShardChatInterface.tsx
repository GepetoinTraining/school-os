'use client';

import { useState, useRef, useEffect } from 'react';
import { Box, TextInput, ActionIcon, Group, Text, Avatar, LoadingOverlay } from '@mantine/core';
import { Send, Bot, User as UserIcon } from 'lucide-react';
import { sendShardMessage } from '@/app/actions/shards';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

export function ShardChatInterface({ studentId, shardVersion }: { studentId: string, shardVersion: string }) {
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
        id: 'init',
        role: 'assistant',
        content: `System Initialized. Running ${shardVersion}. Ready to sync.`,
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
        }
    } catch (error) {
        console.error("Link disrupted", error);
    } finally {
        setLoading(false);
    }
  };

  return (
    <>
      <Box flex={1} style={{ position: 'relative', overflow: 'hidden' }}>
        <div ref={viewport} style={{ height: '100%', overflowY: 'auto', padding: '1rem' }}>
            {messages.map((msg) => (
                <Group key={msg.id} justify={msg.role === 'user' ? 'flex-end' : 'flex-start'} mb="md" align="flex-start">
                    {msg.role === 'assistant' && (
                        <Avatar color="violet" radius="xl"><Bot size={18} /></Avatar>
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
                        <Avatar color="blue" radius="xl"><UserIcon size={18} /></Avatar>
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
                color="blue" 
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