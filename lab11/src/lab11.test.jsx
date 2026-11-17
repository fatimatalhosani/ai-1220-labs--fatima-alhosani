// Public checks for Lab 11. Run them with: npm test
// The marking runs more checks of the same kind, with other names, prices and times.
import { describe, expect, test, vi } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import SignUpForm from './SignUpForm.jsx';
import Checkout from './Checkout.jsx';
import Inbox from './Inbox.jsx';
import PickupTime from './PickupTime.jsx';
import TicketOffer from './TicketOffer.jsx';
import { MESSAGES } from './validate.js';

// A field found by its name; disabled means the disabled attribute or aria-disabled="true".
const field = (label) => screen.getByRole('textbox', { name: new RegExp(`^${label}`) });
const isOff = (el) => el.disabled || el.getAttribute('aria-disabled') === 'true';

describe('Exercise 1: sign-up form', () => {
  test('every field has a visible label', () => {
    render(<SignUpForm />);
    for (const name of ['Full name', 'Mobile number', 'Email']) {
      expect(screen.getByLabelText(name)).toBeInTheDocument();
      expect(screen.getByText(name)).toBeVisible();
    }
  });
  test('a wrong mobile number is explained at its field, and the typing stays', async () => {
    const user = userEvent.setup();
    render(<SignUpForm />);
    await user.type(field('Full name'), 'Sara Haddad');
    await user.type(field('Mobile number'), '050 12');
    await user.type(field('Email'), 'sara@example.com');
    await user.click(screen.getByRole('button', { name: 'Create account' }));
    const mobile = field('Mobile number');
    expect(mobile).toHaveAttribute('aria-invalid', 'true');
    expect(mobile).toHaveAccessibleDescription(MESSAGES.mobile);
    expect(mobile).toHaveAccessibleName('Mobile number');
    expect(mobile).toHaveValue('050 12');
  });
});

describe('Exercise 2: place an order', () => {
  test('the button answers at once and the result is announced', async () => {
    const user = userEvent.setup();
    render(<Checkout />);
    await user.click(screen.getByRole('button', { name: 'Place order' }));
    expect(isOff(screen.getByRole('button', { name: /^Placing order(…|\.\.\.)$/ }))).toBe(true);
    await waitFor(() => expect(screen.getByRole('status')).toHaveTextContent('Order 2741 placed, arrives at 19:40.'));
  });
});

describe('Exercise 3: inbox', () => {
  test('each delete button is named after its message', () => {
    render(<Inbox />);
    expect(screen.getByRole('button', { name: 'Delete Lab report draft' })).toBeInTheDocument();
  });
  test('delete happens at once and Undo brings the message back', async () => {
    const user = userEvent.setup();
    const ask = vi.spyOn(window, 'confirm').mockReturnValue(true);
    render(<Inbox />);
    await user.click(screen.getByRole('button', { name: 'Delete Lab report draft' }));
    expect(ask).not.toHaveBeenCalled();
    expect(screen.queryByText('Lab report draft')).not.toBeInTheDocument();
    await user.click(screen.getByRole('button', { name: 'Undo' }));
    expect(screen.getByText('Lab report draft')).toBeInTheDocument();
  });
});

describe('Exercise 4: pickup time', () => {
  test('each pickup time is a choice on the screen, and a full one cannot be chosen', () => {
    render(<PickupTime />);
    expect(screen.queryByRole('textbox')).not.toBeInTheDocument();
    expect(screen.getByRole('radio', { name: '12:30, 3 left' })).toBeEnabled();
    expect(isOff(screen.getByRole('radio', { name: '12:45, full' }))).toBe(true);
  });
});

describe('Exercise 5: concert ticket', () => {
  test('nothing extra is ticked and the full price is on the button', () => {
    render(<TicketOffer />);
    expect(screen.getByRole('checkbox', { name: 'Ticket protection · AED 8' })).not.toBeChecked();
    expect(screen.getByRole('button', { name: 'Pay AED 65' })).toBeInTheDocument();
  });
  test('the way out is a plain No thanks', () => {
    render(<TicketOffer />);
    expect(screen.getByRole('button', { name: 'No thanks' })).toBeInTheDocument();
  });
});
