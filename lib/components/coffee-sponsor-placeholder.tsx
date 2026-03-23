'use client'

import Image from 'next/image'

export function CoffeeSponsorPlaceholder() {
  return (
    <button
      type="button"
      className="phase-card sponsor-card sponsor-card--coffee pensieve-coffee-btn"
      onClick={() =>
        alert('Buy Me a Coffee is not set up yet — check back later.')
      }
    >
      <Image
        src="https://cdn.buymeacoffee.com/buttons/bmc-new-btn-logo.svg"
        alt="Buy Me a Coffee"
        width={180}
        height={120}
        className="sponsor-logo"
      />
      <p>Buy me a coffee to support this project</p>
    </button>
  )
}
