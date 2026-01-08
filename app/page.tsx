import Link from "next/link";
import Image from "next/image";
import GitHubHeatmap from "@/components/GitHubHeatmap";
import SocialLinks from "@/components/SocialLinks";

export default function Home() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-16">
      <div className="mb-4">
        <Image
          src="/logo_akan.jpg"
          alt="doc akan"
          width={300}
          height={100}
          className="h-16 md:h-20 w-auto"
          priority
        />
      </div>
      <p className="text-xl font-mono mb-8 text-black/70">
        akanimoh osutuk — Paediatric Resident
      </p>
      
      <div className="space-y-6 text-lg leading-relaxed max-w-2xl">
        <p>
          I work at the intersection of clinical medicine and technology, with a 
          focus on building and advising on systems used in real healthcare settings.
        </p>
        
        <p>
          My work spans paediatrics and neonatology, digital health innovation, and 
          clinical education, alongside technical and strategic consulting for teams 
          navigating clinical, regulatory, and operational complexity. I am particularly 
          interested in how modern software, AI, and data systems can be responsibly 
          integrated into frontline care, education, and clinical decision-making.
        </p>
        
        <p>
          Currently, I focus on:
        </p>
        
        <ul className="list-none space-y-2 ml-4">
          <li>• Healthcare systems design grounded in real clinical workflows</li>
          <li>• AI-enabled clinical decision support and digital health infrastructure</li>
          <li>• Technical and strategic consulting for healthcare organisations and startups</li>
          <li>• Education and training in clinical informatics and systems thinking</li>
        </ul>
        
        <div className="pt-8 space-y-2 text-base">
          <p>
            <Link href="/projects">View my projects</Link>, <Link href="/blog">read my writing</Link>, or learn more about{" "}
            <Link href="/consulting">consulting services</Link>.
          </p>
          <p>
            To discuss a project, <Link href="/contact">get in touch</Link>.
          </p>
        </div>
      </div>
      
      <div className="mt-12">
        <SocialLinks />
      </div>
      
      <GitHubHeatmap />
    </div>
  );
}
