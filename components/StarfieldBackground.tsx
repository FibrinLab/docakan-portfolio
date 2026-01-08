'use client';

import { useEffect, useState } from 'react';

interface Star {
  x: number;
  y: number;
  size: number;
  speed: number;
  opacity: number;
  z: number; // depth for 3D effect
}

export default function StarfieldBackground() {
  const [stars, setStars] = useState<Star[]>([]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    // Create multiple layers of stars for depth
    const newStars: Star[] = Array.from({ length: 150 }).map(() => {
      const z = Math.random() * 1000;
      return {
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 1.5 + 0.3,
        speed: Math.random() * 0.3 + 0.05,
        opacity: Math.random() * 0.6 + 0.1,
        z: z,
      };
    });
    setStars(newStars);
  }, []);

  if (!mounted) return null;

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
      {/* Multiple star layers for depth effect */}
      {stars.map((star, i) => {
        const scale = 1 + (star.z / 1000) * 2;
        const speed = star.speed * (1 + star.z / 1000);
        
        return (
          <div
            key={i}
            className="absolute rounded-full bg-black"
            style={{
              left: `${star.x}%`,
              top: `${star.y}%`,
              width: `${star.size * scale}px`,
              height: `${star.size * scale}px`,
              opacity: star.opacity,
              transform: `scale(${scale})`,
              animation: `starMove ${20 / speed}s linear infinite`,
              animationDelay: `${Math.random() * 10}s`,
              boxShadow: `0 0 ${star.size * 3}px rgba(0, 0, 0, ${star.opacity})`,
            }}
          />
        );
      })}
      
      {/* Subtle grid overlay for typewriter aesthetic */}
      <div 
        className="absolute inset-0 opacity-[0.015]"
        style={{
          backgroundImage: `
            linear-gradient(to right, black 1px, transparent 1px),
            linear-gradient(to bottom, black 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px',
          animation: 'gridMove 40s linear infinite',
        }}
      />
      
      <style jsx>{`
        @keyframes starMove {
          0% {
            transform: translate(0, 0) scale(1);
            opacity: 0.1;
          }
          25% {
            opacity: 0.8;
          }
          50% {
            transform: translate(30px, 30px) scale(1.2);
            opacity: 1;
          }
          75% {
            opacity: 0.8;
          }
          100% {
            transform: translate(60px, 60px) scale(1);
            opacity: 0.1;
          }
        }
        
        @keyframes gridMove {
          0% {
            transform: translate(0, 0);
          }
          100% {
            transform: translate(60px, 60px);
          }
        }
      `}</style>
    </div>
  );
}
