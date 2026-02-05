// React Hook importieren → damit React sich Werte merken kann (State)
import { useState, useEffect } from "react"

// Übersetzungs-Objekt importieren (Deutsch / Englisch Texte)
import { translations } from "./translations"



function App() {

  // React State:
  // lang = aktuelle Sprache
  // setLang = Funktion um Sprache zu ändern
  // <"de" | "en"> = TypeScript erlaubt nur diese zwei Werte
  const [lang, setLang] = useState<"de" | "en">("de")
  const [showTopBtn, setShowTopBtn] = useState(false);

  // text enthält alle Texte der aktuell gewählten Sprache
  // Wenn lang = "de" → deutsche Texte
  // Wenn lang = "en" → englische Texte
  const text = translations[lang]

  useEffect(() => {
    // useEffect bedeutet:Mach etwas, nachdem die Komponente gerendert wurde
  const handleScroll = () => {
    if (window.scrollY > 300) {
      setShowTopBtn(true);
    } else {
      setShowTopBtn(false);
    }
  };

  window.addEventListener("scroll", handleScroll);
  // Wenn der User scrollt , ruf handleScroll auf
  return () => {
    window.removeEventListener("scroll", handleScroll);
    // Aufräumen: entferne den Event Listener, wenn die Komponente entladen wird
  };
}, []);

// das [] bedeutet: dieser Effekt wird nur einmal ausgeführt,
// wenn die Komponente das erste Mal geladen wird
  return (
    <div>

      {/* ================= HEADER ================= */}
      <header>

        {/* Firmenname aus translations */}
        <h1>{text.title}</h1>

        {/* Navigation — Texte kommen aus translations */}
        <nav>
          <a href="#leistungen">{text.nav.leistungen}</a>
          <a href="#preise">{text.nav.preise}</a>
          <a href="#kontakt">{text.nav.kontakt}</a>
        </nav>

        {/* Sprachumschalter — beim Klick wird State geändert */}
        <div>
          <button onClick={() => setLang("de")}>Deutsch</button>
          <button onClick={() => setLang("en")}>Englisch</button>
        </div>

      </header>


      {/* ================= MAIN ================= */}
      <main>

        {/* HERO BEREICH */}
        <section className="hero">

          <div className="hero-content">

          {/* Titel + Untertitel aus translations */}
          <h2>{text.hero.title}</h2>
          <p>{text.hero.sub}</p>

          {/* klickbarer Telefon-Link → startet Anruf auf Handy */}
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

        <section className="services-area-bg">
          {/* ================= LEISTUNGEN ================= */}

          {/* **
          * LeistungenSection Component
          * --------------------------
          * Diese Section zeigt alle angebotenen Leistungen als Karten (Cards) an.
          *
          * Datenquelle:
          * Die Texte kommen aus dem Sprach-Objekt `text`.
          * Dadurch funktioniert Mehrsprachigkeit (DE / EN).
          *
          * Aufbau:
          * - Überschrift aus text.leistungen.title
          * - Grid-Layout Container
          * - map() erzeugt automatisch eine Card pro Leistung
          * */}

          <section id="leistungen">

            {/* Section-Titel aus dem Sprachobjekt */}
            {/* Wird automatisch je nach Sprache ersetzt */}
            <h2>{text.leistungen.title}</h2>


            {/* 
              Grid-Container für die Cards
              
              CSS:
              .leistungen-grid = Grid Layout
              → Cards stehen nebeneinander
              → automatisch responsive
            */}
            <div className="leistungen-grid">

              {/*
                map() durchläuft das Array:
                text.leistungen.list

                Beispiel Array:
                [
                  "Flughafentransfer",
                  "Stadtfahrten",
                  "Gruppenfahrten"
                ]

                Für jedes Element wird eine Card erzeugt.
                
                Parameter:
                item = aktueller Textwert
                i    = Index (Position im Array)
              */}
              {text.leistungen.list.map((item, i) => (

                /**
                 * Card Element
                 * ------------
                 * key = eindeutiger React Listen-Key
                 * wichtig für Rendering & Performance
                 */
                <div className="card" key={i}>

                  {/*
                    Icon Container
                    - visuelles Symbol
                    - wird per CSS als Icon-Box formatiert
                    - aktuell statisch (immer Taxi-Emoji)
                  */}
                  <div className="icon">🚕</div>


                  {/*
                    Leistungs-Titel
                    - Text kommt direkt aus dem Array
                    - wird als Card-Überschrift angezeigt
                  */}
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

            {/* <p>
              {lang === "de"
                ? "Grundpreis 4,50 € + 1,50 € pro Kilometer."
                : "Base fare €4.50 + €1.50 per kilometer."}
            </p> */}

            <button className="call-btn" onClick={() => alert("Rechner folgt")}>
              {lang === "de"
                ? "Preis berechnen & buchen"
                : "Calculate price & book"}
            </button>

          </section>

        </section>

        {/* ================= VORTEILE ================= */}
        <section id="vorteile">

          <h2>{text.vorteile.title}</h2>

          <div className="vorteile-grid">

            {/*
              items = Array von Objekten
              jedes Objekt hat:
                icon
                title
                text
            */}
            {text.vorteile.items.map(v => (

              <div className="vorteil" key={v.title}>

                {/* Icon aus Daten */}
                <div className="icon">{v.icon}</div>

                {/* Titel */}
                <h3>{v.title}</h3>

                {/*
                  && bedeutet:
                  zeige <p> nur wenn Text existiert
                */}
                {v.text && <p>{v.text}</p>}

              </div>
            ))}

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
             <a href="mailto:taxiyassinmarsaalam@gmail.com?subject=Taxi Anfrage&body=Hallo, i want to book a taxi.">
              taxiyassinmarsaalam@gmail.com
            </a>

            </div>

          </div>

        </section>

      </main>

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

        {/* Footer Text aus translations */}
        <p>{text.footer.text}</p>

        {/* Social Icons */}
        <div className="socials">
          <a href="#">📘</a>
          <a href="#">📷</a>
          <a href="#">🐦</a>
        </div>

      </footer>

    </div>
  )
}

export default App
