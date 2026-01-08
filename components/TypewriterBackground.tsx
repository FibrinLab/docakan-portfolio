'use client';

import { useEffect, useState } from 'react';

interface CharData {
  char: string;
  left: number;
  top: number;
  duration: number;
  delay: number;
}

export default function TypewriterBackground() {
  const [chars, setChars] = useState<CharData[]>([]);

  useEffect(() => {
    // Generate random characters only on client
    const newChars: CharData[] = Array.from({ length: 30 }).map(() => ({
      char: String.fromCharCode(0x0020 + Math.floor(Math.random() * 95)),
      left: Math.random() * 100,
      top: Math.random() * 100,
      duration: 15 + Math.random() * 10,
      delay: Math.random() * 5,
    }));
    setChars(newChars);
  }, []);

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
      {/* Subtle grid pattern like typewriter paper */}
      <div 
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `
            linear-gradient(to right, black 1px, transparent 1px),
            linear-gradient(to bottom, black 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px',
          animation: 'gridMove 20s linear infinite',
        }}
      />
      
      {/* Subtle typing characters animation */}
      <div className="absolute inset-0 opacity-[0.015]">
        {chars.map((charData, i) => (
          <div
            key={i}
            className="absolute font-mono text-xs"
            style={{
              left: `${charData.left}%`,
              top: `${charData.top}%`,
              animation: `typeFade ${charData.duration}s ease-in-out infinite`,
              animationDelay: `${charData.delay}s`,
            }}
          >
            {charData.char}
          </div>
        ))}
      </div>
    </div>
  );
}
