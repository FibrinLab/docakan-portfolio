export interface SocialLink {
  name: string;
  url: string;
  label: string;
}

// Update these with your actual social links
export const socialLinks: SocialLink[] = [
  {
    name: 'github',
    url: 'https://github.com/yourusername',
    label: 'GitHub',
  },
  {
    name: 'twitter',
    url: 'https://twitter.com/yourusername',
    label: 'Twitter',
  },
  {
    name: 'linkedin',
    url: 'https://linkedin.com/in/yourusername',
    label: 'LinkedIn',
  },
  // Add more as needed:
  // {
  //   name: 'email',
  //   url: 'mailto:your@email.com',
  //   label: 'Email',
  // },
];
