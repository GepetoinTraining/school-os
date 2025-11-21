'use client';

import { AppShell, Burger, Group, NavLink, Text, ThemeIcon, Button } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { 
  LayoutDashboard, 
  Users, 
  Wallet, 
  BrainCircuit,
  Network,
  Settings,
  Activity,
  LogOut
} from 'lucide-react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
// import { signOut } from 'next-auth/react'; // Optional: If you want client-side logout later

interface SchoolOSShellProps {
  children: React.ReactNode;
  userRole: string; // <--- Receive the prop
}

export function SchoolOSShell({ children, userRole }: SchoolOSShellProps) {
  const [opened, { toggle }] = useDisclosure();
  const pathname = usePathname();

  // DEFINING PERMISSIONS
  const isStudent = userRole === 'STUDENT';
  const isTeacher = userRole === 'TEACHER';
  const isAdmin = userRole === 'ADMIN';

  return (
    <AppShell
      header={{ height: 60 }}
      navbar={{
        width: 300,
        breakpoint: 'sm',
        collapsed: { mobile: !opened },
      }}
      padding="md"
    >
      <AppShell.Header>
        <Group h="100%" px="md" justify="space-between">
          <Group>
            <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" />
            <Group gap="xs">
              <ThemeIcon variant="light" size="lg" color={isStudent ? 'violet' : 'blue'}>
                <BrainCircuit size={20} />
              </ThemeIcon>
              <Text fw={700} size="xl" style={{ letterSpacing: '-1px' }}>
                SchoolOS
              </Text>
            </Group>
          </Group>
          <Text size="sm" c="dimmed" visibleFrom="sm">
             v0.4 (Synapse) • {userRole}
          </Text>
        </Group>
      </AppShell.Header>

      <AppShell.Navbar p="md">
        <Text size="xs" fw={500} c="dimmed" mb="sm" tt="uppercase">
          Metasystem Navigation
        </Text>

        {/* --- ADMIN & TEACHER LINKS --- */}
        {!isStudent && (
            <>
                {isAdmin && (
                    <NavLink
                        component={Link}
                        href="/dashboard"
                        label="Cockpit"
                        leftSection={<LayoutDashboard size={16} />}
                        active={pathname === '/dashboard'}
                        variant="light"
                    />
                )}
                
                <NavLink
                    component={Link}
                    href="/flow"
                    label="Classroom (Flow)"
                    leftSection={<Activity size={16} />}
                    active={pathname === '/flow'}
                    color="indigo"
                    variant="light"
                />
                <NavLink
                    component={Link}
                    href="/students"
                    label="Human Nodes"
                    leftSection={<Users size={16} />}
                    active={pathname.startsWith('/students')}
                />
                
                {isAdmin && (
                    <>
                        <NavLink
                            component={Link}
                            href="/finance"
                            label="Ledger"
                            leftSection={<Wallet size={16} />}
                            active={pathname.startsWith('/finance')}
                        />
                        <NavLink
                            component={Link}
                            href="/shards"
                            label="Symbiosis Engine"
                            leftSection={<BrainCircuit size={16} />}
                            active={pathname.startsWith('/shards')}
                        />
                        <NavLink
                            component={Link}
                            href="/network"
                            label="Referral Tree"
                            leftSection={<Network size={16} />}
                            active={pathname === '/network'}
                        />
                    </>
                )}
            </>
        )}

        {/* --- STUDENT LINKS --- */}
        {isStudent && (
            <>
                <NavLink
                    component={Link}
                    href="/portal"
                    label="My Portal"
                    leftSection={<LayoutDashboard size={16} />}
                    active={pathname === '/portal'}
                    color="violet"
                    variant="light"
                />
                {/* Future: Add 'My Schedule', 'My Finances' sub-pages here */}
            </>
        )}
        
        <Text size="xs" fw={500} c="dimmed" mt="xl" mb="sm" tt="uppercase">
          System
        </Text>
        
        <NavLink
          component={Link}
          href="/settings"
          label="Configuration"
          leftSection={<Settings size={16} />}
          active={pathname === '/settings'}
        />

         {/* A temporary escape hatch until we build the Profile Menu */}
         <NavLink
            component={Link}
            href="/api/auth/signout"
            label="Disconnect"
            leftSection={<LogOut size={16} />}
            color="red"
         />

      </AppShell.Navbar>

      <AppShell.Main bg="gray.0">
        {children}
      </AppShell.Main>
    </AppShell>
  );
}