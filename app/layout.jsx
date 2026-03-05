import { Layout, Navbar, Footer } from '../lib'
import { Head } from 'nextra/components'
import { getPageMap } from 'nextra/page-map'
import 'nextra-theme-docs/style.css'

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://thepensieve.vercel.app'

export const metadata = {
  title: { default: 'The Pensieve', template: '%s | The Pensieve' },
  description: 'Security & pentesting reference — cheatsheets, methodology, and tools.',
  metadataBase: new URL(siteUrl),
  icons: { icon: '/favicon.png' },
  openGraph: {
    type: 'website',
    locale: 'en_US',
  },
  robots: {
    index: true,
    follow: true,
  },
}

const navbar = (
  <Navbar
    logo={<b>The Pensieve</b>}
    projectLink="https://github.com/Alpastx/ThePensieve"
  />
)
const footer = <Footer>MIT {new Date().getFullYear()} © The Pensieve.</Footer>

export default async function RootLayout({ children }) {
  const docsRepo = process.env.NEXT_PUBLIC_DOCS_REPO || 'https://github.com/Alpastx/ThePensieve'

  return (
    <html
      lang="en"
      dir="ltr"
      className="dark"
      suppressHydrationWarning
    >
      <Head />
      <body>
        <Layout
          navbar={navbar}
          pageMap={await getPageMap()}
          docsRepositoryBase={docsRepo}
          footer={footer}
          darkMode={false}
          nextThemes={{ forcedTheme: 'dark' }}
        >
          {children}
        </Layout>
      </body>
    </html>
  )
}
