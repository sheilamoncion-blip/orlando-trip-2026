const SPARKLES = [
  { top: '6%', left: '12%', size: 14, delay: '0s' },
  { top: '15%', left: '82%', size: 10, delay: '0.6s' },
  { top: '28%', left: '45%', size: 8, delay: '1.4s' },
  { top: '38%', left: '90%', size: 12, delay: '2.1s' },
  { top: '52%', left: '6%', size: 10, delay: '0.9s' },
  { top: '64%', left: '70%', size: 14, delay: '1.8s' },
  { top: '76%', left: '25%', size: 9, delay: '0.3s' },
  { top: '88%', left: '55%', size: 11, delay: '2.6s' },
  { top: '95%', left: '85%', size: 8, delay: '1.1s' },
  { top: '20%', left: '20%', size: 7, delay: '2.9s' },
];

function Star({ size }: { size: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 0 L14.5 9.5 L24 12 L14.5 14.5 L12 24 L9.5 14.5 L0 12 L9.5 9.5 Z" />
    </svg>
  );
}

export default function SparkleField() {
  return (
    <div className="sparkle-field" aria-hidden="true">
      {SPARKLES.map((s, i) => (
        <span key={i} className="sparkle" style={{ top: s.top, left: s.left, animationDelay: s.delay }}>
          <Star size={s.size} />
        </span>
      ))}
    </div>
  );
}
