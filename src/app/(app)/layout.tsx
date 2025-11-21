import { SchoolOSShell } from '@/components/SchoolOSShell';
import { auth } from '@/auth';
import { redirect } from 'next/navigation';

export default async function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  if (!session) {
    redirect('/login');
  }

  // EXTRACT ROLE (Default to STUDENT if missing)
  const userRole = (session.user as any).role || 'STUDENT';

  // PASS IT DOWN
  return (
    <SchoolOSShell userRole={userRole}>
      {children}
    </SchoolOSShell>
  );
}