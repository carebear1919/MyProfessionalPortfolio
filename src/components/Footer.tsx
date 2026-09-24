interface FooterProps {
  scrollToSection: (id: string) => void;
}

const links = [
  { label: 'Home', id: 'home' },
  { label: 'Work', id: 'projects' },
  { label: 'Quality', id: 'qa' },
  { label: 'About', id: 'about' },
  { label: 'Services', id: 'services' },
  { label: 'Contact', id: 'contact' },
];

export default function Footer({ scrollToSection }: FooterProps) {
  return (
    <footer className="py-14 px-6 sm:px-10 lg:px-16 border-t border-neutral-300 bg-editorial-cream text-left">
      <div className="max-w-[1440px] mx-auto grid grid-cols-1 md:grid-cols-12 gap-10 items-start">
        <div className="md:col-span-6 space-y-2">
          <p className="font-serif font-semibold text-2xl text-editorial-charcoal">Jian Marie Hilario</p>
          <p className="text-base text-neutral-600 max-w-sm leading-relaxed">
            Full-stack developer, quality analyst and UI/UX designer based in Cavite, Philippines.
          </p>
        </div>

        <nav aria-label="Footer" className="md:col-span-6 md:justify-self-end">
          <ul className="flex flex-wrap gap-x-6 gap-y-1 font-mono text-xs font-bold uppercase tracking-wider text-neutral-600">
            {links.map((link) => (
              <li key={link.id}>
                <button
                  onClick={() => scrollToSection(link.id)}
                  className="min-h-[44px] min-w-[44px] hover:text-editorial-charcoal transition-colors cursor-pointer"
                >
                  {link.label}
                </button>
              </li>
            ))}
          </ul>
        </nav>

        <div className="md:col-span-12 pt-6 border-t border-neutral-300 flex flex-wrap items-center justify-between gap-x-6 gap-y-1 font-mono text-xs text-neutral-600">
          <p>&copy; 2026 Jian Marie Hilario. Built with React and Tailwind CSS.</p>
          <button
            onClick={() => window.dispatchEvent(new CustomEvent('toggleTestMode', { detail: true }))}
            className="min-h-[44px] font-bold uppercase tracking-wider underline underline-offset-4 hover:text-editorial-charcoal cursor-pointer"
          >
            Test this page
          </button>
        </div>
      </div>
    </footer>
  );
}
