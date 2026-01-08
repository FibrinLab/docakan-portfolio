export interface Project {
  id: string;
  title: string;
  description: string;
  tech: string[];
  year: string;
  type: 'built' | 'contributed' | 'led';
  url?: string;
  github?: string;
  status?: 'active' | 'archived' | 'completed';
}

export const projects: Project[] = [
  {
    id: 'byte-teaching',
    title: 'Byte Teaching Dashboard',
    description: 'Teaching management web application for NHS trainees with multi-tenancy, role-based access, evidence-based attendance tracking, and PDF certificate generation.',
    tech: ['TypeScript', 'Next.js', 'Tailwind CSS', 'Supabase', 'PostgreSQL', 'React PDF'],
    year: '2024',
    type: 'built',
    github: 'https://github.com/Byte-Teaching/dashboard',
    status: 'active',
  },
  {
    id: 'ubiquity-dollar',
    title: 'Ubiquity Dollar',
    description: 'Algorithmic stablecoin DeFi protocol. Contributed by building the bonding curve smart contract (BondingV2) for the protocol\'s token economics.',
    tech: ['Solidity', 'TypeScript', 'Foundry', 'Web3', 'DeFi', 'Ethereum'],
    year: '2024',
    type: 'contributed',
    url: 'https://uad.ubq.fi',
    github: 'https://github.com/ubiquity/ubiquity-dollar',
    status: 'active',
  },
  {
    id: 'game-of-life',
    title: 'Game of Life',
    description: 'Interactive Conway\'s Game of Life simulation implemented with p5.js. A cellular automaton that demonstrates complex patterns emerging from simple rules.',
    tech: ['TypeScript', 'JavaScript', 'p5.js', 'CSS'],
    year: '2024',
    type: 'built',
    url: 'https://grand-squirrel-2757eb.netlify.app/',
    github: 'https://github.com/FibrinLab/Game-of-Life',
    status: 'active',
  },
];

export function getProjects(): Project[] {
  return projects.sort((a, b) => {
    // Sort by year (newest first), then by type
    const yearCompare = b.year.localeCompare(a.year);
    if (yearCompare !== 0) return yearCompare;
    
    const typeOrder = { built: 0, contributed: 1, led: 2 };
    return typeOrder[a.type] - typeOrder[b.type];
  });
}

export function getProjectsByType(type: Project['type']): Project[] {
  return getProjects().filter(p => p.type === type);
}
