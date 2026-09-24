const items = [
  { label: 'SM Investments', sub: 'Treasury Automation Intern' },
  { label: 'DOST Merit Scholar', sub: 'Dept. of Science & Technology' },
  { label: 'Executive of the Month', sub: 'CSO — DLSU-D' },
  { label: 'Best Executive Committee', sub: 'Council of Student Organizations' },
];

export default function Recognition() {
  return (
    <section className="bg-editorial-panel border-b border-neutral-400/60 text-left">
      <div className="px-6 sm:px-10 lg:px-16">
      <div className="max-w-[1440px] mx-auto grid grid-cols-1 lg:grid-cols-12">
      <div className="lg:col-span-3 lg:border-r border-neutral-400/60 lg:pr-10 py-10 flex flex-col justify-center">
        <p className="font-serif italic text-lg leading-snug text-editorial-charcoal ">
          Experience and recognition.
        </p>
      </div>
      <div className="lg:col-span-9 grid grid-cols-2 lg:grid-cols-4 divide-x divide-neutral-400/60 ">
        {items.map((item) => (
          <div key={item.label} className="pr-6 lg:px-8 py-10 flex flex-col justify-center">
            <span className="font-serif font-semibold text-base sm:text-lg text-editorial-charcoal leading-tight">
              {item.label}
            </span>
            <span className="mt-1.5 font-mono text-xs uppercase tracking-wider text-neutral-600 ">
              {item.sub}
            </span>
          </div>
        ))}
      </div>
      </div>
      </div>
    </section>
  );
}
