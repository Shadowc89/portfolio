function Hero() {
  return (
    <section className="container hero" id="home">
      <div className="hero-grid">
        <div className="hero-copy">
          <div className="eyebrow">
            <i></i> فريق رقمي مستقل
          </div>
          <h1>
            نصنع تجارب
            <br />
            <span>تكبر مع طموحك.</span>
          </h1>
          <p>
            مطور واجهات وتجارب رقمية أدمج بين التصميم، الكود، والتقنيات ثلاثية
            الأبعاد لصناعة منتجات واضحة، سريعة، ولا تُنسى.
          </p>
          <div className="actions">
            <a className="button" href="#projects">
              استكشف أعمالنا <i className="fa-solid fa-arrow-left"></i>
            </a>
            <a className="text-link" href="#about">
              تعرف علينا <i className="fa-solid fa-arrow-down"></i>
            </a>
          </div>
          <div className="hero-proof">
            <span className="proof-dot"></span>
            <strong>متاح لمشاريع جديدة</strong>
            <small>نبدأ خلال أسبوعين</small>
          </div>
        </div>
        <div
          className="hero-card"
          data-parallax="-.035"
          aria-label="عنصر بصري تفاعلي"
        >
          <div className="orb"></div>
          <div className="card-label">CREATIVE DEVELOPER / 2024</div>
          <div className="card-index">01 — 05</div>
        </div>
      </div>
    </section>
  );
}
window.Hero = Hero;
