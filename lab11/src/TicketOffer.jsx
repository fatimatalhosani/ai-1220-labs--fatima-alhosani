import { useState } from 'react';
import { TICKET } from './data.js';

export default function TicketOffer() {
  const [protect, setProtect] = useState(false);
  const [offer, setOffer] = useState(true);
  const [charged, setCharged] = useState('');
  const total = TICKET.price + TICKET.fee + (protect ? TICKET.protection : 0);

  function pay() {
    setCharged(`Charged AED ${total}.`);
  }

  function decline() {
    setOffer(false);
    setProtect(false);
    setCharged('');
  }

  return (
    <div className="stack">
      <p>{TICKET.name} · AED {TICKET.price}</p>
      {offer && (
        <div className="offer">
          <label>
            <input
              type="checkbox"
              checked={protect}
              onChange={(event) => { setProtect(event.target.checked); setCharged(''); }}
            />
            {' '}Ticket protection · AED {TICKET.protection}
          </label>
          <button type="button" className="quiet" onClick={decline}>
            No thanks
          </button>
        </div>
      )}
      <p className="total">Total AED {total}</p>
      <button type="button" onClick={pay}>Pay AED {total}</button>
      <p className="result" role="status">{charged}</p>
    </div>
  );
}
