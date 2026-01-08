'use client';

import { useState, useEffect } from 'react';

const techCategories = {
  'Languages': ['TypeScript', 'Python', 'JavaScript', 'SQL', 'R'],
  'Frontend': ['React', 'Next.js', 'Tailwind CSS', 'TypeScript'],
  'Backend': ['Node.js', 'FastAPI', 'PostgreSQL', 'Redis'],
  'Tools': ['Git', 'Docker', 'AWS', 'CI/CD'],
  'Healthcare': ['HL7', 'FHIR', 'Clinical Systems', 'EHR Integration'],
};

export default function TechStack() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  return (
    <section className="border-t border-black pt-16 mt-16">
      <h2 className="text-3xl font-semibold mb-8">Tech Stack</h2>
      
      <div className="space-y-6">
        {Object.entries(techCategories).map(([category, items]) => (
          <div key={category} className="border-l-2 border-black pl-4">
            <button
              onClick={() => setSelectedCategory(selectedCategory === category ? null : category)}
              className="text-lg font-semibold mb-2 hover:underline cursor-pointer flex items-center gap-2"
            >
              <span className="font-mono text-xs text-black/50">
                {selectedCategory === category ? '[-]' : '[+]'}
              </span>
              {category}
            </button>
            {(selectedCategory === category || selectedCategory === null) && (
              <div className="ml-6 flex flex-wrap gap-2 mt-2">
                {items.map((item, i) => (
                  <span
                    key={i}
                    className="text-sm font-mono text-black/70 border border-black/20 px-2 py-1"
                  >
                    {item}
                  </span>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
