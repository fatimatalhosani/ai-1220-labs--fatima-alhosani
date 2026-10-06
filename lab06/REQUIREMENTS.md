# Late fee for laptop loans

The campus library lends laptops. When a laptop comes back, the loan system calls
`late_fee(minutes_late)` from `fees.py`.

- `minutes_late` is a whole number of minutes, 0 or more. A laptop returned on time
  or early has `minutes_late` equal to 0.
- `late_fee` returns the fee in AED as a whole number.

## Acceptance criteria

**AC1.** A laptop returned on time costs nothing. Example: 0 minutes late costs 0.

**AC2.** A late laptop costs AED 2 for each day or part of a day that it is late.
One day is 1440 minutes. Examples: 1 minute late costs 2; 1440 minutes late costs 2;
1441 minutes late costs 4.

**AC3.** The fee is never more than AED 20 per loan. Example: 30 days late
(43200 minutes) costs 20.
