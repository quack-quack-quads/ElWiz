import { render, screen } from '@testing-library/react';
import Lander from './Lander';

test('renders the hero element', () => {
  render(<Login />);
  const hero = screen.getByTestId("hero")
  expect(hero).toBeInTheDocument();
});