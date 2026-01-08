import { getAwards } from '@/lib/awards';

export default function AwardsSection() {
  const awards = getAwards();

  if (awards.length === 0) {
    return null;
  }

  return (
    <section className="border-t border-black pt-16 mt-16">
      <h2 className="text-3xl font-semibold mb-8">Awards & Recognition</h2>
      
      <div className="space-y-0">
        {awards.map((award, index) => (
          <div
            key={award.id}
            className="border-b border-black py-6 last:border-0"
          >
            <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
              <div className="flex-1">
                <div className="flex items-start gap-3 mb-2">
                  <span className="text-xs font-mono text-black/50 mt-1">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <div className="flex-1">
                    <div className="flex items-baseline gap-2 flex-wrap">
                      <h3 className="text-xl font-semibold">{award.title}</h3>
                    </div>
                    <p className="text-base font-semibold mt-1 text-black/80">
                      {award.event}
                    </p>
                    {award.description && (
                      <p className="text-base leading-relaxed mt-2 text-black/70">
                        {award.description}
                      </p>
                    )}
                  </div>
                </div>
              </div>
              
              <div className="md:ml-4 flex flex-col items-start md:items-end gap-2 text-sm">
                <span className="text-xs font-mono text-black/50">{award.year}</span>
                {award.url && (
                  <a
                    href={award.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline decoration-1 underline-offset-2 hover:no-underline text-xs"
                  >
                    details
                  </a>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
