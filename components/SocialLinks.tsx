import { socialLinks } from '@/lib/social';

export default function SocialLinks() {
  if (socialLinks.length === 0) {
    return null;
  }

  return (
    <div className="flex flex-wrap gap-4 text-sm font-mono">
      {socialLinks.map((link) => (
        <a
          key={link.name}
          href={link.url}
          target="_blank"
          rel="noopener noreferrer"
          className="underline decoration-1 underline-offset-2 hover:no-underline transition-all"
        >
          {link.label}
        </a>
      ))}
    </div>
  );
}
