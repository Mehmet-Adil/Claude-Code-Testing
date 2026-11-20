const FEATURES = [
  { icon: "🌱", title: "Ethically Sourced", text: "Direct trade with farmers who are paid well above fair-trade prices." },
  { icon: "🔥", title: "Roasted to Order", text: "Every bag is roasted after you order, never sitting on a shelf." },
  { icon: "📦", title: "Free Shipping", text: "Free delivery on all orders over $35. Compostable packaging." },
];

export default function Features() {
  return (
    <section className="features">
      <div className="container features-grid">
        {FEATURES.map((f) => (
          <div key={f.title} className="feature">
            <span className="feature-icon">{f.icon}</span>
            <h3>{f.title}</h3>
            <p>{f.text}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
