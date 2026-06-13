import Link from 'next/link';

const previewMatches = [
  { name: 'Lola', age: 19, image: '/assets/home-lola.jpg', badge: 'Twin Energy 92%', badgeClass: 'twin', textTop: 'Cute. Familiar.', textBottom: 'Elite taste.' },
  { name: 'Kai', age: 20, image: '/assets/home-kai.jpg', badge: 'Chaos Mode', badgeClass: 'chaos', textTop: 'A total switch-up.', textBottom: 'Still a yes.' },
  { name: 'Ivy', age: 18, image: '/assets/home-ivy.jpg', badge: 'Twin Energy 87%', badgeClass: 'twin', textTop: 'Same vibe.', textBottom: 'Same face-card energy.' },
];

const proofAvatars = ['/assets/home-proof-1.webp','/assets/home-proof-2.webp','/assets/home-proof-3.webp','/assets/home-proof-4.webp'];
const viralHooks = ['Share your Doppel reveal', 'Invite friends to compare', 'Unlock extra daily matches'];

function signupUrl(mode = 'doppel') {
  return `/signup?mode=${mode}&source=homepage&campaign=launch`;
}

export default function HomePage() {
  return (
    <main className="dc-page-shell dc-home-shell-v8">
      <header className="dc-home-browser-v8">
        <div className="dc-home-browser-top-v8">
          <div className="dc-home-browser-dots-v8"><span className="dot red" /><span className="dot yellow" /><span className="dot green" /></div>
          <div className="dc-home-browser-domain-v8"><span>🔒</span><span>doppelcrush.com</span></div>
          <div className="dc-home-browser-tools-v8"><span>⤴</span><span>＋</span><span>▢</span></div>
        </div>

        <div className="dc-home-navshell-v8">
          <Link href="/" className="dc-home-brand-v8">
            <img src="/assets/logo-badge.svg" alt="DoppelCrush logo" />
            <div><h1>DoppelCrush</h1><p>Because clearly you have good taste.</p></div>
          </Link>
          <nav className="dc-home-nav-v8" aria-label="Homepage navigation">
            <Link href="/">Home</Link><Link href="/how-it-works">How it works</Link><Link href="/safety">Safety</Link><Link href="/faq">FAQ</Link>
          </nav>
          <div className="dc-home-nav-actions-v8">
            <Link href={signupUrl()} className="dc-home-start-v8">Start</Link>
            <img src="/assets/sticker-spark-small.svg" alt="" aria-hidden="true" />
          </div>
        </div>
      </header>

      <section className="dc-home-hero-v8">
        <div className="dc-home-left-v8">
          <img className="dc-home-badge-v8" src="/assets/selfie_first_crush_later_badge.png" alt="Selfie first. Crush later." />
          <img className="dc-home-heart-character-v8" src="/assets/sticker-heart-character.svg" alt="" aria-hidden="true" />
          <img className="dc-home-left-star-v8" src="/assets/sticker-spark-star.svg" alt="" aria-hidden="true" />
          <img className="dc-home-left-small-star-v8" src="/assets/sticker-spark-small.svg" alt="" aria-hidden="true" />
          <img className="dc-home-left-heart-outline-v8" src="/assets/sticker-heart-outline.svg" alt="" aria-hidden="true" />
          <img className="dc-home-left-bolt-v8" src="/assets/sticker-lightning-bolt.svg" alt="" aria-hidden="true" />
          <img className="dc-home-left-scribble-v8" src="/assets/sticker-scribble-pink.svg" alt="" aria-hidden="true" />

          <h2 className="dc-home-title-v8"><span>Find your</span><strong>DoppelCrush</strong></h2>
          <p className="dc-home-copy-v8">Upload your selfie, pick your vibe, and discover people who match your look — or completely change your type.</p>

          <div className="dc-home-cta-row-v8">
            <Link href={signupUrl('doppel')} className="dc-home-primary-cta-v8"><img src="/assets/icon-camera.svg" alt="" aria-hidden="true" /><span>Upload my selfie</span><strong>→</strong></Link>
            <Link href={signupUrl('chaos')} className="dc-home-secondary-cta-v8"><img src="/assets/icon-chaos-bolt.svg" alt="" aria-hidden="true" /><span>Chaos Mode</span></Link>
          </div>

          <div className="dc-home-mini-grid-v8">
            <div className="dc-home-mini-card-v8"><div className="dc-home-mini-icon-v8"><img src="/assets/icon-camera.svg" alt="" aria-hidden="true" /></div><div><strong>Upload selfie</strong><p>Face card only</p></div></div>
            <div className="dc-home-mini-card-v8"><div className="dc-home-mini-icon-v8"><img src="/assets/icon-heart.svg" alt="" aria-hidden="true" /></div><div><strong>Get matches</strong><p>Cute people, similar vibe</p></div></div>
            <div className="dc-home-mini-card-v8"><div className="dc-home-mini-icon-v8"><img src="/assets/icon-chat.svg" alt="" aria-hidden="true" /></div><div><strong>Start chatting</strong><p>If it’s a match</p></div></div>
          </div>

          <div className="dc-home-proof-v8">
            <div className="dc-home-proof-avatars-v8">{proofAvatars.map((avatar) => <img key={avatar} src={avatar} alt="" aria-hidden="true" />)}</div>
            <p>Join people discovering their twin energy — or a very good plot twist.</p>
          </div>
        </div>

        <div className="dc-home-right-v8">
          <img className="dc-home-winged-heart-v8" src="/assets/sticker-winged-heart.svg" alt="" aria-hidden="true" />
          <img className="dc-home-right-small-star-v8" src="/assets/sticker-spark-small.svg" alt="" aria-hidden="true" />

          <div className="dc-home-preview-v8">
            <div className="dc-home-preview-top-v8"><div className="dc-home-preview-dots-v8"><span className="dot red" /><span className="dot yellow" /><span className="dot green" /></div></div>
            <div className="dc-home-preview-kicker-v8">• LIVE PREVIEW</div>
            <h3 className="dc-home-preview-title-v8">Your matches</h3>
            <div className="dc-home-preview-list-v8">
              {previewMatches.map((match) => (
                <article key={match.name} className="dc-home-preview-card-v8">
                  <img src={match.image} alt={match.name} className="dc-home-preview-photo-v8" />
                  <div className="dc-home-preview-copy-v8"><div className="dc-home-preview-name-v8">{match.name}, {match.age}</div><div className={`dc-home-preview-badge-v8 ${match.badgeClass}`}>{match.badgeClass === 'chaos' ? '⚡ ' : ''}{match.badge}</div><p>{match.textTop}<br />{match.textBottom}</p></div>
                  <div className="dc-home-preview-actions-v8"><button type="button" className="dc-home-pass-v8">Pass</button><button type="button" className="dc-home-like-v8"><span>💗</span>Into it</button></div>
                </article>
              ))}
            </div>
            <Link href="/discover" className="dc-home-preview-more-v8">See more matches <span>⌄</span></Link>
          </div>

          <img className="dc-home-side-hearts-v8" src="/assets/sticker-duo-hearts.svg" alt="" aria-hidden="true" />
          <img className="dc-home-side-bolt-v8" src="/assets/sticker-lightning-bolt.svg" alt="" aria-hidden="true" />
          <img className="dc-home-side-face-v8" src="/assets/sticker-silly-face.svg" alt="" aria-hidden="true" />
        </div>
      </section>

      <section className="dc-home-bottom-grid-v8">
        <article className="dc-home-mode-card-v8 dc-home-mode-card-twin-v8">
          <div className="dc-home-mode-badge-v8 twin">Twin Energy</div>
          <div className="dc-home-mode-inner-v8">
            <div className="dc-home-mode-copy-v8">
              <h3>Cute, familiar, iconic.</h3>
              <p>Discover people who look like your mirror — familiar faces, matching energy, and instant twin vibes.</p>
              <ul className="dc-home-future-hooks-v8"><li>Face similarity ranking</li><li>Same-sex and opposite-sex matching</li><li>Shareable Doppel reveal cards</li></ul>
            </div>
            <div className="dc-home-mode-art-v8"><img className="dc-home-mode-heart-v8" src="/assets/sticker-duo-hearts.svg" alt="" aria-hidden="true" /><div className="dc-home-polaroid-v8"><img src="/assets/home-duo.jpg" alt="Doppel duo" /><span>You, but make it us.</span></div></div>
          </div>
        </article>

        <article className="dc-home-mode-card-v8 dc-home-mode-card-chaos-v8">
          <div className="dc-home-mode-badge-v8 chaos">Chaos Mode</div>
          <div className="dc-home-mode-inner-v8 chaos-layout">
            <div className="dc-home-mode-copy-v8"><h3>Plot twist energy.</h3><p>Go for the total opposite when your usual type needs a little shake-up.</p><div className="dc-home-viral-list-v8">{viralHooks.map((hook) => <span key={hook}>{hook}</span>)}</div></div>
            <div className="dc-home-chaos-art-v8"><img className="dc-home-chaos-bolt-v8" src="/assets/sticker-lightning-bolt.svg" alt="" aria-hidden="true" /><img className="dc-home-chaos-face-v8" src="/assets/sticker-silly-face.svg" alt="" aria-hidden="true" /><img className="dc-home-chaos-scribble-v8" src="/assets/sticker-scribble-pink.svg" alt="" aria-hidden="true" /><img className="dc-home-chaos-image-v8" src="/assets/home-mode-chaos.webp" alt="Chaos mode preview" /></div>
          </div>
        </article>
      </section>
    </main>
  );
}
