export function makePairKey(a, b) {
  return [a, b].sort().join(':');
}

export function stablePercent(seed) {
  let hash = 0;
  for (let i = 0; i < seed.length; i += 1) {
    hash = (hash * 31 + seed.charCodeAt(i)) % 9973;
  }
  return 68 + (hash % 29);
}

export function scoreProfiles(me, them, mode = 'doppel') {
  const locationBoost = me?.location && them?.location && me.location.toLowerCase() === them.location.toLowerCase() ? 4 : 0;
  const ageGap = Math.abs(Number(me?.age || 0) - Number(them?.age || 0));
  const agePenalty = Math.min(ageGap, 8);
  const base = stablePercent(`${me?.id || 'me'}-${them?.id || 'them'}-${mode}`);
  const doppelScore = Math.max(70, Math.min(97, base + locationBoost - agePenalty));
  const chaosScore = Math.max(70, Math.min(97, 100 - doppelScore + 64));

  if (mode === 'chaos') {
    return { label: 'Chaos Mode', value: chaosScore };
  }

  return { label: `Twin Energy ${doppelScore}%`, value: doppelScore };
}

export function modeCopy(mode) {
  if (mode === 'chaos') {
    return 'Go for the total opposite when your usual type needs a plot twist.';
  }
  return 'Discover people who look like your mirror — familiar faces and instant twin vibes.';
}
