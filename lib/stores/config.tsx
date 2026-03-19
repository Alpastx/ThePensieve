'use client'

import type { PageMapItem } from 'nextra'
import { useFSRoute } from 'nextra/hooks'
import { normalizePages } from 'nextra/normalize-pages'
import type { FC, ReactNode } from 'react'
import { createContext, useContext, Fragment } from 'react'

type NormalizePagesResult = ReturnType<typeof normalizePages>

const ConfigContext = createContext<NormalizePagesResult | null>(null)

export function useConfig(): {
  normalizePagesResult: NormalizePagesResult
  hideSidebar: boolean
} {
  const normalizePagesResult = useContext(ConfigContext)
  if (!normalizePagesResult) {
    throw new Error('Missing ConfigContext.Provider')
  }
  const { activeThemeContext, activeType } = normalizePagesResult
  return {
    normalizePagesResult,
    hideSidebar: !activeThemeContext.sidebar || activeType === 'page'
  }
}

export const ConfigProvider: FC<{
  children: ReactNode
  pageMap: PageMapItem[]
  navbar: ReactNode
  footer: ReactNode
}> = ({ children, pageMap, navbar, footer }) => {
  const pathname = useFSRoute()

  const normalizedPages = normalizePages({
    list: pageMap,
    route: pathname
  })
  const { activeThemeContext } = normalizedPages

  return (
    <ConfigContext.Provider value={normalizedPages}>
      <Fragment key="navbar">{activeThemeContext.navbar ? navbar : null}</Fragment>
      <Fragment key="content">{children}</Fragment>
      <Fragment key="footer">{activeThemeContext.footer ? footer : null}</Fragment>
    </ConfigContext.Provider>
  )
}
