import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs))
}

export function formatDate(date: Date) {
    return Intl.DateTimeFormat('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    }).format(date)
}


// Define the SiteConfig type above its usage
type SiteConfig = {
    author: string;
    title: string;
    description: string;
    lang: string;
    ogLocale: string;
    date: {
        locale: string;
        options: {
            day: string;
            month: string;
            year: string;
        };
    };
};

export const siteConfig: SiteConfig = {
    // Used as both a meta property (src/components/BaseHead.astro L:31 + L:49) & the generated satori png (src/pages/og-image/[slug].png.ts)
    author: 'jbarrios',
    // Meta property used to construct the meta title property, found in src/components/BaseHead.astro L:11
    title: 'portfolio',
    // Meta property used as the default description meta property
    description: 'Resume Jose Barrios',
    // HTML lang property, found in src/layouts/Base.astro L:18
    lang: 'en_US',
    // Meta property, found in src/components/BaseHead.astro L:42
    ogLocale: 'en_US',
    // Date.prototype.toLocaleDateString() parameters, found in src/utils/date.ts.
    date: {
        locale: 'es-CO',
        options: {
            day: 'numeric',
            month: 'short',
            year: 'numeric'
        }
    }
}

export const menuLinks: Array<{ title: string; path: string }> = [
    {
        title: 'Home',
        path: '/'
    },
]

