import { Center, Loader, Stack, Text, Skeleton, Paper } from '@mantine/core';

export default function DashboardLoading() {
  return (
    <div style={{ padding: '2rem', height: '100%', minHeight: '80vh' }}>
      {/* 1. The Mock Header */}
      <div style={{ marginBottom: '2rem' }}>
         <Skeleton height={40} width={300} mb="xs" radius="md" />
         <Skeleton height={20} width={150} radius="md" />
      </div>

      {/* 2. The Mock Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
        {[1, 2, 3].map((i) => (
          <Paper key={i} withBorder p="lg" radius="md">
             <Stack>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Skeleton height={20} width={100} radius="xl" />
                    <Skeleton height={24} width={24} circle />
                </div>
                <Skeleton height={50} width={120} mt="md" radius="md" />
                <Skeleton height={16} width={80} radius="md" />
             </Stack>
          </Paper>
        ))}
      </div>
      
      <Center mt={60}>
        <Loader color="gray" type="dots" />
      </Center>
    </div>
  );
}