'use client';

import { AppShell, Burger, Group, NavLink, Text, ThemeIcon } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { 
  LayoutDashboard, 
  Users, 
  Wallet, 
  BrainCircuit,
  Network,
  Settings
} from 'lucide-react';

export function SchoolOSShell({ children }: { children: React.ReactNode }) {
  const [opened, { toggle }] = useDisclosure();

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
            v0.1 (Alpha) | Balneário Camboriú
          </Text>
        </Group>
      </AppShell.Header>

      <AppShell.Navbar p="md">
        <Text size="xs" fw={500} c="dimmed" mb="sm" tt="uppercase">
          Metasystem
        </Text>
        <NavLink
          href="/"
          label="Cockpit"
          leftSection={<LayoutDashboard size={16} />}
          active
          variant="light"
        />
        <NavLink
          href="/students"
          label="Human Nodes (Students)"
          leftSection={<Users size={16} />}
        />
        <NavLink
          href="/finance"
          label="Ledger (Lucro Real)"
          leftSection={<Wallet size={16} />}
        />
        <NavLink
          href="/shards"
          label="Symbiosis Engine"
          leftSection={<BrainCircuit size={16} />}
        />
        
        <Text size="xs" fw={500} c="dimmed" mt="xl" mb="sm" tt="uppercase">
          System
        </Text>
        <NavLink
          href="/network"
          label="Referral Tree"
          leftSection={<Network size={16} />}
        />
        <NavLink
          href="/settings"
          label="Configuration"
          leftSection={<Settings size={16} />}
        />
      </AppShell.Navbar>

      <AppShell.Main bg="gray.0">
        {children}
      </AppShell.Main>
    </AppShell>
  );
}