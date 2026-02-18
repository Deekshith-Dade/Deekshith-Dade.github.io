export default function BlogQuote({ children, cite }) {
  return (
    <figure className="rounded-3xl border border-white/10 bg-white/5 p-6 text-white/80 my-6">
      <blockquote className="text-lg italic leading-relaxed">
        &ldquo;{children}&rdquo;
      </blockquote>
      {cite && (
        <figcaption className="mt-4 text-sm uppercase tracking-[0.35em] text-white/60">
          &mdash; {cite}
        </figcaption>
      )}
    </figure>
  );
}
