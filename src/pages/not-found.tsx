import { Link } from 'wouter';

export default function NotFound() {
  return (
    <div
      className="min-h-screen w-full flex items-center justify-center p-6"
      style={{ background: 'var(--paper)' }}
    >
      <div className="w-full max-w-md text-center">
        <div className="eyebrow" style={{ justifyContent: 'center' }}>
          404
        </div>
        <h1
          className="display"
          style={{
            color: 'var(--navy)',
            fontSize: 'clamp(34px, 6vw, 48px)',
            fontWeight: 500,
            lineHeight: 1.1,
            margin: '18px 0 14px',
          }}
        >
          Page not found
        </h1>
        <p style={{ color: '#697386', fontSize: 14, lineHeight: 1.8, margin: '0 0 26px' }}>
          The page you are looking for does not exist or may have moved.
        </p>
        <Link href="/" className="button button-gold">
          Back to Vao Cornerstone
        </Link>
      </div>
    </div>
  );
}
