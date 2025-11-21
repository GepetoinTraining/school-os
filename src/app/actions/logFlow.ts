'use server'

import { prisma } from '@/lib/prisma';
import { revalidatePath } from 'next/cache';
import { analyzeStudentPulse } from '@/app/actions/cortex'; // Ensure this import exists from previous turn

export async function logFlowState(studentId: string, score: number) {
  try {
    // 1. Log the raw biological signal
    await prisma.flowLog.create({
      data: {
        studentId,
        score,
        state: score > 7 ? 'FLOW' : score < 4 ? 'ANXIETY' : 'BOREDOM',
        timeTaken: 0, // Instant log
      }
    });

    // 2. TRIGGER THE CORTEX (The Synapse)
    // We immediately analyze the new trend to update the Shard's cognitive weights
    const analysis = await analyzeStudentPulse(studentId);

    // 3. Refresh the nervous system views
    revalidatePath('/flow');
    revalidatePath(`/students/${studentId}`);
    revalidatePath(`/students/${studentId}/flow`);
    
    return { 
        success: true, 
        newTrend: analysis.trend,
        message: `Signal received. Shard updated to ${analysis.state}.` 
    };
  } catch (error) {
    console.error("Synapse Misfire:", error);
    return { success: false, message: "Failed to transmit signal." };
  }
}