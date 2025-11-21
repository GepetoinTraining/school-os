import { Paper, Title, Text, TextInput, Button, Container, Group, ThemeIcon, Alert } from '@mantine/core';
import { BrainCircuit, Fingerprint } from 'lucide-react';
import { signIn } from '@/auth';
import { AuthError } from 'next-auth';
import { redirect } from 'next/navigation';

export default async function LoginPage({
  searchParams,
}: {
  searchParams: { error?: string };
}) {
  const error = searchParams.error;

  return (
    <Container size={420} my={40}>
      <Group justify="center" mb="xl">
        <ThemeIcon variant="light" size="xl" color="blue" radius="md">
           <BrainCircuit size={24} />
        </ThemeIcon>
        <Text fw={900} size="xl">SchoolOS</Text>
      </Group>

      <Paper withBorder shadow="md" p={30} mt={30} radius="md">
        <Title order={2} ta="center" mt="md" mb={50}>
          Identity Verification
        </Title>

        {error && (
             <Alert color="red" mb="lg" title="Access Denied">
                Identity node not found in the Metasystem.
             </Alert>
        )}

        <form
          action={async (formData) => {
            "use server";
            try {
              await signIn("credentials", formData);
            } catch (error) {
              if (error instanceof AuthError) {
                // FIX: Redirect instead of returning an object to satisfy the action type
                redirect(`/login?error=${error.type}`);
              }
              // Rethrow the success redirect or other errors so Next.js handles them
              throw error;
            }
          }}
        >
          <TextInput 
            label="Bio-ID (Email)" 
            name="email" 
            placeholder="alice@schoolos.local" 
            required 
            leftSection={<Fingerprint size={16} />}
          />
          
          <Button fullWidth mt="xl" type="submit">
            Connect to Metasystem
          </Button>
        </form>
      </Paper>
      
      <Text c="dimmed" size="xs" ta="center" mt="xl">
        Restricted Area. Authorized Nodes Only. <br />
        Balneário Camboriú Instance.
      </Text>
    </Container>
  );
}