import { MetadataRoute } from 'next'
import { SERVICES_DATA } from '@/lib/services-data'

export default function sitemap(): MetadataRoute.Sitemap {
    const baseUrl = 'https://alfred.co' // Assuming the production domain

    const coreRoutes = [
        '',
        '/alianzas',
        '/careers',
        '/roi-calculator',
        '/talleres',
        '/terminos',
    ].map((route) => ({
        url: `${baseUrl}${route}`,
        lastModified: new Date(),
        changeFrequency: 'weekly' as const,
        priority: route === '' ? 1 : 0.8,
    }))

    const serviceRoutes = Object.keys(SERVICES_DATA).map((slug) => ({
        url: `${baseUrl}/servicios/${slug}`,
        lastModified: new Date(),
        changeFrequency: 'monthly' as const,
        priority: 0.7,
    }))

    return [...coreRoutes, ...serviceRoutes]
}
