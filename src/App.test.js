import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from './App';

describe('initial renders', () => {
  beforeEach(() => render(<App />));

  test('input text field', () => {
    const inputField = screen.getByRole('textbox', { name: 'Enter a number:' });
    expect(inputField).toHaveValue('1');
  });

  test('search button', () => {
    const searchButton = screen.getByRole('button', { name: 'Search' });
    expect(searchButton).toBeInTheDocument();
  });

  test('pokemon name appears', async () => {
    const pokemonName = await screen.findByText(/bulbasaur/i);
    expect(pokemonName).toHaveTextContent(/bulbasaur/i);
  });
});

describe('user actions', () => {
  beforeEach(() => render(<App />));

  test('on user input, display new pokemon', async () => {
    const inputField = screen.getByRole('textbox', { name: 'Enter a number:' });
    userEvent.clear(inputField);
    userEvent.type(inputField, '2');

    const searchButton = screen.getByRole('button', { name: 'Search' });
    userEvent.click(searchButton);

    const pokemonName = await screen.findByText(/pikachu/i);
    expect(pokemonName).toHaveTextContent(/pikachu/i);
  });

  test('on invalid input, display error', async () => {
    const inputField = screen.getByRole('textbox', { name: 'Enter a number:' });
    userEvent.clear(inputField);
    userEvent.type(inputField, 'll');

    const searchButton = screen.getByRole('button', { name: 'Search' });
    userEvent.click(searchButton);

    const errorText = await screen.findByText(/cannot get pokemon/i);
    expect(errorText).toHaveTextContent(/cannot get pokemon/i);
  });
});
