// ================= IMPORTS =================

// Hotelliste aus separater Datei
// → Array mit allen Hotels / Orten
import { hotels } from "./hotels";

// React Hook für State (Formularwerte merken)
import { useState } from "react";

// CSS nur für dieses Formular
import "./BookingWizard.css";


/**
 * ================= TYPE: BookingText =================
 * Struktur der Texte aus translations.booking
 * → sorgt für Typsicherheit + Mehrsprachigkeit
 */
type BookingText = {
  title: string;
  inquiry: string;
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
 * Werte die App.tsx an diese Komponente schickt
 *
 * open → Formular sichtbar oder nicht
 * text → Sprachtexte
 */
type Props = {
  open: boolean;
  text: BookingText;
};


/**
 * ================= COMPONENT =================
 * BookingWizard
 *
 * Buchungs / Anfrage Formular
 * wird von App.tsx ein- und ausgeblendet
 */
export default function BookingWizard({ open, text }: Props) {

  // ================= STATE =================
  // Hier merkt sich React alle Eingaben des Users

  // Anzahl Personen
  const [people, setPeople] = useState(1);

  // Startort
  const [from, setFrom] = useState("");

  // Zielort
  const [to, setTo] = useState("");

  // Fahrzeugtyp
  const [vehicle, setVehicle] = useState("");

  // Hotelname (Freitext)
  const [hotel, setHotel] = useState("");

  // Zimmer / Flugnummer
  const [roomflight, setRoomflight] = useState("");


  /**
   * ================= EARLY RETURN =================
   * Wenn open = false → nichts rendern
   * → Formular existiert nicht im DOM
   */
  if (!open) return null;


  /**
   * ================= RENDER =================
   */
  return (

    // Hauptcontainer (Box Design per CSS)
    <div className="booking-wizard">


      {/* ================= PREIS (Platzhalter) ================= */}
      {/* Wird später dynamisch berechnet */}
      <h2>
        {text.inquiry} <span className="wizard-price"></span>
      </h2>


      {/* ================= PERSONEN ================= */}
      <label>{text.people}</label>

      {/* Controlled Input:
         value kommt aus React State
         onChange aktualisiert State */}
      <input
        type="number"
        min="1"
        value={people}
        onChange={(e) =>
          setPeople(parseInt(e.target.value) || 1)
        }
      />


      {/* ================= FROM / TO ================= */}
      {/* Grid Layout → 2 Spalten */}
      <div className="wizard-grid">

        {/* FROM */}
        <div>
          <label>{text.from}</label>

          {/* Controlled Select */}
          <select
            value={from}
            onChange={(e) => setFrom(e.target.value)}
          >
            {hotels.map((h: string) => (
              <option key={h} value={h}>{h}</option>
            ))}
          </select>
        </div>


        {/* TO */}
        <div>
          <label>{text.to}</label>

          {/* Controlled Select */}
          <select
            value={to}
            onChange={(e) => setTo(e.target.value)}
          >
            {hotels.map((h: string) => (
              <option key={h} value={h}>{h}</option>
            ))}
          </select>
        </div>

      </div>


      {/* ================= VEHICLE ================= */}
      <label>{text.vehicle}</label>

      {/* Controlled Select */}
      <select
        value={vehicle}
        onChange={(e) => setVehicle(e.target.value)}
      >
        <option value="">---</option>
        <option value="Car">Car (1–3)</option>
        <option value="MiniVan">Mini Van (1–8)</option>
        <option value="Bus">Bus</option>
      </select>


      {/* ================= HOTEL / ROOM ================= */}
      <div className="wizard-grid">

        {/* Hotel Freitext */}
        <div>
          <label>{text.hotel}</label>
          <input
            type="text"
            value={hotel}
            onChange={(e) => setHotel(e.target.value)}
          />
        </div>

        {/* Zimmer / Flugnummer */}
        <div>
          <label>{text.room}</label>
          <input
            type="text"
            value={roomflight}
            onChange={(e) => setRoomflight(e.target.value)}
          />
        </div>

      </div>

      {/* ================= NEXT BUTTON ================= */}
      {/* Wird später WhatsApp Anfrage senden */}
      <div className="wizard-actions">

        <button
          type="button" // verhindert Seiten-Reload
          className="wizard-btn-next"
        >
          {text.next}
        </button>

      </div>


    </div>
  );
}
