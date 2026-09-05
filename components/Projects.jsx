function Projects({ projects }) {
  return (
    <section className="container section" id="projects">
      <div className="section-head">
        <div>
          <div className="section-kicker">04 — SELECTED WORK</div>
          <h2>أعمال مختارة.</h2>
        </div>
        <a className="section-intro" href="#contact">
          هل لديك مشروع؟ ←
        </a>
      </div>
      <div className="projects">
        {projects.map((project) => (
          <article className="project" key={project.title}>
            <a
              className="project-link"
              href="#contact"
              aria-label={`تفاصيل ${project.title}`}
            >
              <i className="fa-solid fa-arrow-up-right-from-square"></i>
            </a>
            <div className="project-content">
              <div className="project-tag">{project.tag}</div>
              <h3>{project.title}</h3>
              <p>{project.text}</p>
              <strong className="project-metric">{project.metric}</strong>
              <span className="project-view">
                عرض الحالة{" "}
                <b>
                  <i className="fa-solid fa-arrow-up-right-from-square"></i>
                </b>
              </span>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
window.Projects = Projects;
