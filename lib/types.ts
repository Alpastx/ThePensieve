import type { ReactElement, ReactNode } from 'react'

// ThemeConfigProps: layout props minus layout-specific ones
// Defined here to avoid circular imports (schemas -> LastUpdated -> theme-config -> schemas)
export interface ThemeConfigProps {
  copyPageButton?: boolean
  darkMode?: boolean
  docsRepositoryBase?: string
  editLink?: ReactNode
  feedback?: { content?: ReactNode; labels?: string; link?: string }
  i18n?: { locale: string; name: string }[]
  lastUpdated?: ReactElement
  navigation?: boolean | { next: boolean; prev: boolean }
  search?: ReactNode
  sidebar?: {
    autoCollapse?: boolean
    defaultMenuCollapseLevel?: number
    defaultOpen?: boolean
    toggleButton?: boolean
  }
  themeSwitch?: { dark?: string; light?: string; system?: string }
  toc?: {
    backToTop?: ReactNode
    extraContent?: ReactNode
    float?: boolean
    title?: ReactNode
  }
}
