'use no memo'

export function gitUrlParse(url: string): {
  href: string
  origin: string
  owner: string
  name: string
} {
  const { href, origin, pathname } = new URL(url)

  const [, owner, name] = pathname.split('/', 3)
  return {
    href,
    origin,
    owner,
    name
  }
}
