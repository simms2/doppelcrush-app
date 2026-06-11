import SiteHeader from '@/components/SiteHeader';

export default function HowItWorksPage() {
  return (
    <main className="dc-page-shell">
      <SiteHeader />
      <section className="dc-card dc-panel">
        <div className="dc-kicker">How it works</div>
        <h2>Cute, quick, and easy to get into.</h2>
        <div className="dc-two-col info-grid-tight">
          <div>
            <h3>1. Upload your selfie</h3>
            <p className="dc-muted">Just you. No group pics. No sunglasses. No hiding the face card.</p>
            <h3>2. Pick your mode</h3>
            <p className="dc-muted">Go Doppel for the familiar, or Chaos for the plot twist.</p>
          </div>
          <div>
            <h3>3. Meet your matches</h3>
            <p className="dc-muted">Swipe through people who match your energy.</p>
            <h3>4. Chat if it clicks</h3>
            <p className="dc-muted">If it’s a match, jump straight into chat.</p>
          </div>
        </div>
      </section>
    </main>
  );
}
