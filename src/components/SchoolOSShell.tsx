'use client';

import { AppShell, Burger, Group, NavLink, Text, ThemeIcon } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { 
  LayoutDashboard, 
  Users, 
  Wallet, 
  BrainCircuit,
  Network,
  Settings,
  Activity
} from 'lucide-react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';

export function SchoolOSShell({ children }: { children: React.ReactNode }) {
  const [opened, { toggle }] = useDisclosure();
  const pathname = usePathname();

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
              <ThemeIcon variant="light" size="lg" color="blue">
                <BrainCircuit size={20} />
              </ThemeIcon>
              <Text fw={700} size="xl" style={{ letterSpacing: '-1px' }}>
                SchoolOS
              </Text>
            </Group>
          </Group>
          <Text size="sm" c="dimmed" visibleFrom="sm">
             v0.1 (Alpha)
          </Text>
        </Group>
      </AppShell.Header>

      <AppShell.Navbar p="md">
        <Text size="xs" fw={500} c="dimmed" mb="sm" tt="uppercase">
          Metasystem
        </Text>
        {/* Updated Link to /dashboard */}
        <NavLink
          component={Link}
          href="/dashboard"
          label="Cockpit"
          leftSection={<LayoutDashboard size={16} />}
          active={pathname === '/dashboard'}
          variant="light"
        />
        <NavLink
          component={Link}
          href="/flow"
          label="Classroom Mode (Flow)"
          leftSection={<Activity size={16} />}
          active={pathname === '/flow'}
          color="indigo"
          variant="light"
        />
        <NavLink
          component={Link}
          href="/students"
          label="Human Nodes (Students)"
          leftSection={<Users size={16} />}
          active={pathname.startsWith('/students')}
        />
        <NavLink
          component={Link}
          href="/finance"
          label="Ledger (Lucro Real)"
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
        
        <Text size="xs" fw={500} c="dimmed" mt="xl" mb="sm" tt="uppercase">
          System
        </Text>
        <NavLink
          component={Link}
          href="/network"
          label="Referral Tree"
          leftSection={<Network size={16} />}
          active={pathname === '/network'}
        />
        <NavLink
          component={Link}
          href="/settings"
          label="Configuration"
          leftSection={<Settings size={16} />}
          active={pathname === '/settings'}
        />
      </AppShell.Navbar>

      <AppShell.Main bg="gray.0">
        {children}
      </AppShell.Main>
    </AppShell>
  );
}