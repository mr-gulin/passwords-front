import { Metadata } from 'next';

export const DEFAULT_TITLE = '@mr-gulin/nextjs';

/**
 * Icons are generated using https://favicomatic.com
 * with every size.
 * Location: `/public/meta`
 */
export const ICONS = [
    {
        rel: 'apple-touch-icon-precomposed',
        url: '/meta/apple-touch-icon-57x57.png',
        sizes: '57x57',
    },
    {
        rel: 'apple-touch-icon-precomposed',
        url: '/meta/apple-touch-icon-60x60.png',
        sizes: '60x60',
    },
    {
        rel: 'apple-touch-icon-precomposed',
        url: '/meta/apple-touch-icon-72x72.png',
        sizes: '72x72',
    },
    {
        rel: 'apple-touch-icon-precomposed',
        url: '/meta/apple-touch-icon-76x76.png',
        sizes: '76x76',
    },
    {
        rel: 'apple-touch-icon-precomposed',
        url: '/meta/apple-touch-icon-114x114.png',
        sizes: '114x114',
    },
    {
        rel: 'apple-touch-icon-precomposed',
        url: '/meta/apple-touch-icon-120x120.png',
        sizes: '120x120',
    },
    {
        rel: 'apple-touch-icon-precomposed',
        url: '/meta/apple-touch-icon-144x144.png',
        sizes: '144x144',
    },
    {
        rel: 'apple-touch-icon-precomposed',
        url: '/meta/apple-touch-icon-152x152.png',
        sizes: '152x152',
    },
    {
        rel: 'icon',
        type: 'image/x-icon',
        url: '/meta/favicon.ico',
    },
    {
        rel: 'icon',
        type: 'image/png',
        url: '/meta/favicon-16x16.png',
        sizes: '16x16',
    },
    {
        rel: 'icon',
        type: 'image/png',
        url: '/meta/favicon-32x32.png',
        sizes: '32x32',
    },
    {
        rel: 'icon',
        type: 'image/png',
        url: '/meta/favicon-96x96.png',
        sizes: '96x96',
    },
    {
        rel: 'icon',
        type: 'image/png',
        url: '/meta/favicon-128.png',
        sizes: '128x128',
    },
    {
        rel: 'icon',
        type: 'image/png',
        url: '/meta/favicon-196x196.png',
        sizes: '196x196',
    },
];

export const MS_ICONS = {
    'msapplication-TileColor': '#FFFFFF',
    'msapplication-TileImage': '/meta/mstile-144x144',
    'msapplication-square70x70logo': '/meta/mstile-70x70.png',
    'msapplication-square150x150logo': '/meta/mstile-150x150.png',
    'msapplication-square310x150logo': '/meta/mstile-310x150.png',
    'msapplication-square310x310logo': '/meta/mstile-310x310.png',
};

export const DEFAULT_META: Metadata = {
    title: DEFAULT_TITLE,
    openGraph: {
        title: DEFAULT_TITLE,
        images: '/meta/cover.png',
    },
    icons: ICONS,
    other: {
        ...MS_ICONS,
    },
};
