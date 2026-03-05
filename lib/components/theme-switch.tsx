'use client'

import cn from 'clsx'
import { useTheme } from 'next-themes'
import { Select } from 'nextra/components'
import { useMounted } from 'nextra/hooks'
import { MoonIcon, SunIcon } from 'nextra/icons'
import type { FC } from 'react'
import { useThemeConfig } from '../stores'

type ThemeSwitchProps = {
  lite?: boolean
  className?: string
}

export const ThemeSwitch: FC<ThemeSwitchProps> = ({ lite, className }) => {
  const { setTheme, resolvedTheme, theme } = useTheme()
  const mounted = useMounted()
  const { darkMode, themeSwitch } = useThemeConfig()
  if (!darkMode) {
    return null
  }
  const ts = themeSwitch ?? { light: 'Light', dark: 'Dark', system: 'System' }
  const IconToUse = mounted && resolvedTheme === 'dark' ? MoonIcon : SunIcon
  const id = mounted ? (theme as keyof typeof ts) : 'light'
  return (
    <Select
      className={cn('x:flex x:items-center x:gap-2', className)}
      title="Change theme"
      options={[
        { id: 'light', name: ts.light },
        { id: 'dark', name: ts.dark },
        { id: 'system', name: ts.system }
      ]}
      onChange={setTheme}
      value={id}
      selectedOption={
        <>
          <IconToUse height="12" />
          {!lite && ts[id]}
        </>
      }
    />
  )
}
