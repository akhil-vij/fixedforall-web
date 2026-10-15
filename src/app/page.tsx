import { hero } from '@/content/home';

// Scaffold only: the sections from the design are built in their own issues.
export default function HomePage() {
  return (
    <>
      <h1>{hero.headline}</h1>
      <p>{hero.subheadline}</p>
    </>
  );
}
