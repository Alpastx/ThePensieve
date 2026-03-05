import cn from 'clsx'
import type { FC, ReactNode } from 'react'
import { H1 } from '../../mdx-components/heading'
import { NotFoundLink } from './index.client'

type NotFoundPageProps = {
  content?: ReactNode
  labels?: string
  children?: ReactNode
  className?: string
}

const defaultChildren = <H1>404: Page Not Found</H1>

export const NotFoundPage: FC<NotFoundPageProps> = ({
  content = 'Submit an issue about broken link',
  labels = 'bug',
  children = defaultChildren,
  className
}) => {
  return (
    <div
      className={cn(
        'x:flex x:flex-col x:justify-center x:items-center x:h-[calc(100dvh-var(--nextra-navbar-height))]',
        className
      )}
    >
      {children}
      <NotFoundLink labels={labels}>{content}</NotFoundLink>
    </div>
  )
}
