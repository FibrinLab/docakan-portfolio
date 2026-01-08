import Link from "next/link";

export default function Contact() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 sm:py-12 md:py-16">
      <h1 className="text-3xl sm:text-4xl font-semibold mb-8 sm:mb-12">Contact</h1>
      
      <div className="space-y-4 sm:space-y-6 text-base sm:text-lg leading-relaxed max-w-2xl">
        <p>
          I'm available for consulting engagements, speaking opportunities, and 
          collaborative projects. If you have a question or would like to discuss 
          working together, please reach out.
        </p>
        
        <p>
          Email: <a href="mailto:0xchromatin@proton.me">0xchromatin@proton.me</a>
        </p>
        
        <p className="text-base pt-8">
          I typically respond within a few days. For consulting inquiries, please 
          include a brief description of your project or question.
        </p>
      </div>
    </div>
  );
}
