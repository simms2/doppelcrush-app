import Link from 'next/link';
import SiteHeader from '@/components/SiteHeader';

export default function HomePage() {
  return (
    <main className="dc-page-shell">
      <SiteHeader />

      <section className="dc-home-hero dc-card">
        <div className="dc-home-copy">
          <div className="dc-home-sticker">📸 Selfie first. Crush later.</div>

          <h1 className="dc-home-title">
            Find your <span>Doppel.</span>
            <br />
            Or flirt with <em>chaos.</em>
          </h1>

          <p className="dc-home-subcopy">
            Upload your selfie, choose your vibe, and discover people who match
            your look — or your total opposite.
          </p>

          <div className="dc-home-cta-row">
            <Link href="/signup" className="dc-btn dc-btn-primary">
              Start matching
            </Link>
            <Link href="/how-it-works" className="dc-btn dc-btn-light">
              How it works
            </Link>
          </div>

          <div className="dc-home-proof">
            <div className="dc-home-proof-avatars">
              <img src="/assets/user-lola.png" alt="Member preview" />
              <img src="/assets/user-lola.png" alt="Member preview" />
              <img src="/assets/user-lola.png" alt="Member preview" />
              <img src="/assets/user-lola.png" alt="Member preview" />
            </div>
            <p>
              Join people discovering their twin energy
              <span> — or a very good plot twist.</span>
            </p>
          </div>
        </div>

        <div className="dc-home-visual">
          <div className="dc-phone-stack">
            <div className="dc-phone-card dc-phone-card-main">
              <div className="dc-phone-top">
                <span className="dc-phone-notch" />
              </div>

              <div className="dc-phone-inner">
                <div className="dc-phone-minihead">
                  <span className="dc-phone-page">Discover</span>
                  <span className="dc-badge">Doppel Mode</span>
                </div>

                <div className="dc-phone-profile">
                  <img src="/assets/user-lola.png" alt="Lola profile preview" />
                  <div className="dc-phone-profile-meta">
                    <div className="dc-phone-name-row">
                      <strong>Lola, 19</strong>
                      <span className="dc-badge">Twin Energy 92%</span>
                    </div>
                    <p>Giving familiar in the best way.</p>
                  </div>
                </div>

                <div className="dc-phone-actions">
                  <button type="button">×</button>
                  <button type="button" className="active">♥</button>
                  <button type="button">⚡</button>
                </div>
              </div>
            </div>

            <div className="dc-phone-card dc-phone-card-chat">
              <div className="dc-phone-top">
                <span className="dc-phone-notch" />
              </div>

              <div className="dc-phone-inner">
                <div className="dc-chat-hero">
                  <div className="dc-chat-match-title">It’s a match!</div>
                  <div className="dc-chat-avatars">
                    <img src="/assets/user-lola.png" alt="Match avatar" />
                    <img src="/assets/user-lola.png" alt="User avatar" />
                  </div>
                  <p>You and Lola liked each other. Say something cute.</p>
                </div>

                <div className="dc-chat-bubbles">
                  <div className="dc-chat-bubble them">
                    Okay be honest… do we actually look alike?
                  </div>
                  <div className="dc-chat-bubble me">
                    This match is dangerously familiar.
                  </div>
                  <div className="dc-chat-bubble them">
                    Twin energy is real.
                  </div>
                </div>

                <div className="dc-chat-input-fake">Say something cute...</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="dc-home-section dc-card">
        <div className="dc-home-section-head">
          <div className="dc-kicker">Two ways to match</div>
          <h2>One app. Two very different energies.</h2>
        </div>

        <div className="dc-home-mode-grid">
          <article className="dc-home-mode-card twin">
            <div className="dc-home-mode-icon">💞</div>
            <div className="dc-home-mode-copy">
              <div className="dc-kicker pink">Doppel Mode</div>
              <h3>Find your twin energy.</h3>
              <p>
                Discover people who look like your mirror — similar features,
                similar vibe, instant connection.
              </p>
            </div>
            <div className="dc-home-mode-photo">
              <img src="/assets/user-lola.png" alt="Doppel mode preview" />
            </div>
          </article>

          <article className="dc-home-mode-card chaos">
            <div className="dc-home-mode-icon">⚡</div>
            <div className="dc-home-mode-copy">
              <div className="dc-kicker">Chaos Mode</div>
              <h3>Explore the opposite.</h3>
              <p>
                Go for the total opposite when your usual type needs a little
                shake-up. Plot twist energy.
              </p>
            </div>
            <div className="dc-home-mode-photo">
              <img src="/assets/user-lola.png" alt="Chaos mode preview" />
            </div>
          </article>
        </div>
      </section>

      <section className="dc-home-section dc-card">
        <div className="dc-home-section-head center">
          <div className="dc-kicker">How it works</div>
          <h2>Cute, quick, and easy to get into.</h2>
        </div>

        <div className="dc-home-steps-grid">
          <div className="dc-home-step-card">
            <div className="dc-home-step-num">1</div>
            <h3>Upload your selfie</h3>
            <p>Use a clear selfie. We’ll handle the rest.</p>
          </div>

          <div className="dc-home-step-card">
            <div className="dc-home-step-num">2</div>
            <h3>Pick your mode</h3>
            <p>Doppel for familiar vibes. Chaos for total plot twists.</p>
          </div>

          <div className="dc-home-step-card">
            <div className="dc-home-step-num">3</div>
            <h3>Match and chat</h3>
            <p>Like, match, and start something real.</p>
          </div>
        </div>
      </section>

      <section className="dc-home-section dc-home-bottom-grid">
        <div className="dc-card dc-home-value-panel">
          <div className="dc-kicker pink">Why people love DoppelCrush</div>
          <h2>A fresh twist on dating. Built for real connection.</h2>

          <div className="dc-home-value-grid">
            <div className="dc-home-value-item">
              <div className="dc-home-value-icon">☺</div>
              <strong>Visual-first matching</strong>
              <p>Because chemistry starts with a spark.</p>
            </div>

            <div className="dc-home-value-item">
              <div className="dc-home-value-icon">✦</div>
              <strong>Playful, not superficial</strong>
              <p>More than looks — it’s about energy.</p>
            </div>

            <div className="dc-home-value-item">
              <div className="dc-home-value-icon">💬</div>
              <strong>Chats that feel easy</strong>
              <p>Starter prompts help break the ice.</p>
            </div>

            <div className="dc-home-value-item">
              <div className="dc-home-value-icon">🛡</div>
              <strong>Safety, always</strong>
              <p>18+, opt-in only, and your photo stays yours.</p>
            </div>
          </div>
        </div>

        <div className="dc-card dc-home-safety-panel">
          <div className="dc-kicker">Safety</div>
          <h2>18+, opt-in, and your photo only.</h2>
          <p className="dc-muted">
            Everyone you see joined on purpose. Use your own selfie, stay in
            control of your account, and keep things respectful.
          </p>

          <div className="dc-home-safety-grid">
            <div className="dc-home-safety-item">
              <strong>18+</strong>
              <span>Adults only</span>
            </div>
            <div className="dc-home-safety-item">
              <strong>Opt-in</strong>
              <span>You’re in control</span>
            </div>
            <div className="dc-home-safety-item">
              <strong>Your data</strong>
              <span>Private and secure</span>
            </div>
            <div className="dc-home-safety-item">
              <strong>Real chats</strong>
              <span>Made for actual conversation</span>
            </div>
          </div>
        </div>
      </section>

      <section className="dc-home-cta-band">
        <div>
          <h2>Ready to meet your mirror match?</h2>
          <p>One selfie is all it takes.</p>
        </div>

        <Link href="/signup" className="dc-btn dc-home-cta-button">
          Create my profile
        </Link>
      </section>
    </main>
  );
}