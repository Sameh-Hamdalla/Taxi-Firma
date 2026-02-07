// ================= IMPORTS =================

// Hotelliste (separate Datei)
import { hotels } from "./hotels";

// React State Hook
import { useState } from "react";

// CSS nur für Wizard
import "./BookingWizard.css";


/**
 * ================= TEXT TYPE =================
 * Texte kommen aus translations.booking
 * → mehrsprachig
 */
type BookingText = {
  inquiry: string;
  people: string;
  from: string;
  to: string;
  vehicle: string;
  hotel: string;
  room: string;

  customerData: string;
  fullname: string;
  phone: string;
  date: string;
  time: string;
  country: string;
  email: string;
  notes: string;

  next: string;
  back: string;
  send: string;
};


/**
 * ================= PROPS =================
 */
type Props = {
  open: boolean;
  text: BookingText;
};

/**
 * ================= ERROR STATE TYPE =================
 * Speichert welche Pflichtfelder Fehler haben
 */
type ErrorState = {
  from?: boolean;
  to?: boolean;
  vehicle?: boolean;
  fullname?: boolean;
  phone?: boolean;
  date?: boolean;
  time?: boolean;
};

/**
 * =========================================================
 * BOOKING WIZARD COMPONENT
 * =========================================================
 *
 * Step 1 → Fahrt Daten
 * Step 2 → Kunden Daten
 *
 * Pflichtfelder werden:
 * - geprüft
 * - rot markiert
 * - mit Text angezeigt
 *
 * Final → WhatsApp wird geöffnet
 */
export default function BookingWizard({ open, text }: Props) {

  // ---------- Sichtbarkeit ----------
 
  // ---------- Step Steuerung ----------
  const [step, setStep] = useState(1);

  // =====================================================
  // STEP 1 STATE
  // =====================================================
  const [people, setPeople] = useState(1);
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [vehicle, setVehicle] = useState("");
  const [hotel, setHotel] = useState("");
  const [roomflight, setRoomflight] = useState("");

  // =====================================================
  // STEP 2 STATE
  // =====================================================
  const [fullname, setFullname] = useState("");
  const [phone, setPhone] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [country, setCountry] = useState("");
  const [email, setEmail] = useState("");
  const [notes, setNotes] = useState("");

  // =====================================================
  // ERROR STATE (für rote Markierung)
  // =====================================================
  const [errors, setErrors] = useState<ErrorState>({});

  if (!open) return null;


  /**
   * ================= STEP 1 VALIDATION =================
   */
  const validateStep1 = () => {
    const e: ErrorState = {};

    if (!from) e.from = true;
    if (!to) e.to = true;
    if (!vehicle) e.vehicle = true;

    setErrors(e);
    return Object.keys(e).length === 0;
  };


  /**
   * ================= STEP 2 VALIDATION =================
   */
  const validateStep2 = () => {
    const e: ErrorState = {};

    if (!fullname) e.fullname = true;
    if (!phone) e.phone = true;
    if (!date) e.date = true;
    if (!time) e.time = true;

    setErrors(e);
    return Object.keys(e).length === 0;
  };


  /**
   * ================= WHATSAPP SEND =================
   */
  const sendWhatsApp = () => {

    if (!validateStep2()) return;

    const message =
`*${text.inquiry}*

${text.people}: ${people}
${text.from}: ${from}
${text.to}: ${to}
${text.vehicle}: ${vehicle}
${text.hotel}: ${hotel}
${text.room}: ${roomflight}

${text.fullname}: ${fullname}
${text.phone}: ${phone}
${text.date}: ${date}
${text.time}: ${time}
${text.country}: ${country}
${text.email}: ${email}
${text.notes}: ${notes}`;

    const url =
      `https://wa.me/201065112306?text=${encodeURIComponent(message)}`;

    window.open(url, "_blank");
  };



  // =====================================================
  // RENDER
  // =====================================================
  return (
    <>

      {/* =====================================================
         STEP 1 — FAHRT DATEN
      ===================================================== */}
      {step === 1 && (
        <div className="booking-wizard">

          <h2>{text.inquiry}</h2>

          {/* PEOPLE */}
          <label>{text.people}</label>
          <input
            type="number"
            min="1"
            value={people}
            onChange={e => setPeople(parseInt(e.target.value) || 1)}
          />

          {/* FROM */}
          <label>{text.from}</label>
          <select
            value={from}
            className={errors.from ? "input-error" : ""}
            onChange={e => {
              setFrom(e.target.value);
              setErrors(prev => ({...prev, from: false}));
            }}
          >
            <option value="">-- auswählen --</option>
            {hotels.map(h => <option key={h}>{h}</option>)}
          </select>
          {errors.from && <div className="error-text">Pflichtfeld</div>}

          {/* TO */}
          <label>{text.to}</label>
          <select
            value={to}
            className={errors.to ? "input-error" : ""}
            onChange={e => {
              setTo(e.target.value);
              setErrors(prev => ({...prev, to: false}));
            }}
          >
            <option value="">-- auswählen --</option>
            {hotels.map(h => <option key={h}>{h}</option>)}
          </select>
          {errors.to && <div className="error-text">Pflichtfeld</div>}

          {/* VEHICLE */}
          <label>{text.vehicle}</label>
          <select
            value={vehicle}
            className={errors.vehicle ? "input-error" : ""}
            onChange={e => {
              setVehicle(e.target.value);
              setErrors(prev => ({...prev, vehicle: false}));
            }}
          >
            <option value="">---</option>
            <option>Car</option>
            <option>MiniVan</option>
            <option>Bus</option>
          </select>
          {errors.vehicle && <div className="error-text">Pflichtfeld</div>}

          {/* HOTEL */}
          <label>{text.hotel}</label>
          <input value={hotel} onChange={e => setHotel(e.target.value)} />

          {/* ROOM */}
          <label>{text.room}</label>
          <input value={roomflight} onChange={e => setRoomflight(e.target.value)} />

          {/* NEXT */}
          <div className="wizard-actions">
            <button
              className="wizard-btn-next"
              onClick={() => {
                if (validateStep1()) setStep(2);
              }}
            >
              {text.next}
            </button>
          </div>

        </div>
      )}



      {/* =====================================================
         STEP 2 — CUSTOMER DATA
      ===================================================== */}
      {step === 2 && (
        <div className="booking-wizard">

          <h2>{text.customerData}</h2>

          <label>{text.fullname}</label>
          <input
            className={errors.fullname ? "input-error" : ""}
            value={fullname}
            onChange={e => setFullname(e.target.value)}
          />
          {errors.fullname && <div className="error-text">Pflichtfeld</div>}

          <label>{text.phone}</label>
          <input
            className={errors.phone ? "input-error" : ""}
            value={phone}
            onChange={e => setPhone(e.target.value)}
          />
          {errors.phone && <div className="error-text">Pflichtfeld</div>}

          <label>{text.date}</label>
          <input
            type="date"
            className={errors.date ? "input-error" : ""}
            value={date}
            onChange={e => setDate(e.target.value)}
          />
          {errors.date && <div className="error-text">Pflichtfeld</div>}

          <label>{text.time}</label>
          <input
            type="time"
            className={errors.time ? "input-error" : ""}
            value={time}
            onChange={e => setTime(e.target.value)}
          />
          {errors.time && <div className="error-text">Pflichtfeld</div>}

          <label>{text.country}</label>
          <input value={country} onChange={e => setCountry(e.target.value)} />

          <label>{text.email}</label>
          <input value={email} onChange={e => setEmail(e.target.value)} />

          <label>{text.notes}</label>
          <textarea value={notes} onChange={e => setNotes(e.target.value)} />

          <div className="wizard-actions">

            <button onClick={() => setStep(1)}>
              {text.back}
            </button>

            <button onClick={sendWhatsApp}>
              {text.send}
            </button>

          </div>

        </div>
      )}

    </>
  );
}
