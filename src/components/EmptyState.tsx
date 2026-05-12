export function EmptyState() {
  return (
    <div className='empty-state'>
      <div style={{ fontSize: '3rem', marginBottom: '15px' }}>🔍</div>
      <h2>Brak wyników</h2>
      <p>Nie znaleziono filmów spełniających Twoje kryteria.</p>
    </div>
  );
}