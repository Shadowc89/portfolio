function Footer() {
  const [mode, setMode] = React.useState("register");
  const [status, setStatus] = React.useState("");
  const [busy, setBusy] = React.useState(false);

  const submit = async (event) => {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const email = String(form.get("email") || "").trim();
    const password = String(form.get("password") || "");

    setBusy(true);
    setStatus("");

    try {
      // ✅ تم التعديل هنا: استخدام مسار نسبي بدلاً من localhost
      const response = await fetch(`/api/auth/${mode}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const responseText = await response.text();
      let result = {};

      try {
        result = responseText ? JSON.parse(responseText) : {};
      } catch (parseError) {
        throw new Error("تعذر قراءة رد الخادم. تأكد أن مسار API صحيح.");
      }

      if (!response.ok) {
        throw new Error(result.error || `خطأ من الخادم (${response.status})`);
      }

      // حفظ التوكن عند النجاح
      if (result.token) {
        localStorage.setItem("token", result.token);
      }

      setStatus(result.message || "تمت العملية بنجاح!");
      event.currentTarget.reset();
    } catch (error) {
      // معالجة خطأ انقطاع الاتصال (Failed to fetch)
      if (error.message === "Failed to fetch") {
        setStatus(
          "خطأ في الاتصال: تأكد من تشغيل سيرفر الباك إند وإضافة مكتبة CORS.",
        );
      } else {
        setStatus(error.message);
      }
    } finally {
      setBusy(false);
    }
  };

  return (
    <footer>
      <div className="container footer-grid">
        <div className="footer-copy">
          <span>© 2024 صُنع بشغف وكثير من القهوة.</span>
          <div className="socials">
            <a
              href="https://www.facebook.com/share/1EpUWJiNs9/"
              aria-label="Facebook"
            >
              <i className="fa-brands fa-facebook"></i>
            </a>
            <a href="https://wa.me/201107871077" aria-label="WhatsApp">
              <i className="fa-brands fa-whatsapp"></i>
            </a>
            <a href="https://t.me/Synaax" aria-label="Telegram">
              <i className="fa-brands fa-telegram"></i>
            </a>
          </div>
        </div>
        <div className="auth-card">
          <div className="auth-heading">
            <span className="section-kicker">PRIVATE ACCESS</span>
            <h3>{mode === "register" ? "أنشئ حسابك" : "مرحبًا بعودتك"}</h3>
            <p>احفظ بريدك بأمان وتابع أحدث أعمالنا.</p>
          </div>
          <div className="auth-tabs">
            <button
              className={mode === "register" ? "active" : ""}
              onClick={() => {
                setMode("register");
                setStatus("");
              }}
              type="button"
            >
              تسجيل جديد
            </button>
            <button
              className={mode === "login" ? "active" : ""}
              onClick={() => {
                setMode("login");
                setStatus("");
              }}
              type="button"
            >
              دخول
            </button>
          </div>
          <form onSubmit={submit} className="auth-form">
            <label>
              <i className="fa-solid fa-envelope"></i>
              <input
                name="email"
                type="email"
                placeholder="البريد الإلكتروني"
                required
                autoComplete="email"
              />
            </label>
            <label>
              <i className="fa-solid fa-lock"></i>
              <input
                name="password"
                type="password"
                placeholder="كلمة المرور (8 أحرف على الأقل)"
                minLength="8"
                required
                autoComplete={
                  mode === "login" ? "current-password" : "new-password"
                }
              />
            </label>
            <button className="button" type="submit" disabled={busy}>
              {busy
                ? "جارٍ المعالجة..."
                : mode === "register"
                  ? "إنشاء الحساب"
                  : "تسجيل الدخول"}{" "}
              <i className="fa-solid fa-arrow-left"></i>
            </button>
          </form>
          <p
            className={`auth-status ${
              status.includes("نجاح") ||
              status.includes("مرحبًا") ||
              status.includes("تمت")
                ? "success"
                : ""
            }`}
            aria-live="polite"
          >
            {status}
          </p>
        </div>
      </div>
    </footer>
  );
}

window.Footer = Footer;
