
import { MetadataRoute } from 'next'
import { getNews } from '@/actions/news'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const baseUrl = 'https://judoklubzeljeznicar.ba'

    const staticPages = [
        { route: '/', priority: 1.0, changeFrequency: 'weekly' as const },
        { route: '/klub', priority: 0.8, changeFrequency: 'monthly' as const },
        { route: '/klub/dojo', priority: 0.6, changeFrequency: 'monthly' as const },
        { route: '/klub/sponzori', priority: 0.5, changeFrequency: 'monthly' as const },
        { route: '/historija', priority: 0.7, changeFrequency: 'yearly' as const },
        { route: '/novosti', priority: 0.8, changeFrequency: 'daily' as const },
        { route: '/novosti/galerije', priority: 0.6, changeFrequency: 'weekly' as const },
        { route: '/kalendar', priority: 0.7, changeFrequency: 'weekly' as const },
        { route: '/kontakt', priority: 0.8, changeFrequency: 'monthly' as const },
        { route: '/takmicari', priority: 0.7, changeFrequency: 'monthly' as const },
        { route: '/treneri', priority: 0.7, changeFrequency: 'monthly' as const },
    ]

    const allNews = await getNews()
    const newsPages = allNews.map(article => ({
        route: `/novosti/${article.id}`,
        priority: 0.6,
        changeFrequency: 'monthly' as const,
        lastModified: new Date(article.date),
    }))

    // Static pages (use current date for lastmod)
    const entries: MetadataRoute.Sitemap = staticPages.map(page => ({
        url: `${baseUrl}${page.route}`,
        lastModified: new Date(),
        changeFrequency: page.changeFrequency,
        priority: page.priority,
    }))

    // Dynamic news entries
    const newsEntries = newsPages.map(entry => ({
        url: `${baseUrl}${entry.route}`,
        lastModified: entry.lastModified,
        changeFrequency: 'monthly' as const,
        priority: entry.priority,
    }))

    const galleryEntries = allNews
        .filter(n => (n as any).images && (n as any).images.length > 0)
        .map(article => ({
            url: `${baseUrl}/novosti/${article.id}/galerija`,
            lastModified: new Date(article.date),
            changeFrequency: 'monthly' as const,
            priority: 0.4,
        }))

    return [...entries, ...newsEntries]
}
