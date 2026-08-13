export function AlertBanner({ message, onDismiss }) {
  if (!message) return null;

  return (
    <div className="alert-banner">
      <span>{message}</span>
      {onDismiss && (
        <button className="btn-ghost" onClick={onDismiss} aria-label="Dismiss">✕</button>
      )}
    </div>
  );
}