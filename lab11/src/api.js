// A stand-in for the café's order server. It runs in the browser, stores nothing and
// answers after a pause, as a real request over the network would.
const WAIT_MS = import.meta.env.MODE === 'test' ? 50 : 1500;

export function placeOrder(items) {
  return new Promise((resolve) => {
    setTimeout(() => resolve({ id: 2741, eta: '19:40', items: items.length }), WAIT_MS);
  });
}
