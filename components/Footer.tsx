import SocialLinks from './SocialLinks';

export default function Footer() {
  return (
    <footer className="border-t border-black mt-auto">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-4 sm:py-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4">
          <p className="text-xs sm:text-sm">© {new Date().getFullYear()} doc akan</p>
          <SocialLinks />
        </div>
      </div>
    </footer>
  );
}
