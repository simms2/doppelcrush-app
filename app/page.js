import Link from 'next/link';
import SiteHeader from '@/components/SiteHeader';

export default function HomePage() {
  return (
    <main className="dc-page-shell">
      <SiteHeader />

      <div className="dc-hero-grid">
        <section className="dc-card dc-hero-card">
          <img className="dc-heart-char" src="/assets/heart-character.svg" alt="" />
          <img className="dc-zap" src="/assets/lightning-bolt.svg" alt="" />
          <div className="dc-sticker">📸 Selfie first. Crush later.</div>
          <h2 className="dc-hero-title">Find your <span>DoppelCrush</span></h2>
          <p className="dc-hero-copy">Ever wondered why so many couples look alike? Wonder no more and find your DoppelCrush. Upload your selfie and we’ll do the rest.</p>
          <div className="dc-button-row">
            <Link className="dc-btn dc-btn-primary" href="/signup">Upload my selfie</Link>
            <Link className="dc-btn dc-btn-light" href="/signup?mode=chaos">Chaos Mode</Link>
          </div>
          <div className="dc-feature-strip">
            <div className="dc-feature-tile"><strong>Upload selfie</strong><span>Face card only</span></div>
            <div className="dc-feature-tile"><strong>Get matches</strong><span>Cute people, similar vibe</span></div>
            <div className="dc-feature-tile"><strong>Start chatting</strong><span>If it’s a match</span></div>
          </div>
        </section>

        <aside className="dc-card dc-preview-wrap">
          <img className="dc-winged-heart" src="/assets/winged-heart.svg" alt="" />
          <div className="dc-preview-bar">
            <span className="dot red"></span>
            <span className="dot yellow"></span>
            <span className="dot green"></span>
            <div className="dc-preview-url">doppelcrush.com</div>
          </div>
          <div className="dc-panel">
            <div className="dc-panel-top">
              <div>
                <div className="dc-kicker pink">Live preview</div>
                <h2>Your matches</h2>
              </div>
              <div className="dc-badge">3 new</div>
            </div>
            <div className="dc-mini-match-list">
              <div className="dc-mini-match">
                <img src="/assets/user-lola.png" alt="Lola" />
                <div>
                  <strong>Lola, 19</strong>
                  <div className="dc-badge">Twin Energy 92%</div>
                  <p>Cute. Familiar. Elite taste.</p>
                </div>
              </div>
              <div className="dc-mini-match">
                <img src="/assets/user-kai.png" alt="Kai" />
                <div>
                  <strong>Kai, 20</strong>
                  <div className="dc-badge">Chaos Mode</div>
                  <p>A total switch-up. Still a yes.</p>
                </div>
              </div>
              <div className="dc-mini-match">
                <img src="/assets/user-ivy.png" alt="Ivy" />
                <div>
                  <strong>Ivy, 18</strong>
                  <div className="dc-badge">Twin Energy 87%</div>
                  <p>Same vibe. Same face card energy.</p>
                </div>
              </div>
            </div>
          </div>
        </aside>
      </div>

      <div className="dc-mode-grid">
        <section className="dc-card dc-mode-card twin">
          <img className="dc-mode-hearts" src="/assets/duo-hearts.svg" alt="" />
          <div className="dc-badge">Twin Energy</div>
          <h3>Cute, familiar, iconic.</h3>
          <p>Discover people who look like your mirror — familiar faces, matching energy, and instant twin vibes.</p>
          <div className="dc-polaroid">
            <img src="/assets/couple-polaroid.png" alt="Couple polaroid" />
            <span>You, but make it us.</span>
          </div>
        </section>
        <section className="dc-card dc-mode-card chaos">
          <img className="dc-mode-bolt" src="/assets/lightning-bolt.svg" alt="" />
          <img className="dc-mode-face" src="/assets/silly-face.svg" alt="" />
          <div className="dc-badge orange">Chaos Mode</div>
          <h3>Plot twist energy.</h3>
          <p>Go for the total opposite when your usual type needs a little shake-up.</p>
        </section>
      </div>

      <div className="dc-info-grid">
        <section className="dc-card dc-panel">
          <div className="dc-kicker">How it works</div>
          <h3>Cute, quick, and easy to get into.</h3>
          <ol className="dc-steps">
            <li>Sign up</li>
            <li>Upload your selfie</li>
            <li>Pick Doppel or Chaos</li>
            <li>See your matches</li>
            <li>Like, match, and chat</li>
          </ol>
        </section>
        <section className="dc-card dc-panel">
          <div className="dc-kicker">Safety</div>
          <h3>18+, opt-in, and your photo only.</h3>
          <p className="dc-muted">Everyone you see joined on purpose. Use your own selfie, stay in control of your account, and use report/block tools if anything feels off.</p>
          <div className="dc-notice">This starter includes real auth, real database wiring, real storage uploads, and real multi-user records once you connect Supabase.</div>
        </section>
      </div>
    </main>
  );
}
