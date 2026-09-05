function Services({ services }) {
  return (
    <section className="container section services-section" id="services">
      <div className="section-head">
        <div>
          <div className="section-kicker">02 — CAPABILITIES</div>
          <h2>
            من الفكرة
            <br />
            إلى التأثير.
          </h2>
        </div>
        <p className="section-intro">
          فريق صغير بخبرة كبيرة، نعمل معك في كل خطوة لبناء شيء يستحق أن يُرى.
        </p>
      </div>
      <div className="services">
        {services.map((service) => (
          <article className="service" key={service.number}>
            <span className="service-number">
              <b>{service.number}</b>
              <i className={`fa-solid ${service.icon}`}></i>
            </span>
            <div>
              <h3>{service.title}</h3>
              <p>{service.text}</p>
            </div>
            <span className="service-arrow">
              <i className="fa-solid fa-arrow-up-right-from-square"></i>
            </span>
          </article>
        ))}
      </div>
    </section>
  );
}
window.Services = Services;
