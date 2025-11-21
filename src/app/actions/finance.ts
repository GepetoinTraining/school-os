'use server'

import { prisma } from '@/lib/prisma';
import { revalidatePath } from 'next/cache';
import { z } from 'zod';

// Strict validation for money
const TransactionSchema = z.object({
  description: z.string().min(3),
  amount: z.number().positive(),
  type: z.enum(['INCOME', 'EXPENSE']),
  taxRegime: z.enum(['ISS', 'ICMS']).optional(),
});

export async function recordTransaction(formData: FormData) {
  // 1. Extract & Validate
  const rawData = {
    description: formData.get('description'),
    amount: parseFloat(formData.get('amount') as string),
    type: formData.get('type'),
    taxRegime: formData.get('taxRegime') || undefined,
  };

  const validation = TransactionSchema.safeParse(rawData);

  if (!validation.success) {
    return { success: false, error: "Invalid financial data. Check amount and description." };
  }

  const data = validation.data;

  // 2. Execute Atomic Write
  try {
    await prisma.ledgerTransaction.create({
      data: {
        description: data.description,
        amount: data.amount, // Prisma handles numbers to Decimals automatically usually, or requires string
        type: data.type,
        taxRegime: data.taxRegime,
        timestamp: new Date(),
      }
    });

    // 3. Re-calculate Vital Signs (Implicit via Next.js Cache clearing)
    revalidatePath('/finance');
    revalidatePath('/dashboard');
    
    return { success: true, message: "Transaction logged to Ledger." };
  } catch (e) {
    return { success: false, error: "Database Ledger Lock. transaction failed." };
  }
}