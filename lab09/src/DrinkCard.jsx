export default function DrinkCard({ name, price }) {
  return (
    <section className="drink">
      <h2>{name}</h2>
      <p>AED {price}</p>
    </section>
  );
}
