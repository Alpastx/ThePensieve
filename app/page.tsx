
const references: Array<{ title: string; description: string; href: string }> =
  [];

export default function Home() {
  return (
    <div className="pensieve-landing">
      <div className="hero-glow" />

      <section className="pensieve-hero">
        <img
          src="/favicon.png"
          alt="The Pensieve Basin"
          width={96}
          height={96}
          className="hero-logo"
        />
        <h1>The Pensieve</h1>

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

        <img
          src="/harry-potter-dumbledore.gif"
          alt="Dumbledore at the Pensieve"
          width={300}
          height={300}
          style={{ marginTop: "3rem", borderRadius: "12px", opacity: 0.8 }}
        />
      </section>



      <div className="pensieve-divider">
        <span>Reference</span>
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
