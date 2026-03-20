import cn from 'clsx'
import type { CSSProperties, FC, HTMLAttributes, ReactNode } from 'react'

export type TagPillProps = {
  children?: ReactNode
  /** Accent color (hex or CSS color). Defaults to site purple. */
  color?: string
} & HTMLAttributes<HTMLSpanElement>

const DEFAULT_COLOR = '#a855f7'

export const TagPill: FC<TagPillProps> = ({
  children,
  color = DEFAULT_COLOR,
  className,
  style,
  ...rest
}) => (
  <span
    className={cn('pensieve-tag-pill', className)}
    style={
      {
        '--pensieve-tag-pill-color': color,
        ...style
      } as CSSProperties
    }
    {...rest}
  >
    {children}
  </span>
)
