import Link from "next/link";

export default function Consulting() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-16">
      <h1 className="text-4xl font-semibold mb-12">Consulting</h1>
      
      <div className="space-y-8 text-lg leading-relaxed max-w-2xl">
        <section>
          <h2 className="text-2xl font-semibold mb-4">What I Help With</h2>
          <p className="mb-4">
            I provide strategic and technical guidance to healthcare organizations, 
            technology companies, and educational institutions. My work centers on 
            translating complex clinical and technical requirements into actionable 
            solutions.
          </p>
          <p>
            Areas include: digital health product development, AI implementation 
            in clinical settings, healthcare data systems, clinical workflow 
            optimization, and technical training for healthcare teams.
          </p>
        </section>
        
        <section>
          <h2 className="text-2xl font-semibold mb-4">Who This Is For</h2>
          <p className="mb-4">
            Healthcare systems and hospitals looking to implement new technologies 
            or improve existing processes. Digital health startups needing clinical 
            expertise and technical validation. Academic institutions developing 
            healthcare informatics programs. Technology companies building products 
            for healthcare markets.
          </p>
        </section>
        
        <section>
          <h2 className="text-2xl font-semibold mb-4">How I Work</h2>
          <p className="mb-4">
            I start by understanding your specific context: your organization's 
            constraints, technical capabilities, and clinical workflows. From there, 
            I provide clear, practical recommendations grounded in both clinical 
            practice and technical feasibility.
          </p>
          <p>
            My approach is collaborative and direct. I prefer working with teams 
            who value clarity over complexity, and who are willing to question 
            assumptions. I document decisions and rationale, ensuring knowledge 
            transfer throughout the engagement.
          </p>
        </section>
        
        <section>
          <h2 className="text-2xl font-semibold mb-4">Engagement Style</h2>
          <p className="mb-4">
            I work in several formats depending on your needs:
          </p>
          <ul className="list-none space-y-2 ml-4 mb-4">
            <li>• Short-term advisory: focused sessions on specific challenges</li>
            <li>• Project-based consulting: end-to-end support for defined initiatives</li>
            <li>• Ongoing advisory: regular check-ins for strategic guidance</li>
            <li>• Training and workshops: technical education for clinical and technical teams</li>
          </ul>
          <p>
            Most engagements range from a few weeks to several months. I prefer 
            clear scopes and defined outcomes, but remain flexible to adapt as 
            projects evolve.
          </p>
        </section>
        
        <section className="pt-8 border-t border-black">
          <p className="mb-4">
            If you're interested in working together, please{" "}
            <Link href="/contact">reach out</Link> with a brief description of 
            your project or question. I respond to all inquiries within a few days.
          </p>
        </section>
      </div>
    </div>
  );
}
