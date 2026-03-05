import type { PageMapItem } from 'nextra'
import { Search } from 'nextra/components'
import { element, reactNode } from 'nextra/schemas'
import { Fragment } from 'react'
import { z } from 'zod'
import { LastUpdated } from './components/last-updated'

const attributeSchema = z
  .custom<'class' | `data-${string}`>(
    value => value === 'class' || (value as string).startsWith('data-')
  )
  .meta({ type: "'class' | `data-${string}`" })

const feedbackSchema = z.strictObject({
  content: reactNode.default('Question? Give us feedback').meta({
    description: 'Content of the feedback link.'
  }),
  labels: z.string().default('feedback').meta({
    description: 'Labels that can be added to the new created issue.'
  }),
  link: z
    .string()
    .optional()
    .meta({
      description: `Feedback link URL. By default, it's a link to the issue creation form of the docs repository.`
    })
})

const nextThemesSchema = z.strictObject({
  attribute: z
    .union([attributeSchema, z.array(attributeSchema)])
    .default('class'),
  defaultTheme: z.string().default('system'),
  disableTransitionOnChange: z.boolean().default(true),
  forcedTheme: z.string().optional(),
  storageKey: z.string().default('theme')
})

const sidebarSchema = z.strictObject({
  autoCollapse: z.boolean().optional().meta({
    description:
      'If `true`, automatically collapse inactive folders above `defaultMenuCollapseLevel`.'
  }),
  defaultMenuCollapseLevel: z.number().int().min(1).default(2).meta({
    description:
      'Specifies the folder level at which the menu on the left is collapsed by default.'
  }),
  defaultOpen: z.boolean().default(true).meta({
    description: 'Hide/show sidebar by default.'
  }),
  toggleButton: z.boolean().default(true).meta({
    description: 'Hide/show sidebar toggle button.'
  })
})

const themeSwitchSchema = z.strictObject({
  dark: z.string().default('Dark'),
  light: z.string().default('Light'),
  system: z.string().default('System')
})

const tocSchema = z.strictObject({
  backToTop: reactNode.default('Scroll to top').meta({
    description: 'Text of back to top button.'
  }),
  extraContent: reactNode.optional().meta({
    description: 'Display extra content below the TOC content.'
  }),
  float: z.boolean().default(true).meta({
    description: 'Float the TOC next to the content.'
  }),
  title: reactNode.default('On This Page').meta({
    description: 'Title of the TOC sidebar.'
  })
})

export const LayoutPropsSchema = z.strictObject({
  banner: reactNode.optional().meta({
    description: 'Rendered Banner component.'
  }),
  children: reactNode,
  copyPageButton: z.boolean().default(true).meta({
    description: 'Hide/show copy page content button.'
  }),
  darkMode: z.boolean().default(true).meta({
    description: 'Show or hide the dark mode select button.'
  }),
  docsRepositoryBase: z
    .string()
    .startsWith('https://')
    .default('https://github.com/shuding/nextra')
    .meta({
      description: 'URL of the documentation repository.'
    }),
  editLink: reactNode.default('Edit this page').meta({
    description: 'Content of the edit link.'
  }),
  feedback: feedbackSchema.default(feedbackSchema.parse({})),
  footer: reactNode.optional().meta({
    description: 'Rendered Footer component.'
  }),
  i18n: z
    .array(
      z.strictObject({
        locale: z.string().meta({
          description: 'Locale from i18n.locales field in next.config.'
        }),
        name: z.string().meta({
          description: 'Locale name in dropdown.'
        })
      })
    )
    .default([])
    .meta({
      description: 'Options to configure the language dropdown for i18n.'
    }),
  lastUpdated: element
    .default(() => <LastUpdated />)
    .refine(el => el.type !== Fragment && typeof el.type !== 'string', {
      message:
        'Layout#lastUpdated must be a <LastUpdated /> component. Import { Layout, LastUpdated } from your lib.'
    }),
  navbar: reactNode.optional().meta({
    description: 'Rendered Navbar component.'
  }),
  navigation: z
    .union([
      z.boolean(),
      z.strictObject({
        next: z.boolean(),
        prev: z.boolean()
      })
    ])
    .default(true)
    .transform(v => (typeof v === 'boolean' ? { next: v, prev: v } : v))
    .meta({
      description: 'Enable or disable navigation link.'
    }),
  nextThemes: nextThemesSchema.default(nextThemesSchema.parse({})).meta({
    description: 'Configuration for next-themes ThemeProvider.'
  }),
  pageMap: z
    .array(z.custom<PageMapItem>())
    .meta({
      description: "Page map list. Result of getPageMap(route = '/') call."
    }),
  search: reactNode.default(() => <Search />).meta({
    description: 'Rendered Search component.'
  }),
  sidebar: sidebarSchema.default(sidebarSchema.parse({})),
  themeSwitch: themeSwitchSchema.default(themeSwitchSchema.parse({})).meta({
    description: 'Translation of options in the theme switch.'
  }),
  toc: tocSchema.default(tocSchema.parse({}))
})
