import { useState } from 'react';
import Welcome from './Welcome.jsx';
import DrinkCard from './DrinkCard.jsx';

export default function App() {
  const [cups, setCups] = useState(0);

  return (
    <main className="cart">
      <Welcome />

      <div className="menu">
        <DrinkCard name="Latte" price={15} />
        <DrinkCard name="Tea" price={8} />
        <DrinkCard name="Hot chocolate" price={12} />
      </div>

      <p className="order">Cups ordered: {cups}</p>
      {cups >= 3 && <p className="offer">Free cookie with your order!</p>}

      <div>
        <button type="button" onClick={() => setCups((current) => current + 1)}>
          Add a cup
        </button>
        <button type="button" onClick={() => setCups(0)}>
          Clear order
        </button>
      </div>
    </main>
  );
}
