import type { CSSProperties, FC } from 'react'

export type ModuleGroupProps = {
  title: string
  color: string
  badge: string
  modules: string[]
}

export const ModuleGroup: FC<ModuleGroupProps> = ({
  title,
  color,
  badge,
  modules
}) => (
  <div
    style={{
      border: `1px solid ${color}30`,
      borderRadius: '12px',
      overflow: 'hidden',
      margin: '1rem 0'
    }}
  >
    <div
      style={{
        background: color + '12',
        padding: '0.75rem 1.25rem',
        display: 'flex',
        alignItems: 'center',
        gap: '0.75rem',
        borderBottom: `1px solid ${color}20`
      }}
    >
      <span style={{ fontWeight: '700', fontSize: '0.88rem' }}>{title}</span>
      <span
        style={{
          fontSize: '0.65rem',
          fontWeight: '600',
          background: color + '25',
          color,
          padding: '0.15rem 0.5rem',
          borderRadius: '999px',
          letterSpacing: '0.06em',
          textTransform: 'uppercase'
        } as CSSProperties}
      >
        {badge}
      </span>
    </div>
    <div style={{ padding: '0.5rem 0' }}>
      {modules.map((m, i) => (
        <div
          key={i}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.75rem',
            padding: '0.45rem 1.25rem',
            fontSize: '0.85rem',
            opacity: 0.85
          }}
        >
          <span style={{ color, fontSize: '0.6rem', flexShrink: 0 }}>▸</span>
          {m}
        </div>
      ))}
    </div>
  </div>
)
