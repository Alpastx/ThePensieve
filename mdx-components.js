import { useMDXComponents as getThemeComponents } from './lib/mdx-components'

export function useMDXComponents(components) {
  return {
    ...getThemeComponents(),
    ...components
  }
}
