import { useState } from 'react';
import { SLOTS } from './data.js';

export default function PickupTime() {
  const [time, setTime] = useState('');
  const [confirmed, setConfirmed] = useState('');

  function confirmPickup() {
    setConfirmed(`Pickup at ${time}.`);
  }

  return (
    <div className="stack">
      <fieldset>
        <legend>Choose a pickup time</legend>
        {SLOTS.map((slot) => {
          const full = slot.left === 0;
          const label = full ? `${slot.time}, full` : `${slot.time}, ${slot.left} left`;
          return (
            <label key={slot.time}>
              <input
                type="radio"
                name="pickup-time"
                value={slot.time}
                checked={time === slot.time}
                disabled={full}
                onChange={() => { setTime(slot.time); setConfirmed(''); }}
              />
              {label}
            </label>
          );
        })}
      </fieldset>
      <button type="button" onClick={confirmPickup} disabled={!time}>
        Confirm pickup
      </button>
      <p className="result" role="status">{confirmed}</p>
    </div>
  );
}
