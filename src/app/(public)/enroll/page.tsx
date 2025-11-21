'use client';

import { Container, Title, Text, SimpleGrid, TextInput, Textarea, Button, Paper, List, ThemeIcon } from '@mantine/core';
import { Check, Send } from 'lucide-react';

export default function EnrollPage() {
  return (
    <Container size="xl" py={60}>
      <SimpleGrid cols={{ base: 1, md: 2 }} spacing={80}>
        
        {/* Left: The Pitch */}
        <div>
            <Title order={1} mb="md">Join the Metasystem</Title>
            <Text size="lg" c="dimmed" mb="xl">
                We are accepting new nodes for the 2026 Cycle. Secure your biological anchor today.
            </Text>

            <Title order={4} mb="md">Why enroll with us?</Title>
            <List
                spacing="md"
                size="sm"
                center
                icon={
                    <ThemeIcon color="green" size={20} radius="xl">
                    <Check size={12} />
                    </ThemeIcon>
                }
            >
                <List.Item>Personalized AI Shard for every student</List.Item>
                <List.Item>Real-time Flow State monitoring</List.Item>
                <List.Item>Lucro Real financial transparency</List.Item>
                <List.Item>Global referral network access</List.Item>
            </List>
        </div>

        {/* Right: The Capture Form */}
        <Paper withBorder shadow="md" p="xl" radius="md">
            <Title order={3} mb="lg">Begin Enrollment</Title>
            <form onSubmit={(e) => e.preventDefault()}>
                <SimpleGrid cols={2} mb="md">
                    <TextInput label="First Name" placeholder="Student" required />
                    <TextInput label="Last Name" placeholder="Name" required />
                </SimpleGrid>
                <TextInput label="Email Address" placeholder="you@email.com" mb="md" required />
                <TextInput label="Phone (WhatsApp)" placeholder="+55 47 ..." mb="md" />
                
                <Textarea 
                    label="Interest" 
                    placeholder="Tell us about the student..." 
                    minRows={3} 
                    mb="xl" 
                />

                <Button fullWidth size="lg" color="blue" rightSection={<Send size={18} />}>
                    Submit Application
                </Button>
                <Text size="xs" c="dimmed" ta="center" mt="sm">
                    No credit card required for initial application.
                </Text>
            </form>
        </Paper>

      </SimpleGrid>
    </Container>
  );
}