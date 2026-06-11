# DoppelCrush production starter

This is the next phase after the public demo site.

It is a **real Next.js + Supabase starter** for:
- sign up / login
- onboarding
- selfie upload
- profile setup
- discover feed
- likes / passes
- mutual matches
- chat
- settings

## What is real already
- real user auth through Supabase
- real profile records in a shared database
- real selfie uploads to Supabase Storage
- real swipe records
- real mutual match creation
- real messages stored in the database

## What is still a starter
The lookalike scoring is still a lightweight placeholder.

The app currently creates a stable match score from profile data and ids so the app works end to end, but it does **not yet** generate face embeddings.

That face-matching step can be added later with an Edge Function or a server-side image pipeline.

## Quick setup

### 1. Create a Supabase project
Create a new project in Supabase.

### 2. Get your env values
From Supabase project settings, copy:
- Project URL
- anon public key

Create a `.env.local` file from `.env.example`.

### 3. Run the database SQL
Open the Supabase SQL editor and run:

`supabase/schema.sql`

That creates:
- profiles
- swipes
- matches
- messages
- storage bucket `selfies`
- row-level security policies

### 4. Auth settings
For the easiest MVP setup, go to Supabase Auth settings and temporarily turn off email confirmation.

That makes signup much easier while you are building.

### 5. Install and run locally
```bash
npm install
npm run dev
```

### 6. Deploy free
Deploy this repo to Vercel.

Add these environment variables in Vercel:
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`

## Suggested build order after this
1. Get auth + onboarding live
2. Test multi-user signup and chat
3. Add better discover filters
4. Add block/report tools
5. Replace placeholder scoring with real facial matching

## Important
Do not put service-role keys or secrets into a public repo.
Only the anon public key belongs in the browser.
