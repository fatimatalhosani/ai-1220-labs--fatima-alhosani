import SignUpForm from './SignUpForm.jsx';
import Checkout from './Checkout.jsx';
import Inbox from './Inbox.jsx';
import PickupTime from './PickupTime.jsx';
import TicketOffer from './TicketOffer.jsx';

// The five screens of Campus Hub, one under the other. You do not need to change this file.
export default function App() {
  return (
    <main className="page">
      <h1>Campus Hub</h1>
      <section aria-labelledby="s1"><h2 id="s1">1. Create an account</h2><SignUpForm /></section>
      <section aria-labelledby="s2"><h2 id="s2">2. Your food order</h2><Checkout /></section>
      <section aria-labelledby="s3"><h2 id="s3">3. Inbox</h2><Inbox /></section>
      <section aria-labelledby="s4"><h2 id="s4">4. Café pickup time</h2><PickupTime /></section>
      <section aria-labelledby="s5"><h2 id="s5">5. Concert ticket</h2><TicketOffer /></section>
    </main>
  );
}
