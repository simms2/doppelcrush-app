'use client';

import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import SiteHeader from '@/components/SiteHeader';
import RequireAuth from '@/components/RequireAuth';
import { getSupabaseBrowser } from '@/lib/supabase/client';

export default function OnboardingPageClient() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const modeParam = searchParams.get('mode') === 'chaos' ? 'chaos' : 'doppel';

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [preview, setPreview] = useState('');
  const [photoFile, setPhotoFile] = useState(null);
  const [form, setForm] = useState({
    first_name: '',
    age: '',
    gender: '',
    looking_for: 'Everyone',
    location: '',
    bio: '',
    mode_preference: modeParam,
  });

  useEffect(() => {
    const supabase = getSupabaseBrowser();

    supabase.auth.getUser().then(async ({ data }) => {
      if (!data?.user) return;

      setUser(data.user);
      setForm((prev) => ({
        ...prev,
        first_name: data.user.user_metadata?.first_name || prev.first_name,
        mode_preference: data.user.user_metadata?.preferred_mode || prev.mode_preference,
      }));

      const { data: profile } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', data.user.id)
        .maybeSingle();

      if (profile) {
        setForm((prev) => ({ ...prev, ...profile }));
        setPreview(profile.selfie_url || '');
      }
    });
  }, []);

  function update(key, value) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  function onFileChange(e) {
    const file = e.target.files?.[0];
    if (!file) return;
    setPhotoFile(file);
    setPreview(URL.createObjectURL(file));
  }

  async function handleSubmit(e) {
    e.preventDefault();

    if (!user) return;

    if (!photoFile && !preview) {
      setError('Please upload a selfie first.');
      return;
    }

    setLoading(true);
    setError('');

    const supabase = getSupabaseBrowser();
    let selfieUrl = preview;

    if (photoFile) {
      const extension = photoFile.name.split('.').pop() || 'jpg';
      const filePath = `${user.id}/selfie-${Date.now()}.${extension}`;

      const upload = await supabase.storage
        .from('selfies')
        .upload(filePath, photoFile, { upsert: true });

      if (upload.error) {
        setLoading(false);
        setError(upload.error.message);
        return;
      }

      const { data } = supabase.storage.from('selfies').getPublicUrl(filePath);
      selfieUrl = data.publicUrl;
    }

    const payload = {
      id: user.id,
      email: user.email,
      first_name: form.first_name,
      age: Number(form.age),
      gender: form.gender,
      looking_for: form.looking_for,
      location: form.location,
      bio: form.bio,
      selfie_url: selfieUrl,
      mode_preference: form.mode_preference,
      onboarding_complete: true,
      updated_at: new Date().toISOString(),
    };

    const { error: upsertError } = await supabase.from('profiles').upsert(payload);

    setLoading(false);

    if (upsertError) {
      setError(upsertError.message);
      return;
    }

    router.push('/discover');
  }

  return (
    <RequireAuth onUserLoaded={setUser}>
      <main className="dc-page-shell">
        <SiteHeader appMode />

        <div className="dc-auth-wrap wide">
          <div className="dc-card dc-auth-card">
            <div className="dc-kicker">Onboarding</div>
            <h2>Upload your selfie and build your profile</h2>
            <p className="dc-muted">Good lighting. Just you. Face card only.</p>

            <form className="dc-form" onSubmit={handleSubmit}>
              <div className="dc-upload-box">
                {preview ? (
                  <img className="dc-selfie-preview" src={preview} alt="Selfie preview" />
                ) : (
                  <div className="dc-upload-placeholder">Pick your best selfie</div>
                )}
                <input type="file" accept="image/*" onChange={onFileChange} />
              </div>

              <div className="dc-two-col">
                <div>
                  <label>First name</label>
                  <input
                    value={form.first_name}
                    onChange={(e) => update('first_name', e.target.value)}
                    required
                  />
                </div>

                <div>
                  <label>Age</label>
                  <input
                    type="number"
                    min="18"
                    max="99"
                    value={form.age}
                    onChange={(e) => update('age', e.target.value)}
                    required
                  />
                </div>
              </div>

              <div className="dc-two-col">
                <div>
                  <label>Gender</label>
                  <select
                    value={form.gender}
                    onChange={(e) => update('gender', e.target.value)}
                    required
                  >
                    <option value="">Select one</option>
                    <option value="Woman">Woman</option>
                    <option value="Man">Man</option>
                    <option value="Non-binary">Non-binary</option>
                  </select>
                </div>

                <div>
                  <label>Looking for</label>
                  <select
                    value={form.looking_for}
                    onChange={(e) => update('looking_for', e.target.value)}
                  >
                    <option value="Women">Women</option>
                    <option value="Men">Men</option>
                    <option value="Everyone">Everyone</option>
                  </select>
                </div>
              </div>

              <label>Location</label>
              <input
                value={form.location}
                onChange={(e) => update('location', e.target.value)}
                placeholder="London"
              />

              <label>Bio</label>
              <textarea
                value={form.bio}
                onChange={(e) => update('bio', e.target.value)}
                placeholder="Funny, flirty, chaotic, iconic — your call."
              />

              <label>Mode</label>
              <div className="dc-button-row">
                <button
                  type="button"
                  className={`dc-btn ${
                    form.mode_preference === 'doppel' ? 'dc-btn-primary' : 'dc-btn-light'
                  }`}
                  onClick={() => update('mode_preference', 'doppel')}
                >
                  Doppel Mode
                </button>

                <button
                  type="button"
                  className={`dc-btn ${
                    form.mode_preference === 'chaos' ? 'dc-btn-primary' : 'dc-btn-light'
                  }`}
                  onClick={() => update('mode_preference', 'chaos')}
                >
                  Chaos Mode
                </button>
              </div>

              {error ? <div className="dc-error">{error}</div> : null}

              <button className="dc-btn dc-btn-primary" disabled={loading}>
                {loading ? 'Saving profile…' : 'Show me my matches'}
              </button>
            </form>
          </div>
        </div>
      </main>
    </RequireAuth>
  );
}