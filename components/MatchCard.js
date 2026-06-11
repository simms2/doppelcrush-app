'use client';

export default function MatchCard({ profile, score, onLike, onPass, showLocation = true }) {
  return (
    <div className="dc-match-card">
      <img className="dc-match-photo" src={profile.selfie_url || '/assets/user-lola.png'} alt={profile.first_name} />
      <div className="dc-match-meta">
        <h3>{profile.first_name}, {profile.age}</h3>
        <div className="dc-badge">{score.label}</div>
        <p className="dc-muted">{profile.bio || 'Cute. Familiar. Elite taste.'}</p>
        {showLocation ? <p className="dc-small dc-muted">{profile.location || 'Location not set'}</p> : null}
      </div>
      <div className="dc-action-stack">
        {onPass ? <button className="dc-btn dc-btn-ghost" onClick={() => onPass(profile)}>Pass</button> : null}
        {onLike ? <button className="dc-btn dc-btn-primary" onClick={() => onLike(profile)}>Into it</button> : null}
      </div>
    </div>
  );
}
