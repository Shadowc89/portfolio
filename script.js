const { useEffect, useState } = React;

const skills = [
  { prefix: "fa-solid", icon: "fa-atom", title: "React", text: "واجهات قابلة للتوسع وتجارب مستخدم سريعة." },
  { prefix: "fa-brands", icon: "fa-js", title: "JavaScript", text: "منطق تفاعلي نظيف وأداء يعتمد عليه." },
  { prefix: "fa-solid", icon: "fa-cube", title: "Three.js", text: "عوالم ثلاثية الأبعاد تضيف معنى للتجربة." },
  { prefix: "fa-solid", icon: "fa-code", title: "HTML & CSS", text: "أنظمة تصميم متجاوبة ودقيقة التفاصيل." },
];

const projects = [
  { tag: "01 / PRODUCT DESIGN", title: "NOVA Dashboard", text: "لوحة تحكم ذكية لإدارة البيانات والفرق.", metric: "+42% إنتاجية" },
  { tag: "02 / DIGITAL EXPERIENCE", title: "Orbit Studio", text: "هوية رقمية تفاعلية لاستوديو إبداعي.", metric: "3.2x تفاعل" },
  { tag: "03 / E-COMMERCE", title: "Luma Store", text: "تجربة تسوق بسيطة لعلامة تقنية عصرية.", metric: "+68% مبيعات" },
];

const services = [
  { number: "01", icon: "fa-compass-drafting", title: "استراتيجية وتجربة", text: "نحوّل أهداف العمل إلى تجربة واضحة ومقنعة تبدأ من احتياج المستخدم." },
  { number: "02", icon: "fa-pen-ruler", title: "تصميم واجهات", text: "نصمم أنظمة مرنة تجمع بين الهوية، الوضوح، والتفاصيل التي تترك أثرًا." },
  { number: "03", icon: "fa-laptop-code", title: "تطوير تفاعلي", text: "نبني منتجات سريعة وموثوقة باستخدام React وواجهات ثلاثية الأبعاد عند الحاجة." },
];

function App() {
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const closeMenu = () => setMenuOpen(false);
    const links = document.querySelectorAll(".nav-links a");
    links.forEach((link) => link.addEventListener("click", closeMenu));

    // تشغيل خلفية Three.js والتفاعلات بعد جاهزية الـ DOM
    initScene();
    initInteractions();

    return () => links.forEach((link) => link.removeEventListener("click", closeMenu));
  }, []);

  return (
    <>
      <Header menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
      <main>
        <Hero />
        <TrustBar />
        <About />
        <Services services={services} />
        <Skills skills={skills} />
        <Projects projects={projects} />
        <Contact />
      </main>
      <Footer />
    </>
  );
}

function initScene() {
  const canvas = document.getElementById("scene");
  if (!canvas) return; // حماية في حال عدم وجود الـ canvas

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(65, window.innerWidth / window.innerHeight, 0.1, 100);
  camera.position.z = 5;

  const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.setSize(window.innerWidth, window.innerHeight);

  const geometry = new THREE.BufferGeometry();
  const points = [];
  for (let i = 0; i < 650; i++) {
    points.push((Math.random() - 0.5) * 14, (Math.random() - 0.5) * 9, (Math.random() - 0.5) * 5);
  }
  geometry.setAttribute("position", new THREE.Float32BufferAttribute(points, 3));

  const stars = new THREE.Points(
    geometry,
    new THREE.PointsMaterial({ color: 0x62e6e0, size: 0.018, transparent: true, opacity: 0.7 })
  );
  scene.add(stars);

  const pointer = { x: 0, y: 0 };
  window.addEventListener("pointermove", (event) => {
    pointer.x = (event.clientX / window.innerWidth - 0.5) * 0.18;
    pointer.y = (event.clientY / window.innerHeight - 0.5) * 0.12;
  }, { passive: true });

  window.addEventListener("resize", () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  });

  const animate = () => {
    requestAnimationFrame(animate);
    stars.rotation.y += 0.0007 + pointer.x * 0.002;
    stars.rotation.x += 0.0002 + pointer.y * 0.001;
    camera.position.x += (pointer.x - camera.position.x) * 0.02;
    camera.position.y += (-pointer.y - camera.position.y) * 0.02;
    renderer.render(scene, camera);
  };
  animate();
}

function initInteractions() {
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  if (!document.querySelector(".cursor-glow")) {
    document.body.insertAdjacentHTML("afterbegin", '<div class="cursor-glow"></div><div class="scroll-progress"></div>');
  }

  const progress = document.querySelector(".scroll-progress");
  const updateProgress = () => {
    if (!progress) return;
    const max = document.documentElement.scrollHeight - window.innerHeight;
    progress.style.transform = `scaleX(${max ? window.scrollY / max : 0})`;
  };

  window.addEventListener("scroll", updateProgress, { passive: true });

  const nav = document.querySelector(".nav");
  window.addEventListener("scroll", () => {
    if (nav) nav.classList.toggle("scrolled", window.scrollY > 20);
  }, { passive: true });

  updateProgress();

  const revealItems = document.querySelectorAll(".section, .hero-copy, .hero-card, .trust-inner, .project, .skill, .service");
  revealItems.forEach((item, index) => {
    item.classList.add("reveal");
    item.style.setProperty("--delay", `${(index % 4) * 80}ms`);
  });

  if (reducedMotion) {
    revealItems.forEach((item) => item.classList.add("is-visible"));
  } else {
    const observer = new IntersectionObserver((entries, currentObserver) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          currentObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    revealItems.forEach((item) => observer.observe(item));
  }

  const sectionLinks = new Map([...document.querySelectorAll(".nav-links a")].map((link) => [link.getAttribute("href")?.slice(1), link]));
  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting && sectionLinks.has(entry.target.id)) {
        sectionLinks.forEach((link) => link?.classList.remove("active"));
        sectionLinks.get(entry.target.id)?.classList.add("active");
      }
    });
  }, { rootMargin: "-35% 0px -55% 0px" });

  document.querySelectorAll("main section[id]").forEach((section) => sectionObserver.observe(section));

  if (!reducedMotion) {
    const glow = document.querySelector(".cursor-glow");
    window.addEventListener("pointermove", (event) => {
      if (glow) {
        glow.style.left = `${event.clientX}px`;
        glow.style.top = `${event.clientY}px`;
      }
    }, { passive: true });

    document.querySelectorAll(".project, .skill, .hero-card").forEach((card) => {
      card.addEventListener("pointermove", (event) => {
        const box = card.getBoundingClientRect();
        const rotateX = ((event.clientY - box.top) / box.height - 0.5) * -6;
        const rotateY = ((event.clientX - box.left) / box.width - 0.5) * 6;
        card.style.transform = `perspective(900px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-5px)`;
      });
      card.addEventListener("pointerleave", () => { card.style.transform = ""; });
    });

    document.querySelectorAll(".button, .nav-cta").forEach((button) => {
      button.addEventListener("pointermove", (event) => {
        const box = button.getBoundingClientRect();
        button.style.setProperty("--mx", `${event.clientX - box.left - box.width / 2}px`);
        button.style.setProperty("--my", `${event.clientY - box.top - box.height / 2}px`);
      });
      button.addEventListener("pointerleave", () => {
        button.style.setProperty("--mx", "0px");
        button.style.setProperty("--my", "0px");
      });
    });

    document.querySelectorAll(".skill-icon, .service-number i, .project-link, .service-arrow").forEach((icon) => {
      icon.addEventListener("pointerenter", () => icon.classList.add("icon-active"));
      icon.addEventListener("pointerleave", () => icon.classList.remove("icon-active"));
    });

    document.querySelectorAll("[data-parallax]").forEach((element) => {
      window.addEventListener("scroll", () => {
        const speed = Number(element.dataset.parallax) || 0.08;
        element.style.setProperty("--parallax-y", `${window.scrollY * speed}px`);
      }, { passive: true });
    });
  }

  const counters = document.querySelectorAll(".stat strong");
  const counterObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      const element = entry.target;
      const value = element.textContent;
      const number = parseInt(value, 10);
      if (!Number.isNaN(number) && !reducedMotion) {
        let current = 0;
        const timer = setInterval(() => {
          current += Math.ceil(number / 24);
          element.textContent = `${Math.min(current, number)}${value.includes("+") ? "+" : ""}`;
          if (current >= number) clearInterval(timer);
        }, 42);
      }
      observer.unobserve(element);
    });
  }, { threshold: 0.8 });
  counters.forEach((counter) => counterObserver.observe(counter));
}

// السطر الأخير لرسم التطبيق
ReactDOM.createRoot(document.getElementById("root")).render(<App />);