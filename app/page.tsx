import Image from 'next/image'
import { CoffeeSponsorPlaceholder } from '../lib/components/coffee-sponsor-placeholder'
const references: Array<{ title: string; description: string; href: string }> =
  [];

export default function Home() {
  return (
    <div className="pensieve-landing">
      <section className="pensieve-hero">
        <img
          src="/mystic-logo.png"
          alt="The Pensieve"
          className="hero-title-logo"
        />

        <p className="quote">
          &ldquo;I use the Pensieve. One simply siphons the excess thoughts from
          one&rsquo;s mind, pours them into the basin, and examines them at
          one&rsquo;s leisure.&rdquo;
          <cite>— Albus Dumbledore</cite>
        </p>

        <p className="pensieve-subtitle">
          Built for the 16-year-old me who was navigating TryHackMe, HackTheBox, and the overwhelming world of cybersecurity.
          This is a personal manual — every technique, every command, every memory — gathered and structured over time to conquer the chaos.
        </p>

        <a href="/Red-Teaming/00-Pre-Engagement" className="cta-button">
          Enter the Pensieve →
        </a>

     <div className="pensieve-divider">
        <span>References</span>
      </div>

        <Image
          src="/harry-potter-dumbledore.gif"
          alt="Dumbledore at the Pensieve"
          width={420}
          height={420}
          style={{ borderRadius: "12px", opacity: 0.8 }}
        />
      </section>

      <div className="pensieve-divider">
        <span>Sponsors</span>
      </div>

      <div className="sponsor-grid">
        <a
          href="https://cyberunbound.com"
          target="_blank"
          rel="noopener noreferrer"
          className="phase-card sponsor-card"
        >
          <Image
            src="/cyberunbound.webp"
            alt="CyberUnbound"
            width={180}
            height={120}
            className="sponsor-logo"
          />
        </a>

        <CoffeeSponsorPlaceholder />
      </div>

      <div className="ref-grid">
        {references.map((ref) => (
          <a key={ref.href} href={ref.href} className="ref-card">
            <h4>{ref.title}</h4>
            <p>{ref.description}</p>
          </a>
        ))}
      </div>
    </div>
  );
}
