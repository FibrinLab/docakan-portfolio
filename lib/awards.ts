export interface Award {
  id: string;
  title: string;
  event: string;
  year: string;
  description?: string;
  prize?: string;
  url?: string;
}

export const awards: Award[] = [
  {
    id: 'moveathon-2025',
    title: 'Team Prize Winner',
    event: 'Moveathon 2025 - Europe Edition',
    year: '2024',
    description: 'Team Anima - Open Novice Track winner',
    prize: '',
  },
  {
    id: 'swell-city-buildathon',
    title: 'Winner',
    event: 'Swell City Buildathon',
    year: '2024',
    description: 'DeFi and restaking ecosystem contribution',
    prize: '',
  },
  {
    id: 'cartesi-hackathon',
    title: '1st Place',
    event: 'Cartesi Online Global Hackathon',
    year: '2023',
    description: 'Immunify Health - Healthcare project built with Cartesi',
    prize: '$5,000',
  },
  {
    id: 'avalanche-subnet-contest',
    title: 'Winner',
    event: 'Avalanche Subnet Tutorial Contest',
    year: '2022',
    description: 'Wildcard category: creative subnet implementation with The Graph indexing',
    prize: '$2,000',
    url: 'https://github.com/FibrinLab/Avalanche-Subnet-The-Graph-Index',
  },
];

export function getAwards(): Award[] {
  return awards.sort((a, b) => {
    // Sort by year (newest first)
    return b.year.localeCompare(a.year);
  });
}
