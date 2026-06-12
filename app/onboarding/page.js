import { Suspense } from 'react';
import OnboardingPageClient from './OnboardingPageClient';

function OnboardingFallback() {
  return (
    <main className="dc-page-shell">
      <div className="dc-auth-wrap wide">
        <div className="dc-card dc-auth-card">
          <div className="dc-kicker">Onboarding</div>
          <h2>Loading your profile setup...</h2>
          <p className="dc-muted">Getting everything ready.</p>
        </div>
      </div>
    </main>
  );
}

export default function OnboardingPage() {
  return (
    <Suspense fallback={<OnboardingFallback />}>
      <OnboardingPageClient />
    </Suspense>
  );
}