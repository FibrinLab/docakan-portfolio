'use client';

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="border-b border-black">
      <nav className="max-w-4xl mx-auto px-4 sm:px-6 py-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="hover:no-underline">
            <Image
              src="/logo_akan.jpg"
              alt="doc akan"
              width={120}
              height={40}
              className="h-6 sm:h-8 w-auto"
              priority
            />
          </Link>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex gap-4 lg:gap-6 text-sm">
            <Link href="/projects">Projects</Link>
            <Link href="/awards">Awards</Link>
            <Link href="/blog">Blog</Link>
            <Link href="/consulting">Consulting</Link>
            <Link href="/contact">Contact</Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden border border-black px-3 py-1.5 text-xs font-mono"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? 'CLOSE' : 'MENU'}
          </button>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden mt-4 pb-4 border-t border-black pt-4">
            <div className="flex flex-col gap-3 text-sm">
              <Link 
                href="/projects" 
                onClick={() => setMobileMenuOpen(false)}
                className="py-1"
              >
                Projects
              </Link>
              <Link 
                href="/awards" 
                onClick={() => setMobileMenuOpen(false)}
                className="py-1"
              >
                Awards
              </Link>
              <Link 
                href="/blog" 
                onClick={() => setMobileMenuOpen(false)}
                className="py-1"
              >
                Blog
              </Link>
              <Link 
                href="/consulting" 
                onClick={() => setMobileMenuOpen(false)}
                className="py-1"
              >
                Consulting
              </Link>
              <Link 
                href="/contact" 
                onClick={() => setMobileMenuOpen(false)}
                className="py-1"
              >
                Contact
              </Link>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
