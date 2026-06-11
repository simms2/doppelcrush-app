import SiteHeader from '@/components/SiteHeader';

export default function FAQPage() {
  return (
    <main className="dc-page-shell">
      <SiteHeader />
      <section className="dc-card dc-panel">
        <div className="dc-kicker">FAQ</div>
        <h2>The quick answers.</h2>
        <div className="dc-settings-list">
          <div className="dc-setting-row"><span>Do I need to upload a selfie?</span><strong>Yes — that’s how matching works.</strong></div>
          <div className="dc-setting-row"><span>Can I use someone else’s photo?</span><strong>No. Selfies must be your own.</strong></div>
          <div className="dc-setting-row"><span>What is Chaos Mode?</span><strong>It flips the vibe and shows your total opposite.</strong></div>
          <div className="dc-setting-row"><span>Can I reset my profile?</span><strong>Yes — inside Settings.</strong></div>
        </div>
      </section>
    </main>
  );
}
