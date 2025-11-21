'use client';

import { Container, Group, Button, Text, Burger, Drawer, Stack, ThemeIcon, Anchor, Box } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { BrainCircuit, Map, GraduationCap, Sparkles } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const links = [
  { link: '/courses', label: 'Courses' },
  { link: '/live-map', label: 'Live Pulse' },
  { link: '/enroll', label: 'Admissions' },
];

export function PublicHeader() {
  const [opened, { toggle, close }] = useDisclosure(false);
  const pathname = usePathname();

  return (
    <header style={{ height: 60, borderBottom: '1px solid #e9ecef', backgroundColor: 'white', position: 'sticky', top: 0, zIndex: 100 }}>
      <Container size="xl" h="100%">
        <Group justify="space-between" h="100%">
          
          {/* Logo Area */}
          <Link href="/" style={{ textDecoration: 'none', color: 'inherit' }}>
            <Group gap="xs">
              <ThemeIcon variant="light" size="lg" color="blue" radius="md">
                <BrainCircuit size={20} />
              </ThemeIcon>
              <Box visibleFrom="xs">
                <Text fw={700} size="lg" style={{ letterSpacing: '-0.5px', lineHeight: 1 }}>
                    SchoolOS
                </Text>
                <Text size="xs" c="dimmed" style={{ lineHeight: 1 }}>
                    Balneário Camboriú
                </Text>
              </Box>
            </Group>
          </Link>

          {/* Desktop Nav */}
          <Group gap="xl" visibleFrom="sm">
            {links.map((link) => (
              <Anchor
                key={link.link}
                component={Link}
                href={link.link}
                fw={500}
                c={pathname === link.link ? 'blue' : 'dimmed'}
                size="sm"
                underline="never"
                style={{ transition: 'color 0.2s' }}
              >
                {link.label}
              </Anchor>
            ))}
            <Button component={Link} href="/login" variant="default" radius="xl">
              Student Portal
            </Button>
            <Button component={Link} href="/enroll" variant="filled" color="blue" radius="xl">
              Apply Now
            </Button>
          </Group>

          {/* Mobile Burger */}
          <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" />
        </Group>
      </Container>

      {/* Mobile Drawer */}
      <Drawer opened={opened} onClose={close} size="100%" padding="md" title="Menu" hiddenFrom="sm" zIndex={1000}>
        <Stack gap="md">
          {links.map((link) => (
            <Button 
                key={link.link} 
                component={Link} 
                href={link.link} 
                variant="subtle" 
                fullWidth 
                onClick={close}
                justify="flex-start"
                size="lg"
            >
              {link.label}
            </Button>
          ))}
          <Button component={Link} href="/login" variant="outline" fullWidth size="lg">
            Student Portal
          </Button>
          <Button component={Link} href="/enroll" fullWidth size="lg">
            Apply Now
          </Button>
        </Stack>
      </Drawer>
    </header>
  );
}