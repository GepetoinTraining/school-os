'use client';

import { Button, Group } from '@mantine/core';
import { logFlowState } from '@/app/actions/logFlow';
import { notifications } from '@mantine/notifications';
import { Zap, ZapOff } from 'lucide-react';
import { useState } from 'react';

export function LogFlowButton({ studentId }: { studentId: string }) {
  const [loading, setLoading] = useState(false);

  const handleLog = async (score: number, state: string) => {
    setLoading(true);
    const result = await logFlowState(studentId, score, state);
    setLoading(false);

    if (result.success) {
      notifications.show({
        title: 'Logged',
        message: `Student state: ${state}`,
        color: score > 5 ? 'green' : 'red',
      });
    }
  };

  return (
    <Group gap={5}>
      <Button 
        flex={1} 
        size="xs" 
        variant="light" 
        color="red" 
        onClick={() => handleLog(2, 'Anxiety')}
        loading={loading}
        leftSection={<ZapOff size={14} />}
      >
        Anxiety
      </Button>
      <Button 
        flex={1} 
        size="xs" 
        variant="light" 
        color="green" 
        onClick={() => handleLog(8, 'Flow')}
        loading={loading}
        leftSection={<Zap size={14} />}
      >
        Flow
      </Button>
    </Group>
  );
}