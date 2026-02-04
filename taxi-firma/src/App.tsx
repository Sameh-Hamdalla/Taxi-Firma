// React Hook importieren → damit React sich Werte merken kann (State)
import { useState } from "react"

// Übersetzungs-Objekt importieren (Deutsch / Englisch Texte)
import { translations } from "./translations"

function App() {

  // React State:
  // lang = aktuelle Sprache
  // setLang = Funktion um Sprache zu ändern
  // <"de" | "en"> = TypeScript erlaubt nur diese zwei Werte
  const [lang, setLang] = useState<"de" | "en">("de")

  // text enthält alle Texte der aktuell gewählten Sprache
  // Wenn lang = "de" → deutsche Texte
  // Wenn lang = "en" → englische Texte
  const text = translations[lang]

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
          <button onClick={() => setLang("de")}>DE</button>
          <button onClick={() => setLang("en")}>EN</button>
        </div>

      </header>


      {/* ================= MAIN ================= */}
      <main>

        {/* HERO BEREICH */}
        <section className="hero">

          {/* Titel + Untertitel aus translations */}
          <h2>{text.hero.title}</h2>
          <p>{text.hero.sub}</p>

          {/* klickbarer Telefon-Link → startet Anruf auf Handy */}
          <a href="tel:00201065112306" className="call-btn">
            {text.hero.button}
          </a>

        </section>


        {/* ================= LEISTUNGEN ================= */}

        <section id="leistungen">

            <h2>{text.leistungen.title}</h2>

            <div className="leistungen-grid">

              {text.leistungen.list.map((item, i) => (
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

          {/*
            gleiche map-Logik:
            Liste → mehrere <p> Elemente erzeugen
          */}
          {text.preise.list.map(item => (
            <p key={item}>{item}</p>
          ))}

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
              <h3>Telefon</h3>
              <a href="tel:00201065112306">
                0020 106 511 2306
              </a>
            </div>

            <div className="kontakt-card">
              <div className="kontakt-icon">✉️</div>
              <h3>E-Mail</h3>
             <a href="mailto:sa_mh87@outlook.de?subject=Taxi Anfrage&body=Hallo, i want to book a taxi.">
              sa_mh87@outlook.de
            </a>

            </div>

          </div>

        </section>

      </main>


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
