'use client';

function tidyName(name = '') {
  if (!name) return 'Someone cute';
  return name.charAt(0).toUpperCase() + name.slice(1);
}

export default function MatchCard({ profile, score, onLike, onPass, showLocation = true }) {
  const name = tidyName(profile.first_name);
  const bio = profile.bio || 'Giving familiar in the best way.';
  const location = profile.location ? `Based in ${profile.location}` : 'Location coming soon';

  return (
    <div className="dc-match-card">
      <img
        className="dc-match-photo"
        src={profile.selfie_url || '/assets/user-lola.png'}
        alt={name}
      />

      <div className="dc-match-meta">
        <div className="dc-match-title-row">
          <h3>
            {name}
            {profile.age ? `, ${profile.age}` : ''}
          </h3>
          <div className={`dc-badge ${score?.kind === 'chaos' ? 'orange' : ''}`}>
            {score?.label || 'Twin Energy'}
          </div>
        </div>

        <p className="dc-match-vibe">{bio}</p>

        <div className="dc-match-subrow">
          {showLocation ? <span className="dc-location-pill">{location}</span> : null}
          <span className="dc-small dc-muted">Face card: strong</span>
        </div>
      </div>

      <div className="dc-action-stack">
        {onPass ? (
          <button className="dc-btn dc-btn-ghost" onClick={() => onPass(profile)}>
            Not for me
          </button>
        ) : null}

        {onLike ? (
          <button className="dc-btn dc-btn-primary" onClick={() => onLike(profile)}>
            Into it
          </button>
        ) : null}
      </div>
    </div>
  );
}