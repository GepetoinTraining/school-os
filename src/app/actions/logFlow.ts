'use server';

import { prisma } from '@/lib/prisma';
import { revalidatePath } from 'next/cache';

export async function logFlowState(studentId: string, score: number, state: string) {
  if (!studentId) return { success: false, message: 'Student ID required' };

  try {
    await prisma.flowLog.create({
      data: {
        studentId,
        score,
        state,
        timeTaken: 0, // Can be enhanced later with duration tracking
      },
    });

    // We might want to update the student's "Current Resonance" here in the future
    
    revalidatePath(`/students/${studentId}`);
    return { success: true };
  } catch (error) {
    console.error('Failed to log flow:', error);
    return { success: false, message: 'Database error' };
  }
}