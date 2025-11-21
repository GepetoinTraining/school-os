'use client';

import { Button, ButtonProps } from '@mantine/core';
import Link, { LinkProps } from 'next/link';
import React from 'react';

// Combine Mantine Button props with Next.js Link props
type LinkButtonProps = ButtonProps & LinkProps & { children: React.ReactNode };

export default function LinkButton(props: LinkButtonProps) {
  // We simply render the Mantine Button, but since we are on the Client,
  // passing 'component={Link}' is perfectly legal here.
  return <Button component={Link} {...props} />;
}