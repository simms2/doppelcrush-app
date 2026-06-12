import { Suspense } from 'react';
import SignupPageClient from './SignupPageClient';

function SignupFallback() {
  return (
    <main className="dc-page-shell">
      <div className="dc-auth-wrap">
        <div className="dc-card dc-auth-card">
          <div className="dc-kicker">Create account</div>
          <h2>Loading signup...</h2>
          <p className="dc-muted">Getting things ready.</p>
        </div>
      </div>
    </main>
  );
}

export default function SignupPage() {
  return (
    <Suspense fallback={<SignupFallback />}>
      <SignupPageClient />
    </Suspense>
  );
}