export default function Footer() {
  return (
    <footer className="site-footer" id="contact">
      <div className="container footer-grid">
        <div>
          <a href="#" className="logo">
            Ember <span>&amp;</span> Bean
          </a>
          <p>
            Small-batch coffee roasters.
            <br />A fictional company for demo purposes.
          </p>
        </div>
        <div>
          <h4>Visit</h4>
          <p>123 Roastery Lane<br />Coffeeville, CA 90000</p>
        </div>
        <div>
          <h4>Contact</h4>
          <p>hello@emberandbean.example<br />(555) 012-3456</p>
        </div>
        <div>
          <h4>Hours</h4>
          <p>Mon–Fri: 7am – 6pm<br />Sat–Sun: 8am – 4pm</p>
        </div>
      </div>
      <p className="copyright">
        © {new Date().getFullYear()} Ember &amp; Bean. All rights reserved. Not a real store.
      </p>
    </footer>
  );
}
