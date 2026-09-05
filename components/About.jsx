function About() {
  return (
    <section className="container section" id="about">
      <div className="section-head">
        <div>
          <div className="section-kicker">01 — ABOUT</div>
          <h2>
            الكود لغة،
            <br />
            والتجربة هي الرسالة.
          </h2>
        </div>
        <p className="section-intro">
          أهتم بالتفاصيل الصغيرة التي تصنع فرقًا كبيرًا؛ من أول نقرة حتى آخر
          بكسل.
        </p>
      </div>
      <div className="about-grid">
        <div className="stats">
          <div className="stat">
            <strong>03+</strong>
            <small>سنوات خبرة</small>
          </div>
          <div className="stat">
            <strong>8</strong>
            <small>مشروعا مفروغ منه</small>
          </div>
          <div className="stat">
            <strong>2</strong>
            <small>علامة تعاونت معها</small>
          </div>
          <div className="stat">
            <strong>∞</strong>
            <small>شغف بالتعلم</small>
          </div>
        </div>
        <div className="about-text">
          <p>
            نحن شريكك التقني لبناء منتجات رقمية لا تكتفي بالظهور بشكل رائع، بل
            تحقق نتائج حقيقية.
          </p>
          <p>
            نبدأ دائمًا بفهم المشكلة قبل كتابة أي سطر كود. نؤمن أن أفضل المنتجات
            هي التي تبدو بسيطة للمستخدم، لكنها مدروسة بعناية خلف الكواليس.
          </p>
          <p>
            خارج الشاشة، نستكشف تقنيات WebGL، نلتقط صورًا للعمارة، ونبحث عن أفضل
            قهوة في المدينة.
          </p>
        </div>
      </div>
    </section>
  );
}
window.About = About;
