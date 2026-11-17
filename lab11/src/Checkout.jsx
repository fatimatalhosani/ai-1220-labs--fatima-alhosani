import { useRef, useState } from 'react';
import { ORDER } from './data.js';
import { placeOrder } from './api.js';

export default function Checkout() {
  const [placing, setPlacing] = useState(false);
  const [result, setResult] = useState(null);
  const requestInProgress = useRef(false);
  const total = ORDER.reduce((sum, line) => sum + line.price, 0);
  const buttonText = placing ? 'Placing order...' : result ? 'Place order again' : 'Place order';

  async function handleClick() {
    if (requestInProgress.current) return;
    requestInProgress.current = true;
    setPlacing(true);
    setResult(null);
    try {
      const answer = await placeOrder(ORDER);
      setResult(answer);
    } finally {
      requestInProgress.current = false;
      setPlacing(false);
    }
  }

  return (
    <div className="stack">
      <ul className="lines">
        {ORDER.map((line) => (
          <li key={line.item}><span>{line.item}</span><span>AED {line.price}</span></li>
        ))}
        <li className="total"><span>Total</span><span>AED {total}</span></li>
      </ul>
      <button type="button" onClick={handleClick} disabled={placing}>
        {buttonText}
      </button>
      <p role="status" className="result">
        {result && `Order ${result.id} placed, arrives at ${result.eta}.`}
      </p>
    </div>
  );
}
