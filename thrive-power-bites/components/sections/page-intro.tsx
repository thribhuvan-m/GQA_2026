export function PageIntro({ eyebrow, title, children }: { eyebrow: string; title: string; children?: React.ReactNode }) {
  return (
    <section className="border-b border-forest/8 bg-gradient-to-b from-beige/40 to-cream">
      <div className="container-page py-14 sm:py-20">
        <p className="eyebrow">{eyebrow}</p>
        <h1 className="heading-xl mt-4 max-w-3xl">{title}</h1>
        {children ? <div className="lead mt-5 max-w-2xl">{children}</div> : null}
      </div>
    </section>
  );
}
