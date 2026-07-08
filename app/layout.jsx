import { Layout, Navbar } from '../lib'
import { Head } from 'nextra/components'
import { getPageMap } from 'nextra/page-map'
import { Instrument_Serif, Space_Grotesk } from 'next/font/google'
import Script from 'next/script'
import 'nextra-theme-docs/style.css'
import './globals.css'
import { Analytics } from '@vercel/analytics/next'

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

/** Set in `.env` as NEXT_PUBLIC_GA_MEASUREMENT_ID (e.g. G-XXXXXXXXXX) */
const gaMeasurementId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID

/** Microsoft Clarity — override with NEXT_PUBLIC_CLARITY_PROJECT_ID */
const clarityProjectId =
  process.env.NEXT_PUBLIC_CLARITY_PROJECT_ID

export const metadata = {
  title: { default: 'The Pensieve', template: '%s | The Pensieve' },
  description: 'Security & pentesting reference cheatsheets, methodology a personal cookbook.',
  metadataBase: new URL(siteUrl),
  applicationName: 'The Pensieve',
  authors: [{ name: 'Alpesh Bhagwatkar', url: 'https://github.com/Alpastx' }],
  creator: 'Alpesh Bhagwatkar',
  publisher: 'The Pensieve',
  keywords: [
    'pentesting',
    'penetration testing',
    'red teaming',
    'cybersecurity',
    'cheatsheets',
    'security methodology',
    'CTF',
    'privilege escalation',
    'web attacks',
    'OSCP',
    'HackTheBox',
    'TryHackMe',
  ],
  category: 'technology',
  icons: { icon: '/sword.png' },
  alternates: {
    canonical: siteUrl,
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: siteUrl,
    siteName: 'The Pensieve',
    title: 'The Pensieve',
    description: 'Security & pentesting reference cheatsheets, methodology a personal cookbook.',
    images: [
      {
        url: '/imgs/homepage.jpg',
        width: 1672,
        height: 941,
        alt: 'The Pensieve : A personal cookbook for security & pentesting reference cheatsheets, methodology.',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'The Pensieve',
    description: 'Security & pentesting reference cheatsheets, methodology a personal cookbook.',
    creator: '@Alpastx',
    images: ['/imgs/homepage.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
}

const navbar = (
  <Navbar
    logo={
      <span className="pensieve-navbar-logo">
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
        <a key="Instagram" href="https://www.instagram.com/alpastx/" target="_blank" rel="noopener noreferrer">
          Instagram
        </a>
      </span>
    </div>
  </footer>
)

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebSite',
      '@id': `${siteUrl}/#website`,
      url: siteUrl,
      name: 'The Pensieve',
      description:
        'Security & pentesting reference cheatsheets, methodology a personal cookbook.',
      inLanguage: 'en',
      publisher: { '@id': `${siteUrl}/#person` },
      potentialAction: {
        '@type': 'SearchAction',
        target: {
          '@type': 'EntryPoint',
          urlTemplate: `${siteUrl}/?q={search_term_string}`,
        },
        'query-input': 'required name=search_term_string',
      },
    },
    {
      '@type': 'Person',
      '@id': `${siteUrl}/#person`,
      name: 'Alpesh Bhagwatkar',
      url: siteUrl,
      sameAs: [
        'https://github.com/Alpastx',
        'https://x.com/Alpastx',
        'https://www.linkedin.com/in/alpesh-bhagwatkar/',
      ],
    },
  ],
}

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
        <Script
          id="ld-json"
          type="application/ld+json"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {gaMeasurementId ? (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${gaMeasurementId}`}
              strategy="afterInteractive"
            />
            <Script id="google-analytics" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${gaMeasurementId}');
              `}
            </Script>
          </>
        ) : null}
        {clarityProjectId ? (
          <Script id="microsoft-clarity" strategy="afterInteractive">
            {`
              (function(c,l,a,r,i,t,y){
                c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
                t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
                y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
              })(window, document, "clarity", "script", "${clarityProjectId}");
            `}
          </Script>
        ) : null}
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
