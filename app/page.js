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
    textBottom: 'Same face-card energy.',
  },
];

const proofAvatars = [
  '/assets/home-proof-1.webp',
  '/assets/home-proof-2.webp',
  '/assets/home-proof-3.webp',
  '/assets/home-proof-4.webp',
];

export default function HomePage() {
  return (
    <main className="dc-page-shell dc-home-shell-v7">
      <header className="dc-home-browser-v7">
        <div className="dc-home-browser-top-v7">
          <div className="dc-home-browser-dots-v7">
            <span className="dot red" />
            <span className="dot yellow" />
            <span className="dot green" />
          </div>

          <div className="dc-home-browser-domain-v7">
            <span className="dc-home-browser-lock-v7">🔒</span>
            <span>doppelcrush.com</span>
          </div>

          <div className="dc-home-browser-tools-v7">
            <span>⤴</span>
            <span>＋</span>
            <span>▢</span>
          </div>
        </div>

        <div className="dc-home-browser-main-v7">
          <Link href="/" className="dc-home-brand-v7">
            <img src="/assets/logo-badge.svg" alt="DoppelCrush logo" />
            <div>
              <h1>DoppelCrush</h1>
              <p>Because clearly you have good taste.</p>
            </div>
          </Link>

          <nav className="dc-home-nav-v7">
            <Link href="/">Home</Link>
            <Link href="/how-it-works">How it works</Link>
            <Link href="/safety">Safety</Link>
            <Link href="/faq">FAQ</Link>
          </nav>

          <div className="dc-home-header-actions-v7">
            <Link href="/signup" className="dc-home-start-v7">
              Start
            </Link>
            <span className="dc-home-header-star-v7">✦</span>
          </div>
        </div>
      </header>

      <section className="dc-home-hero-v7">
        <div className="dc-home-hero-copy-v7">
          <div className="dc-home-badge-v7">
            <span className="dc-home-badge-icon-v7">📸</span>
            <span>Selfie first. Crush later.</span>
          </div>

          <img
            className="dc-home-heart-character-v7"
            src="/assets/sticker-heart-character.svg"
            alt=""
            aria-hidden="true"
          />

          <div className="dc-home-spark-v7 dc-home-spark-a-v7">✦</div>
          <div className="dc-home-spark-v7 dc-home-spark-b-v7">✦</div>
          <div className="dc-home-spark-v7 dc-home-spark-c-v7">✧</div>
          <div className="dc-home-scribble-v7 dc-home-scribble-a-v7">〰</div>
          <div className="dc-home-scribble-v7 dc-home-scribble-b-v7">〰</div>

          <img
            className="dc-home-left-bolt-v7"
            src="/assets/sticker-lightning-bolt.svg"
            alt=""
            aria-hidden="true"
          />

          <h2 className="dc-home-title-v7">
            <span className="dc-home-title-black-v7">Find your</span>
            <span className="dc-home-title-gradient-v7">DoppelCrush</span>
          </h2>

          <p className="dc-home-copy-v7">
            Upload your selfie, pick your vibe, and discover people who match
            your look — or completely change your type.
          </p>

          <div className="dc-home-cta-row-v7">
            <Link href="/signup" className="dc-home-primary-cta-v7">
              <span className="dc-home-cta-icon-v7">📷</span>
              <span>Upload my selfie</span>
              <strong>→</strong>
            </Link>

            <Link href="/signup?mode=chaos" className="dc-home-secondary-cta-v7">
              <span className="dc-home-cta-icon-v7">⚡</span>
              <span>Chaos Mode</span>
            </Link>
          </div>

          <div className="dc-home-mini-grid-v7">
            <div className="dc-home-mini-card-v7">
              <div className="dc-home-mini-icon-v7">📷</div>
              <div>
                <strong>Upload selfie</strong>
                <p>Face card only</p>
              </div>
            </div>

            <div className="dc-home-mini-card-v7">
              <div className="dc-home-mini-icon-v7">💗</div>
              <div>
                <strong>Get matches</strong>
                <p>Cute people, similar vibe</p>
              </div>
            </div>

            <div className="dc-home-mini-card-v7">
              <div className="dc-home-mini-icon-v7">💬</div>
              <div>
                <strong>Start chatting</strong>
                <p>If it’s a match</p>
              </div>
            </div>
          </div>

          <div className="dc-home-proof-v7">
            <div className="dc-home-proof-avatars-v7">
              {proofAvatars.map((avatar) => (
                <img key={avatar} src={avatar} alt="" aria-hidden="true" />
              ))}
            </div>
            <p>Join people discovering their twin energy — or a very good plot twist.</p>
          </div>
        </div>

        <div className="dc-home-preview-wrap-v7">
          <img
            className="dc-home-winged-heart-v7"
            src="/assets/sticker-winged-heart.svg"
            alt=""
            aria-hidden="true"
          />

          <div className="dc-home-preview-v7">
            <div className="dc-home-preview-top-v7">
              <div className="dc-home-preview-dots-v7">
                <span className="dot red" />
                <span className="dot yellow" />
                <span className="dot green" />
              </div>
            </div>

            <div className="dc-home-preview-kicker-v7">• LIVE PREVIEW</div>
            <h3 className="dc-home-preview-title-v7">Your matches</h3>

            <div className="dc-home-preview-list-v7">
              {previewMatches.map((match) => (
                <div key={match.name} className="dc-home-preview-card-v7">
                  <img src={match.image} alt={match.name} className="dc-home-preview-photo-v7" />

                  <div className="dc-home-preview-copy-v7">
                    <div className="dc-home-preview-name-v7">
                      {match.name}, {match.age}
                    </div>
                    <div className={`dc-home-preview-badge-v7 ${match.badgeClass}`}>
                      {match.badgeClass === 'chaos' ? '⚡ ' : ''}
                      {match.badge}
                    </div>
                    <p>
                      {match.textTop}
                      <br />
                      {match.textBottom}
                    </p>
                  </div>

                  <div className="dc-home-preview-actions-v7">
                    <button type="button" className="dc-home-pass-v7">
                      Pass
                    </button>
                    <button type="button" className="dc-home-like-v7">
                      <span>💗</span>
                      Into it
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <button type="button" className="dc-home-preview-more-v7">
              See more matches <span>⌄</span>
            </button>
          </div>

          <div className="dc-home-preview-decor-v7 dc-home-preview-heart-v7">♡</div>

          <img
            className="dc-home-side-hearts-v7"
            src="/assets/sticker-duo-hearts.svg"
            alt=""
            aria-hidden="true"
          />

          <img
            className="dc-home-side-bolt-v7"
            src="/assets/sticker-lightning-bolt.svg"
            alt=""
            aria-hidden="true"
          />

          <img
            className="dc-home-side-face-v7"
            src="/assets/sticker-silly-face.svg"
            alt=""
            aria-hidden="true"
          />
        </div>
      </section>

      <section className="dc-home-bottom-grid-v7">
        <article className="dc-home-bottom-card-v7 dc-home-bottom-card-twin-v7">
          <div className="dc-home-bottom-badge-v7 twin">Twin Energy</div>

          <div className="dc-home-bottom-inner-v7">
            <div className="dc-home-bottom-copy-v7">
              <h3>Cute, familiar, iconic.</h3>
              <p>
                Discover people who look like your mirror — familiar faces,
                matching energy, and instant twin vibes.
              </p>
            </div>

            <div className="dc-home-bottom-art-v7">
              <img
                className="dc-home-bottom-heart-v7"
                src="/assets/sticker-duo-hearts.svg"
                alt=""
                aria-hidden="true"
              />

              <div className="dc-home-polaroid-v7">
                <img src="/assets/home-duo.jpg" alt="Doppel duo" />
                <span>You, but make it us.</span>
              </div>
            </div>
          </div>
        </article>

        <article className="dc-home-bottom-card-v7 dc-home-bottom-card-chaos-v7">
          <div className="dc-home-bottom-badge-v7 chaos">Chaos Mode</div>

          <div className="dc-home-bottom-inner-v7 chaos-layout">
            <div className="dc-home-bottom-copy-v7">
              <h3>Plot twist energy.</h3>
              <p>
                Go for the total opposite when your usual type needs a little
                shake-up.
              </p>
            </div>

            <div className="dc-home-chaos-art-v7">
              <img
                className="dc-home-chaos-bolt-v7"
                src="/assets/sticker-lightning-bolt.svg"
                alt=""
                aria-hidden="true"
              />
              <img
                className="dc-home-chaos-face-v7"
                src="/assets/sticker-silly-face.svg"
                alt=""
                aria-hidden="true"
              />
              <img
                className="dc-home-chaos-image-v7"
                src="/assets/home-mode-chaos.webp"
                alt="Chaos mode preview"
              />
            </div>
          </div>
        </article>
      </section>
    </main>
  );
}
