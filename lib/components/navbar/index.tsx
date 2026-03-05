import cn from 'clsx'
import NextLink from 'next/link'
import { Anchor } from 'nextra/components'
import { DiscordIcon, GitHubIcon } from 'nextra/icons'
import type { FC, ReactNode } from 'react'
import { ClientNavbar } from './index.client'

interface NavbarProps {
  children?: ReactNode
  logoLink?: string | boolean
  logo: ReactNode
  projectLink?: string
  projectIcon?: ReactNode
  chatLink?: string
  chatIcon?: ReactNode
  className?: string
  align?: 'left' | 'right'
}

const defaultGitHubIcon = (
  <GitHubIcon height="24" aria-label="Project repository" />
)
const defaultChatIcon = <DiscordIcon width="24" />

export const Navbar: FC<NavbarProps> = ({
  children,
  logoLink = true,
  logo,
  projectLink,
  projectIcon = defaultGitHubIcon,
  chatLink,
  chatIcon = defaultChatIcon,
  className,
  align = 'right'
}) => {
  const logoClass = cn(
    'x:flex x:items-center',
    align === 'left' ? 'x:max-md:me-auto' : 'x:me-auto'
  )
  return (
    <header
      className={cn(
        'nextra-navbar x:sticky x:top-0 x:z-30 x:w-full x:bg-transparent x:print:hidden',
        'x:max-md:[.nextra-banner:not([class$=hidden])~&]:top-(--nextra-banner-height)'
      )}
    >
      <div
        className={cn(
          'nextra-navbar-blur',
          'x:absolute x:-z-1 x:size-full',
          'nextra-border x:border-b',
          'x:backdrop-blur-md x:bg-nextra-bg/70'
        )}
      />
      <nav
        style={{ height: 'var(--nextra-navbar-height)' }}
        className={cn(
          'x:mx-auto x:flex x:max-w-(--nextra-content-width) x:items-center x:gap-4 x:pl-[max(env(safe-area-inset-left),1.5rem)] x:pr-[max(env(safe-area-inset-right),1.5rem)]',
          'x:justify-end',
          className
        )}
      >
        {logoLink ? (
          <NextLink
            href={typeof logoLink === 'string' ? logoLink : '/'}
            className={cn(
              logoClass,
              'x:transition-opacity x:focus-visible:nextra-focus x:hover:opacity-75'
            )}
            aria-label="Home page"
          >
            {logo}
          </NextLink>
        ) : (
          <div className={logoClass}>{logo}</div>
        )}
        <ClientNavbar className={align === 'left' ? 'x:me-auto' : ''}>
          {projectLink && <Anchor href={projectLink}>{projectIcon}</Anchor>}
          {chatLink && <Anchor href={chatLink}>{chatIcon}</Anchor>}
          {children}
        </ClientNavbar>
      </nav>
    </header>
  )
}
