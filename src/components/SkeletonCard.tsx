export function SkeletonCard() {
  // W CSS ustawiliśmy aspect-ratio, więc wystarczy pusty div z klasą shimmer
  return (
    <div className='skeleton-card shimmer' aria-hidden='true'></div>
  );
}