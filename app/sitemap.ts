import type { MetadataRoute } from 'next'
import { getPageMap } from 'nextra/page-map'

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://thepensieve.in'

type PageMapNode = {
  name?: string
  route?: string
  children?: PageMapNode[]
  frontMatter?: Record<string, unknown>
  data?: unknown
}

/** Walk the Nextra page map and collect every real content route. */
function collectRoutes(nodes: PageMapNode[], acc = new Set<string>()): Set<string> {
  for (const node of nodes) {
    if (node.children) {
      collectRoutes(node.children, acc)
      continue
    }
    // Skip `_meta` files (they carry `data`, not a page) and anchor links.
    if (node.data || !node.route || node.route.includes('#')) continue
    // Allow authors to hide WIP pages from search engines via frontmatter.
    const fm = node.frontMatter ?? {}
    if (fm.draft === true || fm.searchable === false || fm.sitemap === false) continue
    acc.add(node.route)
  }
  return acc
}

/** Deeper pages are slightly less important; the homepage stays at 1. */
function priorityFor(route: string): number {
  if (route === '/') return 1
  const depth = route.split('/').filter(Boolean).length
  return Math.max(0.5, 1 - depth * 0.1)
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const pageMap = (await getPageMap()) as PageMapNode[]
  const routes = collectRoutes(pageMap)
  const now = new Date()

  return [...routes]
    .sort()
    .map((route) => ({
      url: route === '/' ? baseUrl : `${baseUrl}${route}`,
      lastModified: now,
      changeFrequency: route === '/' ? 'weekly' : 'monthly',
      priority: priorityFor(route),
    }))
}
