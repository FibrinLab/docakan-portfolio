'use client';

import { Project } from '@/lib/projects';
import { useState } from 'react';

interface ProjectCardProps {
  project: Project;
  index: number;
}

export default function ProjectCard({ project, index }: ProjectCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  const typeLabel = {
    built: '[BUILT]',
    contributed: '[CONTRIBUTED]',
    led: '[LED]',
  };
  
  // Don't show LED label
  const displayLabel = project.type === 'led' ? '[BUILT]' : typeLabel[project.type];

  return (
    <div
      className="border-b border-black py-6 group cursor-pointer transition-all"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
        <div className="flex-1">
          <div className="flex items-start gap-3 mb-2">
            <span className="text-xs font-mono text-black/50 mt-1">
              {String(index + 1).padStart(2, '0')}
            </span>
            <div className="flex-1">
              <div className="flex items-baseline gap-2 flex-wrap">
                <h3 className="text-xl font-semibold">{project.title}</h3>
                <span className="text-xs font-mono text-black/60">
                  {displayLabel}
                </span>
                {project.status && (
                  <span className="text-xs font-mono text-black/40">
                    [{project.status.toUpperCase()}]
                  </span>
                )}
              </div>
              <p className="text-base leading-relaxed mt-2 text-black/80">
                {project.description}
              </p>
            </div>
          </div>
          
          <div className="ml-8 mt-3 flex flex-wrap gap-2">
            {project.tech.map((tech, i) => (
              <span
                key={i}
                className="text-xs font-mono text-black/50 border border-black/20 px-2 py-0.5"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
        
        <div className="md:ml-4 flex flex-col items-start md:items-end gap-2 text-sm">
          <span className="text-xs font-mono text-black/50">{project.year}</span>
          <div className="flex gap-3">
            {project.url && (
              <a
                href={project.url}
                target="_blank"
                rel="noopener noreferrer"
                className="underline decoration-1 underline-offset-2 hover:no-underline text-xs"
                onClick={(e) => e.stopPropagation()}
              >
                visit
              </a>
            )}
            {project.github && (
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="underline decoration-1 underline-offset-2 hover:no-underline text-xs"
                onClick={(e) => e.stopPropagation()}
              >
                code
              </a>
            )}
          </div>
        </div>
      </div>
      
      {isHovered && (
        <div className="mt-3 ml-8 text-xs font-mono text-black/40 animate-pulse">
          {'>'} {project.type === 'built' || project.type === 'led' ? 'Built from scratch' : 'Open source contribution'}
        </div>
      )}
    </div>
  );
}
