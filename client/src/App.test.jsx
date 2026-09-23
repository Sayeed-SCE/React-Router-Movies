import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router';
import axios from 'axios';

import App from './App';

vi.mock('axios');

const movies = [
  { id: 0, title: 'The Godfather', director: 'Francis Ford Coppola', metascore: 100 },
  { id: 1, title: 'Star Wars', director: 'George Lucas', metascore: 92 },
];

const details = {
  0: { ...movies[0], stars: ['Marlon Brando', 'Al Pacino'] },
  1: { ...movies[1], stars: ['Mark Hamill', 'Harrison Ford'] },
};

beforeEach(() => {
  axios.isCancel.mockReturnValue(false);
  axios.get.mockImplementation(url => {
    if (url === '/api/movies') return Promise.resolve({ data: movies });
    const id = url.split('/').pop();
    if (details[id]) return Promise.resolve({ data: details[id] });
    return Promise.reject({ response: { status: 404 } });
  });
});

function renderAt(path) {
  return render(
    <MemoryRouter initialEntries={[path]}>
      <App />
    </MemoryRouter>
  );
}

const savedList = () => within(screen.getByText('Saved Movies:').parentElement);

test('lists movies on the home route', async () => {
  renderAt('/');
  expect(await screen.findByText('The Godfather')).toBeInTheDocument();
  expect(screen.getByText('Star Wars')).toBeInTheDocument();
  expect(screen.queryByText('Actors')).not.toBeInTheDocument();
});

test('clicking a movie opens its detail page with stars', async () => {
  const user = userEvent.setup();
  renderAt('/');
  await user.click(await screen.findByText('Star Wars'));
  expect(await screen.findByText('Mark Hamill')).toBeInTheDocument();
  expect(axios.get).toHaveBeenCalledWith('/api/movies/1', expect.anything());
});

test('saving a movie adds it to the saved list only once', async () => {
  const user = userEvent.setup();
  renderAt('/movies/0');
  const save = await screen.findByRole('button', { name: 'Save' });
  await user.click(save);
  await user.click(save);
  expect(savedList().getAllByText('The Godfather')).toHaveLength(1);
});

test('Home button navigates back to the list', async () => {
  const user = userEvent.setup();
  renderAt('/movies/1');
  await screen.findByText('Mark Hamill');
  await user.click(screen.getByRole('link', { name: 'Home' }));
  expect(await screen.findByText('The Godfather')).toBeInTheDocument();
  expect(screen.queryByText('Mark Hamill')).not.toBeInTheDocument();
});

test('shows an error for an unknown movie', async () => {
  renderAt('/movies/99');
  expect(await screen.findByText('Movie not found.')).toBeInTheDocument();
});

test('shows not found for unknown routes', () => {
  renderAt('/nope');
  expect(screen.getByText('Page not found.')).toBeInTheDocument();
});
