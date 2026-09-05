function Header({ menuOpen, setMenuOpen }) {
  return (
    <header className="container nav">
      <a className="brand" href="#home" aria-label="العودة للرئيسية">
        <span className="brand-mark">MN</span>Mohammed Nazeh
      </a>
      <button
        className="menu-button"
        onClick={() => setMenuOpen(!menuOpen)}
        aria-label="فتح القائمة"
        aria-expanded={menuOpen}
      >
        <i className={`fa-solid ${menuOpen ? "fa-xmark" : "fa-bars"}`}></i>
      </button>
      <nav className={`nav-links ${menuOpen ? "open" : ""}`}>
        <a href="#about">
          <i className="fa-solid fa-user"></i> عني
        </a>
        <a href="#services">
          <i className="fa-solid fa-layer-group"></i> الخدمات
        </a>
        <a href="#skills">
          <i className="fa-solid fa-screwdriver-wrench"></i> المهارات
        </a>
        <a href="#projects">
          <i className="fa-solid fa-briefcase"></i> المشاريع
        </a>
      </nav>
      <a className="nav-cta" href="#contact">
        <i className="fa-solid fa-arrow-up-right-from-square"></i> ابدأ مشروعك
      </a>
    </header>
  );
}
window.Header = Header;
