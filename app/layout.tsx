import './globals.scss';

import { Metadata } from 'next';
import { PublicEnvScript } from 'next-runtime-env';
import React from 'react';

import { generateMeta } from '@/meta/meta.helpers';

export function generateMetadata(): Metadata {
    return generateMeta();
}

export default function RootLayout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
        <head>
            <PublicEnvScript />
        </head>
        <body>{children}</body>
        </html>
    );
}
