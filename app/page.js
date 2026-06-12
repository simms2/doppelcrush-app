import Link from 'next/link';

const previewMatches = [
  {
    name: 'Lola',
    age: 19,
    image: '/assets/home-lola.jpg',
    badge: 'Twin Energy 92%',
    badgeClass: 'twin',
    textTop: 'Cute. Familiar.',
    textBottom: 'Elite taste.',
  },
  {
    name: 'Kai',
    age: 20,
    image: '/assets/home-kai.jpg',
    badge: 'Chaos Mode',
    badgeClass: 'chaos',
    textTop: 'A total switch-up.',
    textBottom: 'Still a yes.',
  },
  {
    name: 'Ivy',
    age: 18,
    image: '/assets/home-ivy.jpg',
    badge: 'Twin Energy 87%',
    badgeClass: 'twin',
    textTop: 'Same vibe.',
    textBottom: 'Same face card energy.',
  },
];

const miniCards = [
  {
    icon: '📷',
    title: 'Upload selfie',
    text: 'Face card only',
  },
  {
    icon: '💗',
    title: 'Get matches',
    text: 'Cute people, similar vibe',
  },
  {
    icon: '💬',
    title: 'Start chatting',
    text: 'If it’s a match',
  },
];

export default function HomePage() {
  return (
    <main className="dc-page-shell dc-home-shell-v5">
      <header className="dc-home-browser-shell-v5">
        <div className="dc-home-toolbar-v5">
          <div className="dc-home-toolbar-left-v5">
            <span className="dot red" />
            <span className="dot yellow" />
            <span className="dot green" />
          </div>

          <div className="dc-home-toolbar-center-v5">
            <span className="dc-home-toolbar-lock-v5">🔒</span>
            <span>doppelcrush.com</span>
          </div>

          <div className="dc-home-toolbar-right-v5">
            <span>⤴</span>
            <span>＋</span>
            <span>▢</span>
          </div>
        </div>

        <div className="dc-home-header-v5">
          <div className="dc-home-brand-v5">
            <img src="/assets/logo-badge.svg" alt="DoppelCrush logo" />
            <div>
              <h1>DoppelCrush</h1>
              <p>Because clearly you have good taste.</p>
            </div>
          </div>

          <nav className="dc-home-nav-v5">
            <Link href="/">Home</Link>
            <Link href="/how-it-works">How it works</Link>
            <Link href="/safety">Safety</Link>
            <Link href="/faq">FAQ</Link>
          </nav>

          <div className="dc-home-header-action-v5">
            <Link href="/signup" className="dc-home-start-btn-v5">
              Start
            </Link>
            <span className="dc-home-header-spark-v5">✦</span>
          </div>
        </div>
      </header>

      <section className="dc-home-hero-v5">
        <div className="dc-home-left-v5">
          <div className="dc-home-sticker-banner-v5">
            <span>📸</span>
            <span>Selfie first. Crush later.</span>
          </div>

          <img
            className="dc-home-heart-character-v5"
            src="/assets/sticker-heart-character.svg"
            alt="Heart sticker"
          />

          <div className="dc-home-doodle-v5 dc-home-doodle-a-v5">✦</div>
          <div className="dc-home-doodle-v5 dc-home-doodle-b-v5">⚡</div>
          <div className="dc-home-doodle-v5 dc-home-doodle-c-v5">♡</div>
          <div className="dc-home-doodle-v5 dc-home-doodle-d-v5">〰</div>
          <div className="dc-home-doodle-v5 dc-home-doodle-e-v5">★</div>

          <h2 className="dc-home-title-v5">
            <span className="dc-home-title-black-v5">Find your</span>
            <span className="dc-home-title-gradient-v5">DoppelCrush</span>
          </h2>

          <p className="dc-home-copy-v5">
            Upload your selfie, pick your vibe, and discover people who match
            your look — or completely change your type.
          </p>

          <div className="dc-home-buttons-v5">
            <Link href="/signup" className="dc-home-pill-btn-v5 dc-home-pill-primary-v5">
              <span>📷</span>
              Upload my selfie
              <strong>→</strong>
            </Link>

            <Link
              href="/signup?mode=chaos"
              className="dc-home-pill-btn-v5 dc-home-pill-secondary-v5"
            >
              <span>⚡</span>
              Chaos Mode
            </Link>
          </div>

          <div className="dc-home-mini-grid-v5">
            {miniCards.map((card) => (
              <div key={card.title} className="dc-home-mini-card-v5">
                <div className="dc-home-mini-icon-v5">{card.icon}</div>
                <div>
                  <strong>{card.title}</strong>
                  <p>{card.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="dc-home-right-v5">
          <img
            className="dc-home-winged-heart-v5"
            src="/assets/sticker-winged-heart.svg"
            alt="Winged heart sticker"
          />

          <div className="dc-home-preview-v5">
            <div className="dc-home-preview-top-v5">
              <div className="dc-home-preview-dots-v5">
                <span className="dot red" />
                <span className="dot yellow" />
                <span className="dot green" />
              </div>
            </div>

            <div className="dc-home-preview-kicker-v5">• LIVE PREVIEW</div>
            <h3 className="dc-home-preview-title-v5">Your matches</h3>

            <div className="dc-home-preview-list-v5">
              {previewMatches.map((match) => (
                <div key={match.name} className="dc-home-preview-card-v5">
                  <img src={match.image} alt={match.name} />

                  <div className="dc-home-preview-copy-v5">
                    <div className="dc-home-preview-name-v5">
                      {match.name}, {match.age}
                    </div>
                    <div className={`dc-home-preview-badge-v5 ${match.badgeClass}`}>
                      {match.badgeClass === 'chaos' ? '⚡ ' : ''}
                      {match.badge}
                    </div>
                    <p>
                      {match.textTop}
                      <br />
                      {match.textBottom}
                    </p>
                  </div>

                  <div className="dc-home-preview-actions-v5">
                    <button type="button" className="dc-home-pass-btn-v5">
                      Pass
                    </button>
                    <button type="button" className="dc-home-like-btn-v5">
                      <span>💗</span>
                      Into it
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <button type="button" className="dc-home-preview-more-v5">
              See more matches <span>⌄</span>
            </button>
          </div>

          <img
            className="dc-home-side-hearts-v5"
            src="/assets/sticker-duo-hearts.svg"
            alt="Heart stickers"
          />

          <img
            className="dc-home-side-bolt-v5"
            src="/assets/sticker-lightning-bolt.svg"
            alt="Lightning bolt sticker"
          />

          <img
            className="dc-home-side-face-v5"
            src="/assets/sticker-silly-face.svg"
            alt="Playful face sticker"
          />
        </div>
      </section>

      <section className="dc-home-bottom-grid-v5">
        <article className="dc-home-bottom-card-v5 dc-home-bottom-card-twin-v5">
          <div className="dc-home-bottom-badge-v5 twin">Twin Energy</div>

          <div className="dc-home-bottom-inner-v5">
            <div className="dc-home-bottom-copy-v5">
              <h3>Cute, familiar, iconic.</h3>
              <p>
                Discover people who look like your mirror — familiar faces,
                matching energy, and instant twin vibes.
              </p>
            </div>

            <div className="dc-home-bottom-art-v5">
              <img
                className="dc-home-bottom-heart-v5"
                src="/assets/sticker-duo-hearts.svg"
                alt="Heart sticker"
              />

              <div className="dc-home-polaroid-v5">
                <img src="/assets/home-duo.jpg" alt="Doppel duo" />
                <span>You, but make it us.</span>
              </div>
            </div>
          </div>
        </article>

        <article className="dc-home-bottom-card-v5 dc-home-bottom-card-chaos-v5">
          <div className="dc-home-bottom-badge-v5 chaos">Chaos Mode</div>

          <div className="dc-home-bottom-inner-v5 chaos-layout">
            <div className="dc-home-bottom-copy-v5">
              <h3>Plot twist energy.</h3>
              <p>
                Go for the total opposite when your usual type needs a little
                shake-up.
              </p>
            </div>

            <div className="dc-home-chaos-art-v5">
              <img
                className="dc-home-chaos-bolt-v5"
                src="/assets/sticker-lightning-bolt.svg"
                alt="Lightning bolt sticker"
              />
              <img
                className="dc-home-chaos-face-v5"
                src="/assets/sticker-silly-face.svg"
                alt="Playful face sticker"
              />
            </div>
          </div>
        </article>
      </section>
    </main>
  );
}