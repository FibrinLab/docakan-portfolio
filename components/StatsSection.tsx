'use client';

import { useEffect, useState } from 'react';

interface Stat {
  label: string;
  value: string;
  suffix?: string;
}

const stats: Stat[] = [
  { label: 'Projects Built', value: '0', suffix: '+' },
  { label: 'Open Source Contributions', value: '0' },
  { label: 'Years in Healthcare Tech', value: '0', suffix: '+' },
];

export default function StatsSection() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <section className="border-t border-black pt-16 mt-16">
      <h2 className="text-3xl font-semibold mb-8">Stats</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {stats.map((stat, i) => (
          <div key={i} className="border-l-2 border-black pl-4">
            <div className="text-3xl font-semibold font-mono mb-1">
              {stat.value}
              {stat.suffix && <span className="text-lg">{stat.suffix}</span>}
            </div>
            <div className="text-sm text-black/70 font-mono">
              {stat.label}
            </div>
          </div>
        ))}
      </div>
      
      <p className="text-xs font-mono text-black/40 mt-6">
        {'>'} Update these in /components/StatsSection.tsx
      </p>
    </section>
  );
}
