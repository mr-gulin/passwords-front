import './globals.scss';

import { Metadata } from 'next';
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
        <html lang='en'>
            <body>{children}</body>
        </html>
    );
}
