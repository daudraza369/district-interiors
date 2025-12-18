import { redirect } from 'next/navigation';

// Redirect root page to /interiors
export default function HomePage() {
  redirect('/interiors');
}

