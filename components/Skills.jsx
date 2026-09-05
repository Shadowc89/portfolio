function Skills({ skills }) {
  return (
    <section className="container section" id="skills">
      <div className="section-head">
        <div>
          <div className="section-kicker">03 — TOOLKIT</div>
          <h2>أدواتي اليومية.</h2>
        </div>
        <p className="section-intro">
          مزيج من الأدوات التي أستخدمها لتحويل الرؤية إلى واقع.
        </p>
      </div>
      <div className="skills">
        {skills.map((skill) => (
          <article className="skill" key={skill.title}>
            <div className="skill-icon">
              <i className={`${skill.prefix} ${skill.icon}`}></i>
            </div>
            <h3>{skill.title}</h3>
            <p>{skill.text}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
window.Skills = Skills;
