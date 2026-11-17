// The content shown on the five screens. All names and prices are made up.
export const ORDER = [
  { item: 'Chicken shawarma ×2', price: 38 },
  { item: 'Falafel wrap', price: 14 },
  { item: 'Delivery', price: 6 },
];

export const INBOX = [
  { id: 1, from: 'Leila', subject: 'Lab report draft' },
  { id: 2, from: 'Course office', subject: 'Room change for Thursday' },
  { id: 3, from: 'Omar', subject: 'Football on Friday?' },
];

// time: the pickup time; left: how many orders the café can still take for that time.
export const SLOTS = [
  { time: '12:30', left: 3 },
  { time: '12:45', left: 0 },
  { time: '13:00', left: 5 },
  { time: '13:15', left: 2 },
];

// Prices in AED. fee: the service fee charged on every ticket; protection: the optional extra.
export const TICKET = { name: 'Campus concert ticket', price: 60, fee: 5, protection: 8 };
