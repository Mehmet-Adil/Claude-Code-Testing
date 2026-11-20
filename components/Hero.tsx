export default function Hero() {
  return (
    <section className="hero">
      <div className="container hero-inner">
        <div className="hero-text">
          <p className="eyebrow">Roasted Tuesday · Shipped Wednesday</p>
          <h1>
            Coffee worth
            <br />
            waking up for.
          </h1>
          <p className="lead">
            Small-batch, single-origin beans roasted by hand in tiny batches and sent to your door within 24 hours of
            roasting.
          </p>
          <div className="hero-cta">
            <a href="#shop" className="btn btn-primary">Shop Coffee</a>
            <a href="#subscribe" className="btn btn-ghost">Start a Subscription</a>
          </div>
        </div>
        <div className="hero-art" aria-hidden="true">
          <div className="cup">
            <div className="steam"><span /><span /><span /></div>
            <div className="cup-body" />
            <div className="cup-handle" />
            <div className="saucer" />
          </div>
        </div>
      </div>
    </section>
  );
}
