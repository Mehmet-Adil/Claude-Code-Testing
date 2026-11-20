const STATS = [
  { value: "12", label: "Partner farms" },
  { value: "40k+", label: "Bags shipped" },
  { value: "4.9★", label: "Average rating" },
];

export default function Story() {
  return (
    <section className="story" id="story">
      <div className="container story-inner">
        <div className="story-art" aria-hidden="true">
          <div className="bean" />
          <div className="bean b2" />
          <div className="bean b3" />
        </div>
        <div className="story-text">
          <p className="eyebrow">Our Story</p>
          <h2>Started in a garage with a popcorn popper.</h2>
          <p>
            Ember &amp; Bean began in 2019 when two friends got tired of stale supermarket coffee. What started as
            roasting beans in a secondhand popcorn machine turned into a tiny roastery obsessed with one thing: flavor.
          </p>
          <p>
            Today we work directly with twelve farms across four continents, roasting every batch by hand. No
            shortcuts, no stale beans — just honest coffee.
          </p>
          <div className="stats">
            {STATS.map((s) => (
              <div key={s.label}>
                <strong>{s.value}</strong>
                <span>{s.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
