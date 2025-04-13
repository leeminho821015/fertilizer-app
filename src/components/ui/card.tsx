export function Card({ children }: { children: React.ReactNode }) {
  return <div style={{ border: '1px solid #ccc', borderRadius: '8px', padding: '16px', marginTop: '12px' }}>{children}</div>
}

export function CardContent({ children }: { children: React.ReactNode }) {
  return <div>{children}</div>
}
