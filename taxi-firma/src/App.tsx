import { useState } from "react"
import { translations } from "./translations"

function App() {

  const [lang, setLang] = useState<"de" | "en">("de")
  const text = translations[lang]

  return (
    <div>

      <header>
        <h1>{text.title}</h1>

        <nav>
          <a href="#leistungen">{text.nav.leistungen}</a>
          <a href="#preise">{text.nav.preise}</a>
          <a href="#kontakt">{text.nav.kontakt}</a>
        </nav>

        <div>
          <button onClick={() => setLang("de")}>DE</button>
          <button onClick={() => setLang("en")}>EN</button>
        </div>
      </header>

      <main>

        {/* HERO */}
        <section>
          <h2>{text.hero.title}</h2>
          <p>{text.hero.sub}</p>

          <a href="tel:00201065112306" className="call-btn">
            {text.hero.button}
          </a>
        </section>


        {/* LEISTUNGEN */}
        <section id="leistungen">
          <h2>{text.leistungen.title}</h2>

          {/* „Nimm jedes Element aus der Liste und mach etwas damit.item fibt mir map automatisch“ */}
          <ul>
            {text.leistungen.list.map((item, i) => (
              <li key={i}>{item}</li>
            ))}
          </ul>
        </section>


        {/* PREISE */}
        <section id="preise">
          <h2>{text.preise.title}</h2>

          {text.preise.list.map(item => (
            <p key={item}>{item}</p>
          ))}
        </section>


        {/* VORTEILE */}
        <section id="vorteile">
          <h2>{text.vorteile.title}</h2>

          <div className="vorteile-grid">
            {text.vorteile.items.map(v => (
              <div className="vorteil" key={v.title}>
                <div className="icon">{v.icon}</div>
                <h3>{v.title}</h3>
                {v.text && <p>{v.text}</p>}
              </div>
            ))}
          </div>
        </section>


        {/* KONTAKT */}
        <section id="kontakt">
          <h2>{text.kontakt.title}</h2>

          <div className="kontakt-grid">

            <div className="kontakt-card">
              <div className="kontakt-icon">📞</div>
              <h3>Telefon</h3>
              <p>00201065112306</p>
            </div>

            <div className="kontakt-card">
              <div className="kontakt-icon">✉️</div>
              <h3>E-Mail</h3>
              <p>sa_mh87@outlook.de</p>
            </div>

          </div>
        </section>

      </main>


      <footer>
        <p>{text.footer.text}</p>

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
