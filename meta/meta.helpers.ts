import { Metadata } from 'next';

import { DEFAULT_META } from '@/meta/meta.constants';

const getBaseUrl = () => {
    const baseUrl = process.env.BASE_URL;

    if (!baseUrl) {
        return;
    }

    return new URL(baseUrl);
};

export const generateMeta = (): Metadata => {
    const baseUrl = getBaseUrl();

    return {
        ...DEFAULT_META,
        metadataBase: baseUrl,
        alternates: {
            canonical: baseUrl,
        },
        openGraph: {
            ...DEFAULT_META.openGraph,
            url: baseUrl,
        },
        other: {
            ...DEFAULT_META.other,
        },
    };
};
