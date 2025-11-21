'use client';

import { Button, Group } from '@mantine/core';
import { logFlowState } from '@/app/actions/logFlow';
import { notifications } from '@mantine/notifications';
import { Zap, ZapOff } from 'lucide-react';
import { useState } from 'react';

export function LogFlowButton({ studentId }: { studentId: string }) {
  const [loading, setLoading] = useState(false);

  const handleLog = async (score: number, label: string) => {
    setLoading(true);
    
    // FIX: We removed the 3rd argument (state). 
    // The server action now automatically calculates 'ANXIETY' vs 'FLOW' based on the score.
    const result = await logFlowState(studentId, score);
    
    setLoading(false);

    if (result.success) {
      notifications.show({
        title: 'Signal Transmitted',
        message: `Cortex updated: ${label} detected.`,
        color: score > 5 ? 'green' : 'red',
        icon: score > 5 ? <Zap size={16}/> : <ZapOff size={16}/>
      });
    } else {
      notifications.show({
        title: 'Signal Failed',
        message: 'The Neural Link did not accept the update.',
        color: 'red',
      });
    }
  };

  return (
    <Group gap={5} grow>
      <Button 
        size="xs" 
        variant="light" 
        color="orange" 
        onClick={() => handleLog(2, 'Anxiety')}
        loading={loading}
        leftSection={<ZapOff size={14} />}
      >
        Anxiety
      </Button>
      <Button 
        size="xs" 
        variant="light" 
        color="teal" 
        onClick={() => handleLog(9, 'Flow')}
        loading={loading}
        leftSection={<Zap size={14} />}
      >
        Flow
      </Button>
    </Group>
  );
}