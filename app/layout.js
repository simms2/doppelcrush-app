import './globals.css';

export const metadata = {
  title: 'DoppelCrush',
  description: 'Playful selfie matching app starter built with Next.js and Supabase.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
