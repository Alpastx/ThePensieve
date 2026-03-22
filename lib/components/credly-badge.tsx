'use client'

import Script from 'next/script'
import type { FC } from 'react'

export type CredlyBadgeProps = {
  /** Credly share badge UUID */
  badgeId: string
  /** Pixel width Credly uses for the iframe (default 180 for readability) */
  iframeWidth?: number
  /** Pixel height Credly uses for the iframe */
  iframeHeight?: number
}

/**
 * Credly embed wrapped for The Pensieve (dark / purple border card).
 * Loads embed.js once; safe to use multiple times on a page.
 */
export const CredlyBadge: FC<CredlyBadgeProps> = ({
  badgeId,
  iframeWidth = 180,
  iframeHeight = 324
}) => (
  <div className="pensieve-credly-badge">
    <div className="pensieve-credly-badge__label">Verified on Credly</div>
    <div className="pensieve-credly-badge__inner">
      <div
        data-iframe-width={iframeWidth}
        data-iframe-height={iframeHeight}
        data-share-badge-id={badgeId}
        data-share-badge-host="https://www.credly.com"
      />
    </div>
    <Script
      src="https://cdn.credly.com/assets/utilities/embed.js"
      strategy="lazyOnload"
    />
  </div>
)
