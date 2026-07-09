'use client'

import { usePathname } from 'next/navigation'
import type { ComponentProps, FC } from 'react'
import { useEffect, useRef, useState } from 'react'

/**
 * Interactive replacement for the `<input>` that remark-gfm emits for task
 * lists. By default those checkboxes are rendered `disabled`; here we strip
 * that, let the user toggle them, and persist the state per page in
 * localStorage so ticks survive reloads and navigation.
 */
export const Checkbox: FC<ComponentProps<'input'>> = ({
  type,
  checked,
  defaultChecked,
  disabled,
  onChange,
  ...props
}) => {
  // Only task-list checkboxes get the interactive treatment.
  if (type !== 'checkbox') {
    return (
      <input
        type={type}
        disabled={disabled}
        defaultChecked={defaultChecked}
        {...props}
      />
    )
  }

  const pathname = usePathname()
  const ref = useRef<HTMLInputElement>(null)
  const storageKey = useRef<string | null>(null)
  const [isChecked, setIsChecked] = useState(
    Boolean(checked ?? defaultChecked)
  )

  useEffect(() => {
    const el = ref.current
    if (!el) return

    // Derive a stable key from the checkbox position within the article so the
    // same task keeps its state across reloads.
    const all = Array.from(
      document.querySelectorAll<HTMLInputElement>(
        'article input[type="checkbox"]'
      )
    )
    const index = all.indexOf(el)
    const key = `pensieve:tasks:${pathname}:${index}`
    storageKey.current = key

    try {
      const saved = localStorage.getItem(key)
      if (saved !== null) {
        setIsChecked(saved === '1')
      }
    } catch {
      // localStorage may be unavailable (private mode, etc.) — ignore.
    }
  }, [pathname])

  return (
    <input
      ref={ref}
      type="checkbox"
      checked={isChecked}
      onChange={event => {
        const next = event.target.checked
        setIsChecked(next)
        if (storageKey.current) {
          try {
            localStorage.setItem(storageKey.current, next ? '1' : '0')
          } catch {
            // ignore write failures
          }
        }
        onChange?.(event)
      }}
      {...props}
    />
  )
}
