import Link from 'next/link';

export default function Navbar() {
  return (
    <nav style={{
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '1.5rem 0',
      marginBottom: '2rem',
      borderBottom: '1px solid var(--border)'
    }}>
      <Link href="/" style={{ textDecoration: 'none' }}>
        <h2 style={{ margin: 0, fontSize: '1.8rem', fontWeight: 'bold' }}>VedaAI</h2>
      </Link>
      <div style={{ display: 'flex', gap: '1.5rem' }}>
        <Link href="/" style={{ color: 'var(--text-muted)', textDecoration: 'none' }}>Dashboard</Link>
        <Link href="/create" className="btn-primary" style={{ textDecoration: 'none' }}>Create New</Link>
      </div>
    </nav>
  );
}
