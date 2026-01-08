'use client';

import { getProjects } from '@/lib/projects';
import ProjectCard from './ProjectCard';
import { useState } from 'react';

export default function ProjectsSection() {
  const projects = getProjects();
  const [filter, setFilter] = useState<'all' | 'built' | 'contributed'>('all');

  if (projects.length === 0) {
    return (
      <section className="border-t border-black pt-16 mt-16">
        <h2 className="text-3xl font-semibold mb-8">Projects</h2>
        <p className="text-base text-black/60 font-mono">
          {'>'} Projects will appear here. Add them in /lib/projects.ts
        </p>
      </section>
    );
  }

  const filteredProjects = filter === 'all' 
    ? projects 
    : projects.filter(p => p.type === filter);

  return (
    <section id="projects" className="border-t border-black pt-16 mt-16">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
        <h2 className="text-3xl font-semibold mb-4 md:mb-0">Projects</h2>
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
      
      <div className="space-y-0">
        {filteredProjects.map((project, index) => (
          <ProjectCard key={project.id} project={project} index={index} />
        ))}
      </div>
      
      {filteredProjects.length === 0 && (
        <p className="text-base text-black/60 font-mono py-8">
          {'>'} No projects found for this filter.
        </p>
      )}
    </section>
  );
}
