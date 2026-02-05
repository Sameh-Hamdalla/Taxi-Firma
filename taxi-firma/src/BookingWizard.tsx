import "./BookingWizard.css";

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
type Props = {
  open: boolean;
  text: BookingText;
};

export default function BookingWizard({ open, text,}: Props) {

  if (!open) return null;

  return (
    <div className="booking-wizard">

      <h2>
        {text.price}: <span className="wizard-price">€ 0.00</span>
      </h2>

      <label>{text.people}</label>
      <input type="number" min="1" defaultValue={1} />

      <div className="wizard-grid">

        <div>
          <label>{text.from}</label>
          <select>
            <option>Hurghada Airport</option>
            <option>Marsa Alam Airport</option>
            <option>Safaga</option>
          </select>
        </div>

        <div>
          <label>{text.to}</label>
          <select>
            <option>Abu Dabbab</option>
            <option>Port Ghalib</option>
            <option>Madinat Coraya</option>
          </select>
        </div>

      </div>

      <label>{text.vehicle}</label>
      <select>
        <option>---</option>
        <option>Car (1–3)</option>
        <option>Mini Van (1–8)</option>
        <option>Bus</option>
      </select>

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

      <div className="wizard-actions">

        <button
          type="button"
          className="wizard-btn-next"
        >
          {text.next}
        </button>

      </div>

    </div>
  );
}
