'use server';

import { prisma } from '@/lib/prisma';
import { Prisma } from '@prisma/client'; // Import the type
import { revalidatePath } from 'next/cache';

export type IngestResult = {
  success: boolean;
  message: string;
  count?: number;
  errors?: string[];
};

export async function ingestStudents(formData: FormData): Promise<IngestResult> {
  const file = formData.get('file') as File;
  
  if (!file) {
    return { success: false, message: 'No file provided.' };
  }

  const text = await file.text();
  const rows = text.split('\n').filter(row => row.trim() !== '');
  
  // Assumption: CSV Headers -> email,taxId,gpa,balance,attendance
  const dataRows = rows.slice(1);
  
  let successCount = 0;
  const errors: string[] = [];

  try {
    for (const row of dataRows) {
      const columns = row.split(',').map(c => c.trim());
      const [email, taxId, gpa, balance, attendance] = columns;

      if (!email) continue;

      try {
        // Typed the transaction client here
        await prisma.$transaction(async (tx: Prisma.TransactionClient) => {
            // 1. Create the Identity (User)
            const user = await tx.user.create({
                data: {
                    email,
                    taxId: taxId || null,
                    role: 'STUDENT',
                }
            });

            // 2. Create the Biological Node (Student)
            const seed = Math.random().toString(36).substring(2, 7).toUpperCase();
            const referralCode = `REF-${seed}`;

            await tx.student.create({
                data: {
                    userId: user.id,
                    referralCode,
                    academicGPA: parseFloat(gpa) || 0.0,
                    financialBalance: parseFloat(balance) || 0.0,
                    attendanceRate: parseFloat(attendance) || 100.0,
                }
            });
        });
        successCount++;
      } catch (err: any) {
        console.error(`Failed to ingest ${email}:`, err);
        errors.push(`${email}: ${err.message}`);
      }
    }

    revalidatePath('/students');
    revalidatePath('/');
    
    return {
      success: true,
      message: `Ingestion complete. Processed ${successCount} nodes.`,
      count: successCount,
      errors
    };

  } catch (error: any) {
    return { success: false, message: `System Error: ${error.message}` };
  }
}