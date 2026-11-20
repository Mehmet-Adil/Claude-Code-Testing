"use client";

import { useState } from "react";

export default function Subscribe() {
  const [message, setMessage] = useState("");

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setMessage("Thanks for joining! Check your inbox for 15% off. ☕");
    e.currentTarget.reset();
  }

  return (
    <section className="subscribe" id="subscribe">
      <div className="container subscribe-inner">
        <h2>Never run out of coffee.</h2>
        <p>Subscribe and save 15% on every bag. Pause, skip, or cancel anytime.</p>
        <form className="subscribe-form" onSubmit={handleSubmit}>
          <input type="email" placeholder="you@example.com" required aria-label="Email address" />
          <button type="submit" className="btn btn-primary">Join the Club</button>
        </form>
        <p className="form-msg">{message}</p>
      </div>
    </section>
  );
}
