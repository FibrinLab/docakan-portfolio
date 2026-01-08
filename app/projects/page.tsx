'use client';

import { getProjects } from '@/lib/projects';
import ProjectCard from '@/components/ProjectCard';
import { useState } from 'react';

export default function Projects() {
  const projects = getProjects();
  const [filter, setFilter] = useState<'all' | 'built' | 'contributed'>('all');

  const filteredProjects = filter === 'all' 
    ? projects 
    : projects.filter(p => p.type === filter);

  return (
    <div className="max-w-4xl mx-auto px-6 py-16">
      <h1 className="text-4xl font-semibold mb-12">Projects</h1>
      
      <div className="mb-8">
        <p className="text-base text-black/70 mb-4 max-w-2xl">
          A selection of projects I've built or contributed to. Each represents 
          work at the intersection of healthcare, technology, and clinical practice.
        </p>
        <div className="flex gap-2 text-xs font-mono">
          <button
            onClick={() => setFilter('all')}
            className={`px-3 py-1 border border-black transition-all ${
              filter === 'all' ? 'bg-black text-white' : 'hover:bg-black/5'
            }`}
          >
            ALL
          </button>
          <button
            onClick={() => setFilter('built')}
            className={`px-3 py-1 border border-black transition-all ${
              filter === 'built' ? 'bg-black text-white' : 'hover:bg-black/5'
            }`}
          >
            BUILT
          </button>
          <button
            onClick={() => setFilter('contributed')}
            className={`px-3 py-1 border border-black transition-all ${
              filter === 'contributed' ? 'bg-black text-white' : 'hover:bg-black/5'
            }`}
          >
            CONTRIB
          </button>
        </div>
      </div>
      
      {projects.length === 0 ? (
        <div className="border-t border-black pt-8">
          <p className="text-base text-black/60 font-mono">
            {'>'} Projects will appear here. Add them in /lib/projects.ts
          </p>
        </div>
      ) : (
        <div className="space-y-0 border-t border-black pt-8">
          {filteredProjects.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>
      )}
      
      {filteredProjects.length === 0 && projects.length > 0 && (
        <p className="text-base text-black/60 font-mono py-8">
          {'>'} No projects found for this filter.
        </p>
      )}
    </div>
  );
}
