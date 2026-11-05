// Public checks for Exercise 2. Run all checks with: npm test
import { afterEach, expect, test } from 'vitest';
import { cleanup, render, screen } from '@testing-library/react';
import DrinkCard from './DrinkCard.jsx';

afterEach(cleanup);

// The price paragraph, matched on its whole text so inner tags such as <strong> are fine.
const priceLine = (text) => (_, el) => el.tagName === 'P' && el.textContent.replace(/\s+/g, ' ').trim() === text;


test('E2: DrinkCard shows the name and the price from its props', () => {
  render(<DrinkCard name="Mocha" price={17} />);
  expect(screen.getByRole('heading', { level: 2, name: 'Mocha' })).toBeTruthy();
  expect(screen.getByText(priceLine('AED 17'))).toBeTruthy();
});
