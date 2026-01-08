import Link from "next/link";
import Image from "next/image";

export default function Header() {
  return (
    <header className="border-b border-black">
      <nav className="max-w-4xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="hover:no-underline">
            <Image
              src="/logo_akan.jpg"
              alt="doc akan"
              width={120}
              height={40}
              className="h-8 w-auto"
              priority
            />
          </Link>
          <div className="flex gap-6 text-sm">
            <Link href="/projects">Projects</Link>
            <Link href="/awards">Awards</Link>
            <Link href="/blog">Blog</Link>
            <Link href="/consulting">Consulting</Link>
            <Link href="/contact">Contact</Link>
          </div>
        </div>
      </nav>
    </header>
  );
}
