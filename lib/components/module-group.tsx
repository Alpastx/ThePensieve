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
    className="pensieve-module-group"
    style={{
      border: `1px solid ${color}30`,
      borderRadius: '12px',
      overflow: 'hidden',
      margin: '1rem 0'
    }}
  >
    <div
      className="pensieve-module-group__header"
      style={{
        background: color + '12',
        borderBottom: `1px solid ${color}20`
      }}
    >
      <span className="pensieve-module-group__title">{title}</span>
      <span
        className="pensieve-module-group__badge"
        style={{
          background: color + '25',
          color,
          padding: '0.15rem 0.5rem',
          borderRadius: '999px'
        } as CSSProperties}
      >
        {badge}
      </span>
    </div>
    <div className="pensieve-module-group__list">
      {modules.map((m, i) => (
        <div key={i} className="pensieve-module-group__row">
          <span style={{ color, fontSize: '0.6rem', flexShrink: 0 }}>▸</span>
          <span className="pensieve-module-group__row-text">{m}</span>
        </div>
      ))}
    </div>
  </div>
)
