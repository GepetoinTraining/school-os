'use server'

import { prisma } from '@/lib/prisma';
import { revalidatePath } from 'next/cache';

export async function sendShardMessage(studentId: string, content: string) {
  // 1. Retrieve the Shard
  const student = await prisma.student.findUnique({
    where: { id: studentId },
    include: { shard: true }
  });

  if (!student?.shard) {
    return { error: "No Neural Link found (Shard missing)" };
  }

  // 2. Find or Create Active Session (Simplified for now)
  // In a real scenario, we'd find the open session for today
  let session = await prisma.chatSession.findFirst({
    where: { userId: student.userId },
    orderBy: { createdAt: 'desc' }
  });

  if (!session) {
    session = await prisma.chatSession.create({
      data: {
        userId: student.userId,
        topic: "General Sync",
        summary: "Session started",
      }
    });
  }

  // 3. Log the User's Input (Hypothetically, if schema updated)
  // await prisma.chatMessage.create({ ... })

  // 4. GENERATE RESPONSE (The Ghost in the Shell)
  // This is where we will eventually call the AI API.
  // For now, we simulate the Shard's "Cognitive Weights" responding.
  
  const cognitiveState = student.shard.cognitiveWeights as any;
  const resonance = "Stable"; 

  const response = {
    role: 'assistant',
    content: `Resonance verified. I am analyzing your input: "${content}". My current cognitive load is nominal.`,
    timestamp: new Date(),
  };

  return { success: true, data: response };
}

export async function igniteShard(studentId: string) {
  // Genesis Event: Create a Shard for a student if one doesn't exist
  const shard = await prisma.aIShard.create({
    data: {
      studentId,
      version: "v0.1 (Genesis)",
      lastResonanceSync: new Date(),
      cognitiveWeights: { attention: 0.5, curiosity: 0.8 }, // Default DNA
    }
  });
  
  revalidatePath(`/students/${studentId}/chat`);
  return shard;
}