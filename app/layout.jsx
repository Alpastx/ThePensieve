import { Layout, Navbar, Footer } from '../lib'
import { Head } from 'nextra/components'
import { getPageMap } from 'nextra/page-map'
import { Instrument_Serif, Space_Grotesk } from 'next/font/google'
import Image from 'next/image'
import 'nextra-theme-docs/style.css'
import './globals.css'
import { Analytics } from '@vercel/analytics/next';

const instrumentSerif = Instrument_Serif({
  subsets: ['latin'],
  weight: '400',
  variable: '--font-heading',
})

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  weight: '400',
  variable: '--font-body',
})

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://thepensieve.in'

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
    logo={
      <span className="pensieve-navbar-logo">
        <Image className="pensieve-navbar-logo-img" src="/favicon.png" alt="The Pensieve" width={28} height={28} />
        <span>The Pensieve</span>
      </span>
    }
    projectLink="https://github.com/Alpastx/ThePensieve"
  />
)
const footer = (
  <footer className="pensieve-footer">
    <div className="pensieve-footer-inner">
      <span className="pensieve-footer-copy">
        © {new Date().getFullYear()} The Pensieve. All rights reserved.
      </span>
      <span className="pensieve-footer-links">
        <a key="github" href="https://github.com/Alpastx/ThePensieve" target="_blank" rel="noopener noreferrer">
          GitHub
        </a>
        <a key="twitter" href="https://x.com/Alpastx" target="_blank" rel="noopener noreferrer">
          Twitter
        </a>
        <a key="linkedin" href="https://www.linkedin.com/in/alpesh-bhagwatkar/" target="_blank" rel="noopener noreferrer">
          LinkedIn
        </a>
      </span>
    </div>
  </footer>
)

export default async function RootLayout({ children }) {
  const docsRepo = process.env.NEXT_PUBLIC_DOCS_REPO || 'https://github.com/Alpastx/ThePensieve'

  return (
    <html
      lang="en"
      dir="ltr"
      className={`dark ${instrumentSerif.variable} ${spaceGrotesk.variable}`}
      suppressHydrationWarning
    >
      <Head />
      <body>
        <Analytics />
        <Layout
          navbar={navbar}
          pageMap={await getPageMap()}
          docsRepositoryBase={docsRepo}
          footer={footer}
          darkMode={true}
          nextThemes={{ defaultTheme: 'dark', forcedTheme: 'dark' }}
          editLink={null}
          feedback={{ content: null }}
        >
          {children}
        </Layout>
      </body>
    </html>
  )
}
