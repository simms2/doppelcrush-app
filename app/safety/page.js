import SiteHeader from '@/components/SiteHeader';

export default function SafetyPage() {
  return (
    <main className="dc-page-shell">
      <SiteHeader />
      <section className="dc-card dc-panel">
        <div className="dc-kicker">Safety</div>
        <h2>18+, opt-in, and your photo only.</h2>
        <div className="dc-settings-list">
          <div className="dc-setting-row"><span>Adults only</span><strong>18+ users</strong></div>
          <div className="dc-setting-row"><span>Use your own photo</span><strong>Selfies must be yours</strong></div>
          <div className="dc-setting-row"><span>Opt-in only</span><strong>Everyone joined on purpose</strong></div>
          <div className="dc-setting-row"><span>Report and block</span><strong>Add in the next pass if needed</strong></div>
        </div>
      </section>
    </main>
  );
}
