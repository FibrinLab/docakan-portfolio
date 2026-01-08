'use client';

import { useEffect, useState } from 'react';

interface Contribution {
  date: string;
  count: number;
  color: string;
}

export default function GitHubHeatmap() {
  const [contributions, setContributions] = useState<Contribution[]>([]);
  const [loading, setLoading] = useState(true);
  const [total, setTotal] = useState(0);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch('/api/github/contributions')
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          setError(data.error);
        } else if (data.contributions && data.contributions.length > 0) {
          setContributions(data.contributions);
          setTotal(data.total || 0);
        } else {
          setError('No contribution data available');
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error('Error fetching contributions:', err);
        setError('Failed to load contributions');
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="border-t border-black pt-8 mt-8">
        <p className="text-sm font-mono text-black/60">Loading contributions...</p>
      </div>
    );
  }

  if (error || contributions.length === 0) {
    return (
      <div className="border-t border-black pt-8 mt-8">
        <h2 className="text-xl font-semibold mb-2">GitHub Contributions</h2>
        <p className="text-sm font-mono text-black/60">
          {error || 'No contributions data available. Make sure GITHUB_USERNAME is set in .env'}
        </p>
      </div>
    );
  }

  // Get the last 365 days
  const recentContributions = contributions.slice(-365);
  const maxCount = Math.max(...recentContributions.map((c) => c.count), 1);

  // Group into weeks (7 days each)
  const weeks: Contribution[][] = [];
  for (let i = 0; i < recentContributions.length; i += 7) {
    weeks.push(recentContributions.slice(i, i + 7));
  }

  const getIntensity = (count: number) => {
    if (count === 0) return 'bg-white border border-black/10';
    const intensity = Math.min(count / maxCount, 1);
    if (intensity < 0.2) return 'bg-black/20';
    if (intensity < 0.4) return 'bg-black/40';
    if (intensity < 0.6) return 'bg-black/60';
    if (intensity < 0.8) return 'bg-black/80';
    return 'bg-black';
  };

  return (
    <div className="border-t border-black pt-6 sm:pt-8 mt-6 sm:mt-8">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-0 mb-4">
        <h2 className="text-lg sm:text-xl font-semibold">GitHub Contributions</h2>
        {total > 0 && (
          <p className="text-xs sm:text-sm font-mono text-black/60">
            {total.toLocaleString()} contributions in the last year
          </p>
        )}
      </div>
      
      <div className="overflow-x-auto">
        <div className="flex gap-1" style={{ minWidth: 'max-content' }}>
          {weeks.map((week, weekIndex) => (
            <div key={weekIndex} className="flex flex-col gap-1">
              {week.map((day, dayIndex) => (
                <div
                  key={`${day.date}-${dayIndex}`}
                  className={`w-3 h-3 ${getIntensity(day.count)}`}
                  title={`${day.date}: ${day.count} contributions`}
                />
              ))}
            </div>
          ))}
        </div>
      </div>
      
      <div className="flex items-center justify-between mt-4 text-xs font-mono text-black/50">
        <span>Less</span>
        <div className="flex gap-1">
          <div className="w-3 h-3 bg-black/20" />
          <div className="w-3 h-3 bg-black/40" />
          <div className="w-3 h-3 bg-black/60" />
          <div className="w-3 h-3 bg-black/80" />
          <div className="w-3 h-3 bg-black" />
        </div>
        <span>More</span>
      </div>
    </div>
  );
}
