import BookingWizard from "./BookingWizard";

/**
 * React Hooks
 * ----------
 * useState  → speichert Zustand (State)
 * useEffect → reagiert auf Lifecycle / Events
 */
import { useState, useEffect } from "react";

/**
 * Übersetzungen (DE / EN)
 */
import { translations } from "./translations";


function App() {

  /**
   * ================= STATE =================
   */

  // Aktuelle Sprache
  const [lang, setLang] = useState<"de" | "en">("de");

  // Scroll-Top Button sichtbar?
  const [showTopBtn, setShowTopBtn] = useState(false);

  // Booking Wizard sichtbar?
  // false → Formular aus
  // true  → Formular an
  const [bookingOpen, setBookingOpen] = useState(false);

  /**
   * Aktuelle Sprachtexte auswählen
   */
  const text = translations[lang];

  /**
   * ================= SCROLL LISTENER =================
   * Zeigt den Scroll-nach-oben Button
   */
  useEffect(() => {

    const handleScroll = () => {
      if (window.scrollY > 300) {
        setShowTopBtn(true);
      } else {
        setShowTopBtn(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    // Cleanup beim Unmount
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };

  }, []); // läuft nur einmal beim Start


  /**
   * ================= RENDER =================
   */

  return (
    <div>

      {/* ================= HEADER ================= */}
      <header>

        {/* Firmenname */}
        <h1>{text.title}</h1>

        {/* Navigation */}
        <nav>
          <a href="#leistungen">{text.nav.leistungen}</a>
          <a href="#preise">{text.nav.preise}</a>
          <a href="#kontakt">{text.nav.kontakt}</a>
        </nav>

        {/* Sprachumschalter */}
        <div>
          <button onClick={() => setLang("de")}>Deutsch</button>
          <button onClick={() => setLang("en")}>Englisch</button>
        </div>

      </header>


      {/* ================= MAIN ================= */}
      <main>

        {/* ================= HERO ================= */}
        <section className="hero">

          <div className="hero-content">

            <h2>{text.hero.title}</h2>
            <p>{text.hero.sub}</p>

            {/* WhatsApp Direktlink */}
            <a
              href="https://wa.me/201065112306"
              target="_blank"
              rel="noopener noreferrer"
              className="call-btn"
            >
              {text.hero.button}
            </a>

          </div>
        </section>


        {/* ================= SERVICES BACKGROUND ================= */}
        <section className="services-area-bg">

          {/* ================= LEISTUNGEN ================= */}
          <section id="leistungen">

            <h2>{text.leistungen.title}</h2>

            {/* Grid Cards */}
            <div className="leistungen-grid">

              {text.leistungen.list.map((item: string, i: number) => (

                <div className="card" key={i}>
                  <div className="icon">🚕</div>
                  <h3>{item}</h3>
                </div>

              ))}

            </div>

          </section>


          {/* ================= PREISE ================= */}
          <section id="preise">

            <h2>{text.preise.title}</h2>

            <p className="price-note">
              {lang === "de"
                ? "Fahrten sind bereits ab 6 € buchbar."
                : "Trips are bookable from €6."}
            </p>

           
             {/* * BUTTON → Wizard Toggle
             * ----------------------
             * Klick → Formular an/aus
             * prev => !prev = Toggle
             * */}
            <button
              className="call-btn"
              onClick={() => setBookingOpen(prev => !prev)}
            >
              {lang === "de"
                ? "Preis berechnen & buchen"
                : "Calculate price & book"}
            </button>

            {/* **
             * Booking Wizard
             * --------------
             * open = bookingOpen steuert Sichtbarkeit
             * */}
            <BookingWizard
              open={bookingOpen}
              text={text.booking}
            />

          </section>

        </section>


        {/* ================= VORTEILE ================= */}
        <section id="vorteile">

          <h2>{text.vorteile.title}</h2>

          <div className="vorteile-grid">

            {text.vorteile.items.map(
              (v: { icon: string; title: string; text?: string }, i: number) => (

                <div className="vorteil" key={i}>
                  <div className="icon">{v.icon}</div>
                  <h3>{v.title}</h3>
                  {v.text && <p>{v.text}</p>}
                </div>

              )
            )}

          </div>

        </section>


        {/* ================= KONTAKT ================= */}
        <section id="kontakt">

          <h2>{text.kontakt.title}</h2>

          <div className="kontakt-grid">

            <div className="kontakt-card">
              <div className="kontakt-icon">📞</div>
              <h3>WhatsApp</h3>

              <a
                href="https://wa.me/201065112306"
                target="_blank"
                rel="noopener noreferrer"
                className="call-btn"
              >
                {text.kontakt.button}
              </a>

            </div>

            <div className="kontakt-card">
              <div className="kontakt-icon">✉️</div>
              <h3>E-Mail</h3>

              <a href="mailto:taxiyassinmarsaalam@gmail.com">
                taxiyassinmarsaalam@gmail.com
              </a>

            </div>

          </div>

        </section>

      </main>


      {/* ================= SCROLL TOP BUTTON ================= */}
      {showTopBtn && (
        <button
          className="scroll-top-btn"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        >
          ↑
        </button>
      )}


      {/* ================= FOOTER ================= */}
      <footer>

        <p>{text.footer.text}</p>

        <div className="socials">
          <a href="#">📘</a>
          <a href="#">📷</a>
          <a href="#">🐦</a>
        </div>

      </footer>

    </div>
  );
}

export default App;
