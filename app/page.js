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
    icon: '/assets/icon-camera.svg',
    title: 'Upload selfie',
    text: 'Face card only',
  },
  {
    icon: '/assets/icon-heart.svg',
    title: 'Get matches',
    text: 'Cute people,\nsimilar vibe',
  },
  {
    icon: '/assets/icon-chat.svg',
    title: 'Start chatting',
    text: 'If it’s a match',
  },
];

export default function HomePage() {
  return (
    <main className="dc-page-shell dc-home-shell-v6">
      <header className="dc-home-browser-shell-v6">
        <div className="dc-home-toolbar-v6">
          <div className="dc-home-toolbar-left-v6">
            <span className="dot red" />
            <span className="dot yellow" />
            <span className="dot green" />
          </div>

          <div className="dc-home-toolbar-center-v6">
            <span className="dc-home-toolbar-lock-v6">🔒</span>
            <span>doppelcrush.com</span>
          </div>

          <div className="dc-home-toolbar-right-v6">
            <span>⤴</span>
            <span>＋</span>
            <span>▢</span>
          </div>
        </div>

        <div className="dc-home-header-v6">
          <div className="dc-home-brand-v6">
            <img src="/assets/logo-badge.svg" alt="DoppelCrush logo" />
            <div>
              <h1>DoppelCrush</h1>
              <p>Because clearly you have good taste.</p>
            </div>
          </div>

          <nav className="dc-home-nav-v6">
            <Link href="/">Home</Link>
            <Link href="/how-it-works">How it works</Link>
            <Link href="/safety">Safety</Link>
            <Link href="/faq">FAQ</Link>
          </nav>

          <div className="dc-home-header-action-v6">
            <Link href="/signup" className="dc-home-start-btn-v6">
              Start
            </Link>
            <span className="dc-home-header-spark-v6">✦</span>
          </div>
        </div>
      </header>

      <section className="dc-home-hero-v6">
        <div className="dc-home-left-v6">
          <img
            className="dc-home-badge-v6"
            src="/assets/selfie_first_crush_later_badge.png"
            alt="Selfie first. Crush later."
          />

          <img
            className="dc-home-heart-character-v6"
            src="/assets/sticker-heart-character.svg"
            alt="Heart sticker"
          />

          <img
            className="dc-home-left-bolt-v6"
            src="/assets/sticker-lightning-bolt.svg"
            alt="Lightning bolt"
          />

          <img
            className="dc-home-left-spark-v6"
            src="/assets/sticker-spark-star.svg"
            alt="Spark star"
          />

          <img
            className="dc-home-left-outline-heart-v6"
            src="/assets/sticker-heart-outline.svg"
            alt="Heart outline"
          />

          <img
            className="dc-home-left-scribble-v6"
            src="/assets/sticker-scribble-pink.svg"
            alt="Pink scribble"
          />

          <h2 className="dc-home-title-v6">
            <span className="dc-home-title-black-v6">Find your</span>
            <span className="dc-home-title-gradient-v6">DoppelCrush</span>
          </h2>

          <p className="dc-home-copy-v6">
            Upload your selfie, pick your vibe, and discover people who match
            your look — or completely change your type.
          </p>

          <div className="dc-home-buttons-v6">
            <Link href="/signup" className="dc-home-pill-btn-v6 dc-home-pill-primary-v6">
              <img src="/assets/icon-camera.svg" alt="" aria-hidden="true" />
              <span>Upload my selfie</span>
              <strong>→</strong>
            </Link>

            <Link
              href="/signup?mode=chaos"
              className="dc-home-pill-btn-v6 dc-home-pill-secondary-v6"
            >
              <img src="/assets/icon-chaos-bolt.svg" alt="" aria-hidden="true" />
              <span>Chaos Mode</span>
            </Link>
          </div>

          <div className="dc-home-mini-grid-v6">
            {miniCards.map((card) => (
              <div key={card.title} className="dc-home-mini-card-v6">
                <div className="dc-home-mini-icon-v6">
                  <img src={card.icon} alt="" aria-hidden="true" />
                </div>
                <div>
                  <strong>{card.title}</strong>
                  <p>
                    {card.text.split('\n').map((line) => (
                      <span key={line}>
                        {line}
                        <br />
                      </span>
                    ))}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="dc-home-right-v6">
          <img
            className="dc-home-winged-heart-v6"
            src="/assets/sticker-winged-heart.svg"
            alt="Winged heart sticker"
          />

          <div className="dc-home-preview-v6">
            <div className="dc-home-preview-top-v6">
              <div className="dc-home-preview-dots-v6">
                <span className="dot red" />
                <span className="dot yellow" />
                <span className="dot green" />
              </div>
            </div>

            <div className="dc-home-preview-kicker-v6">• LIVE PREVIEW</div>
            <h3 className="dc-home-preview-title-v6">Your matches</h3>

            <div className="dc-home-preview-list-v6">
              {previewMatches.map((match) => (
                <div key={match.name} className="dc-home-preview-card-v6">
                  <img src={match.image} alt={match.name} />

                  <div className="dc-home-preview-copy-v6">
                    <div className="dc-home-preview-name-v6">
                      {match.name}, {match.age}
                    </div>
                    <div className={`dc-home-preview-badge-v6 ${match.badgeClass}`}>
                      {match.badgeClass === 'chaos' ? '⚡ ' : ''}
                      {match.badge}
                    </div>
                    <p>
                      {match.textTop}
                      <br />
                      {match.textBottom}
                    </p>
                  </div>

                  <div className="dc-home-preview-actions-v6">
                    <button type="button" className="dc-home-pass-btn-v6">
                      Pass
                    </button>
                    <button type="button" className="dc-home-like-btn-v6">
                      <span>💗</span>
                      Into it
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <button type="button" className="dc-home-preview-more-v6">
              See more matches <span>⌄</span>
            </button>
          </div>

          <img
            className="dc-home-side-hearts-v6"
            src="/assets/sticker-duo-hearts.svg"
            alt="Heart stickers"
          />

          <img
            className="dc-home-side-bolt-v6"
            src="/assets/sticker-lightning-bolt.svg"
            alt="Lightning bolt sticker"
          />

          <img
            className="dc-home-side-face-v6"
            src="/assets/sticker-silly-face.svg"
            alt="Playful face sticker"
          />

          <img
            className="dc-home-side-spark-v6"
            src="/assets/sticker-spark-small.svg"
            alt="Small spark"
          />
        </div>
      </section>

      <section className="dc-home-bottom-grid-v6">
        <article className="dc-home-bottom-card-v6 dc-home-bottom-card-twin-v6">
          <div className="dc-home-bottom-badge-v6 twin">Twin Energy</div>

          <div className="dc-home-bottom-inner-v6">
            <div className="dc-home-bottom-copy-v6">
              <h3>Cute, familiar, iconic.</h3>
              <p>
                Discover people who look like your mirror — familiar faces,
                matching energy, and instant twin vibes.
              </p>
            </div>

            <div className="dc-home-bottom-art-v6">
              <img
                className="dc-home-bottom-heart-v6"
                src="/assets/sticker-big-heart.svg"
                alt="Big heart sticker"
              />

              <div className="dc-home-polaroid-v6">
                <img src="/assets/home-duo.jpg" alt="Doppel duo" />
                <span>You, but make it us.</span>
              </div>
            </div>
          </div>
        </article>

        <article className="dc-home-bottom-card-v6 dc-home-bottom-card-chaos-v6">
          <div className="dc-home-bottom-badge-v6 chaos">Chaos Mode</div>

          <div className="dc-home-bottom-inner-v6 chaos-layout">
            <div className="dc-home-bottom-copy-v6">
              <h3>Plot twist energy.</h3>
              <p>
                Go for the total opposite when your usual type needs a little
                shake-up.
              </p>
            </div>

            <div className="dc-home-chaos-art-v6">
              <img
                className="dc-home-chaos-bolt-v6"
                src="/assets/sticker-lightning-bolt.svg"
                alt="Lightning bolt sticker"
              />
              <img
                className="dc-home-chaos-face-v6"
                src="/assets/sticker-silly-face.svg"
                alt="Playful face sticker"
              />
              <img
                className="dc-home-chaos-scribble-v6"
                src="/assets/sticker-scribble-purple.svg"
                alt="Purple scribble"
              />
            </div>
          </div>
        </article>
      </section>
    </main>
  );
}