interface Props {
  message: string;
  onRetry: () => void;
}

export function ErrorBanner({ message, onRetry }: Props) {
  return (
    <div className='error-banner'>
      <h3>⚠️ Błąd połączenia</h3>
      <p style={{ opacity: 0.8, fontSize: '0.9rem' }}>{message}</p>
      <button className='retry-btn' onClick={onRetry}>
        Spróbuj ponownie
      </button>
    </div>
  );
}