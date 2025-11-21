'use client';

import { useState } from 'react';
import { Button, Group, Text, Paper, Code, ScrollArea, Alert, Stack } from '@mantine/core';
import { Upload, FileSpreadsheet, AlertCircle, CheckCircle2 } from 'lucide-react';
import { ingestStudents } from '@/app/actions/ingest';

export function CsvImporter() {
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [result, setResult] = useState<any>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
      setResult(null);
    }
  };

  const handleUpload = async () => {
    if (!file) return;
    setUploading(true);
    
    const formData = new FormData();
    formData.append('file', file);

    try {
      const res = await ingestStudents(formData);
      setResult(res);
    } catch (error) {
      setResult({ success: false, message: 'Network or Server Error' });
    } finally {
      setUploading(false);
    }
  };

  return (
    <Stack>
      <Group align="flex-end">
        <Button 
          component="label" 
          leftSection={<FileSpreadsheet size={16} />}
          variant="outline"
          color="gray"
          loading={uploading}
        >
            Select Legacy CSV
            <input type="file" accept=".csv" hidden onChange={handleFileChange} />
        </Button>

        {file && (
           <Button onClick={handleUpload} color="blue" loading={uploading} leftSection={<Upload size={16} />}>
             Start Migration
           </Button>
        )}
      </Group>

      {file && <Text size="sm">Selected: <Code>{file.name}</Code></Text>}

      {result && (
        <Alert 
          color={result.success ? 'green' : 'red'} 
          title={result.success ? 'Migration Complete' : 'Migration Failed'}
          icon={result.success ? <CheckCircle2 size={16} /> : <AlertCircle size={16} />}
          mt="sm"
        >
          {result.message}
          {result.errors && result.errors.length > 0 && (
            <ScrollArea h={100} mt="xs" type="always" offsetScrollbars>
                <Stack gap="xs">
                    {result.errors.map((err: string, i: number) => (
                        <Text key={i} size="xs" c="red">{err}</Text>
                    ))}
                </Stack>
            </ScrollArea>
          )}
        </Alert>
      )}
    </Stack>
  );
}