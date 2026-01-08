import SocialLinks from './SocialLinks';

export default function Footer() {
  return (
    <footer className="border-t border-black mt-auto">
      <div className="max-w-4xl mx-auto px-6 py-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <p className="text-sm">© {new Date().getFullYear()} doc akan</p>
          <SocialLinks />
        </div>
      </div>
    </footer>
  );
}
