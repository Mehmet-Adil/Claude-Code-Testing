const REVIEWS = [
  { quote: "The Ethiopian Yirgacheffe tastes like blueberries and sunshine. I'm never going back.", author: "Priya, Portland" },
  { quote: "My subscription is the highlight of my month. Fresh, fast, and always delicious.", author: "Marcus, Austin" },
  { quote: "Midnight Ember makes the best espresso I've ever pulled at home. Rich and chocolatey.", author: "Sofia, Chicago" },
];

export default function Testimonials() {
  return (
    <section className="testimonials">
      <div className="container">
        <h2 className="center">What our customers say</h2>
        <div className="testimonial-grid">
          {REVIEWS.map((r) => (
            <blockquote key={r.author}>
              <p>&ldquo;{r.quote}&rdquo;</p>
              <cite>— {r.author}</cite>
            </blockquote>
          ))}
        </div>
      </div>
    </section>
  );
}
