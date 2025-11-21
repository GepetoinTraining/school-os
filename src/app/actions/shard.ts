'use server'

import { prisma } from '@/lib/prisma';
import { GoogleGenerativeAI } from '@google/generative-ai';

// Initialize the Brain
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

type ShardMode = 'SOCRATIC_TEACHER' | 'SUPPORTIVE_COACH' | 'STRICT_TUTOR';

export async function sendShardMessage(studentId: string, content: string) {
  // 1. Retrieve the Neural Context
  const student = await prisma.student.findUnique({
    where: { id: studentId },
    include: { 
        shard: true,
        // Get the last flow log to confirm current state
        flowLogs: {
            orderBy: { timestamp: 'desc' },
            take: 1
        }
    }
  });

  if (!student?.shard) {
    return { error: "Neural Link Severed (No Shard)" };
  }

  // 2. Determine Mode (The "Vibe" Check)
  const weights = student.shard.cognitiveWeights as any;
  const currentPulse = weights?.currentPulse || 5; 
  
  let mode: ShardMode = 'SOCRATIC_TEACHER';
  let systemTone = "";

  if (currentPulse < 4) {
    mode = 'SUPPORTIVE_COACH';
    systemTone = `
      CRITICAL: The student is currently experiencing ANXIETY (Flow Score: ${currentPulse}/10).
      - Your Tone: Gentle, reassuring, breaking things down.
      - Objective: Lower cognitive load. Restore confidence.
      - Constraint: Do NOT ask complex abstract questions. Give small, winnable steps.
    `;
  } else if (currentPulse > 8) {
    mode = 'STRICT_TUTOR';
    systemTone = `
      CRITICAL: The student is in FLOW (Flow Score: ${currentPulse}/10).
      - Your Tone: Challenging, concise, abstract.
      - Objective: Push boundaries. Increase complexity.
      - Constraint: Do NOT validate easy answers. Demand rigorous logic.
    `;
  } else {
    systemTone = `
      STATUS: The student is STABLE (Flow Score: ${currentPulse}/10).
      - Your Tone: Socratic, balanced, inquisitive.
      - Objective: Guide discovery.
    `;
  }

  // 3. GENERATE REAL RESPONSE (The Gemini Call)
  try {
    const chat = model.startChat({
      history: [
        {
          role: "user",
          parts: [{ text: `SYSTEM_INSTRUCTION: You are an AI Shard named "${student.shard.version}". ${systemTone}. Respond to the student.` }],
        },
        {
          role: "model",
          parts: [{ text: `Understood. I am calibrated to ${mode}. Ready.` }],
        }
      ],
      generationConfig: {
        maxOutputTokens: 150, // Keep it chatty and fast
        temperature: 0.7,
      },
    });

    const result = await chat.sendMessage(content);
    const responseText = result.response.text();

    // 4. Log the thought (Optional: Save to ChatMessage DB here later)

    return { 
      success: true, 
      data: {
          role: 'assistant',
          content: responseText,
          timestamp: new Date(),
          mode: mode 
      }
    };

  } catch (error) {
    console.error("Cortex Fracture:", error);
    return { 
        success: false, 
        data: {
            role: 'assistant',
            content: "[SYSTEM ERROR] The Neural Link is unstable. Please try again.",
            timestamp: new Date(),
            mode: 'STABLE'
        }
    };
  }
}