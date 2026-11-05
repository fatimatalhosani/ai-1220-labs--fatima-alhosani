// Public checks for Exercises 1 to 4 on the whole page. Run all checks with: npm test
// They draw App in a simulated browser, click the buttons by their names and read the screen.
import { afterEach, expect, test } from 'vitest';
import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import App from './App.jsx';

afterEach(cleanup);

const click = (name) => fireEvent.click(screen.getByRole('button', { name }));
const cups = (n) => screen.getByText(new RegExp(`^\\s*cups\\s+ordered:\\s*${n}\\s*$`, 'i'));

test('E1: the page shows Welcome', () => {
  render(<App />);
  expect(screen.getByRole('heading', { level: 1, name: 'Campus Coffee Cart' })).toBeTruthy();
});

test('E2: the page shows the three drinks in order', () => {
  render(<App />);
  const names = screen.getAllByRole('heading', { level: 2 }).map((h) => h.textContent);
  expect(names).toEqual(['Latte', 'Tea', 'Hot chocolate']);
});

test('E3: Add a cup counts the cups', () => {
  render(<App />);
  expect(cups(0)).toBeTruthy();
  click('Add a cup');
  click('Add a cup');
  expect(cups(2)).toBeTruthy();
});

test('E4: the offer appears at three cups and Clear order starts again', () => {
  render(<App />);
  click('Add a cup');
  click('Add a cup');
  expect(screen.queryByText('Free cookie with your order!')).toBeNull();
  click('Add a cup');
  expect(screen.getByText('Free cookie with your order!')).toBeTruthy();
  click('Clear order');
  expect(cups(0)).toBeTruthy();
  expect(screen.queryByText('Free cookie with your order!')).toBeNull();
});
