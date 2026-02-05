
import { hotels } from "./hotels";
import {useState} from "react";
/**
 * ================= CSS IMPORT =================
 * Lädt die separate Stylesheet-Datei für dieses Formular
 * → betrifft nur BookingWizard Layout & Design
 */
import "./BookingWizard.css";


/**
 * ================= TYPE: BookingText =================
 * Definiert die Struktur der Texte,
 * die aus translations.booking kommen.
 *
 * Dadurch ist die Komponente mehrsprachig nutzbar.
 */
type BookingText = {
  title: string;
  price: string;
  people: string;
  from: string;
  to: string;
  vehicle: string;
  hotel: string;
  room: string;
  cancel: string;
  next: string;
};


/**
 * ================= TYPE: Props =================
 * Props = Werte, die von App.tsx
 * an diese Komponente übergeben werden.
 *
 * open → steuert Sichtbarkeit
 * text → enthält alle Sprachtexte
 */
type Props = {
  open: boolean;
  text: BookingText;
};


/**
 * ================= COMPONENT =================
 * BookingWizard
 *
 * Zweck:
 * Mehrstufiges Buchungsformular
 *
 * Wird von App.tsx ein- und ausgeblendet
 * abhängig vom State bookingOpen
 */
export default function BookingWizard({ open, text }: Props) {

  // aktueller Wizard Schritt
  const [step, setStep] = useState(1);

  // Formular Werte
  const [people, setPeople] = useState(1);
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [vehicle, setVehicle] = useState("");

  /**
   * ================= EARLY RETURN =================
   * Wenn open = false → nichts anzeigen
   *
   * React rendert dann NULL
   * → Formular existiert nicht im DOM
   */
  if (!open) return null;


  /**
   * ================= RENDER =================
   */
  return (

    /**
     * Hauptcontainer des Formulars
     * CSS-Klasse steuert Layout / Box / Styling
     */
    <div className="booking-wizard">


      {/* ================= PREIS ANZEIGE =================
         Wird später dynamisch berechnet
         aktuell nur Platzhalter
      */}
      <h2>
        {text.price}: <span className="wizard-price">€ 0.00</span>
      </h2>


      {/* ================= PERSONEN =================
         Anzahl der Fahrgäste
      */}
      <label>{text.people}</label>

      {/* number input mit Minimum = 1 */}
      <input
        type="number"
        min="1"
        value={people}
        onChange={(e) => setPeople(parseInt(e.target.value) || 1)}
      />


      {/* ================= FROM / TO GRID =================
         Zweispaltiges Layout
         Start + Ziel
      */}
      <div className="wizard-grid">

        {/* FROM */}
        <div>
          <label>{text.from}</label>

          <select>
                  {/* <option>Hurghada Airport</option>
                  <option>Marsa Alam Airport</option>
                  <option>Safaga</option> */}
                  {hotels.map((h) => (
                    <option key={h} value={h}>{h}</option>
                  ))}
          </select>
        </div>


        {/* TO */}
        <div>
          <label>{text.to}</label>

          <select>
            {hotels.map((h) => (
              <option key={h} value={h}>{h}</option>
            ))}
          </select>
        </div>

      </div>


      {/* ================= FAHRZEUG =================
         Auswahl Fahrzeugtyp
      */}
      <label>{text.vehicle}</label>

      <select>
        <option>---</option>
        <option>Car (1–3)</option>
        <option>Mini Van (1–8)</option>
        <option>Bus</option>
      </select>


      {/* ================= HOTEL / ZIMMER =================
         Textfelder für Hotel + Zimmernummer
      */}
      <div className="wizard-grid">

        <div>
          <label>{text.hotel}</label>
          <input type="text" />
        </div>

        <div>
          <label>{text.room}</label>
          <input type="text" />
        </div>

      </div>


      {/* ================= ACTION BUTTON =================
         Nächster Schritt im Wizard
         → später: Preis berechnen / nächste Seite
      */}
      <div className="wizard-actions">

        <button
          type="button" // verhindert Form Submit Reload
          className="wizard-btn-next"
        >
          {text.next}
        </button>

      </div>


    </div>
  );
}
