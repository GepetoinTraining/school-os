'use server'

import { prisma } from '@/lib/prisma';

// Export the return type for explicit usage if needed
export type AnalysisResult = {
  state: 'FLOW' | 'ANXIETY' | 'BOREDOM' | 'APATHY' | 'UNKNOWN';
  trend: 'ASCENDING' | 'CRASHING' | 'STABLE' | 'FLAT';
  avgScore: number;
  history: any[]; // or FlowLog[] if you import the type
};

export async function analyzeStudentPulse(studentId: string) {
  const logs = await prisma.flowLog.findMany({
    where: { studentId },
    orderBy: { timestamp: 'desc' },
    take: 10,
  });

  // FIX: Return full object structure even if empty
  if (logs.length === 0) {
    return { 
        state: 'UNKNOWN', 
        trend: 'FLAT', 
        avgScore: 0, 
        history: [] 
    };
  }

  const avgScore = logs.reduce((acc, log) => acc + log.score, 0) / logs.length;
  
  let state = 'APATHY';
  if (avgScore >= 7.5) state = 'FLOW';
  else if (avgScore <= 4) state = 'ANXIETY';
  else state = 'BOREDOM';

  const recent = logs[0].score;
  const old = logs[logs.length - 1].score;
  const trend = recent > old ? 'ASCENDING' : recent < old ? 'CRASHING' : 'STABLE';

  // Update Shard (Side Effect) kept same as before...
  const student = await prisma.student.findUnique({ where: { id: studentId }, include: { shard: true }});
  if (student?.shard) {
    await prisma.aIShard.update({
      where: { id: student.shard.id },
      data: {
        cognitiveWeights: {
            ...student.shard.cognitiveWeights as object,
            currentPulse: avgScore,
            dominantState: state,
            trend: trend
        },
        lastResonanceSync: new Date()
      }
    });
  }

  return { state, avgScore, trend, history: logs };
}