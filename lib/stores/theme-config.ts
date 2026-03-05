'use client'

import type { ComponentProps } from 'react'
import { createContext, createElement, useContext } from 'react'
import type { ThemeConfigProps } from '../types'

const ThemeConfigContext = createContext<ThemeConfigProps | null>(null!)

export const useThemeConfig = (): ThemeConfigProps => {
  const ctx = useContext(ThemeConfigContext)
  if (!ctx) throw new Error('Missing ThemeConfigProvider')
  return ctx
}

export const ThemeConfigProvider = (
  props: ComponentProps<typeof ThemeConfigContext.Provider>
) => createElement(ThemeConfigContext.Provider, props)
