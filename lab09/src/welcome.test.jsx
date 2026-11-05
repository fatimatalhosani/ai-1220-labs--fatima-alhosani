// Public check for Exercise 1. Run all checks with: npm test
import { afterEach, expect, test } from 'vitest';
import { cleanup, render, screen } from '@testing-library/react';
import Welcome from './Welcome.jsx';

afterEach(cleanup);

test('E1: Welcome shows the title and the opening hours', () => {
  render(<Welcome />);
  expect(screen.getByRole('heading', { level: 1, name: 'Campus Coffee Cart' })).toBeTruthy();
  expect(screen.getByText('Open every day from 8:00 to 16:00')).toBeTruthy();
});
