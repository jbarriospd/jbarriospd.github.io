export type Site = {
    TITLE: string
    DESCRIPTION: string
    EMAIL: string
    NUM_POSTS_ON_HOMEPAGE: number
    POSTS_PER_PAGE: number
    SITEURL: string
}

export type Link = {
    href: string
    label: string
}

export const SITE: Site = {
    TITLE: 'Jose Barrios',
    DESCRIPTION:
        'My porfolio and experience',
    EMAIL: 'duck.jop@gmail.com',
    NUM_POSTS_ON_HOMEPAGE: 2,
    POSTS_PER_PAGE: 3,
    SITEURL: 'https://jbarriospd.github.io/',
}

export const NAV_LINKS: Link[] = [
    { href: '/blog', label: 'blog' },
    { href: '/authors', label: 'authors' },
    { href: '/about', label: 'about' },
    { href: '/tags', label: 'tags' },
]

export const SOCIAL_LINKS: Link[] = [
    { href: 'https://github.com/jbarriospd', label: 'GitHub' },
    { href: 'duck.jop@gmail.com', label: 'Email' },
]