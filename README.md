# React Router Movies

**[▶ Live demo](https://sayeed-sce.github.io/React-Router-Movies/)**: runs entirely in the browser; API responses are served by a built-in demo mode that uses the same logic as the Express server.

A small single-page app for browsing movies, built on the BloomTech "Client Side Routing" project and updated to a current stack:

- **React 19** with **React Router 8** (declarative `BrowserRouter` / `Routes`)
- **Vite** dev server and build (replaces the deprecated Create React App)
- **Vitest** + **React Testing Library** for tests
- **Express 5** API server

## Features

- `/` lists every movie; clicking a card opens `/movies/:id`
- The detail page shows the movie's stars and has a **Save** button
- Saved movies appear in the top bar (each one only once); the active one is highlighted
- **Home** returns to the list; unknown movies and routes show a "not found" message

## Running locally

You need Node 20.19+ and two terminals.

```bash
# Terminal 1: API server on http://localhost:5001
npm install
npm start

# Terminal 2: client on http://localhost:3000
cd client
npm install
npm start
```

The Vite dev server proxies `/api/*` to the Express server, so the client uses relative URLs. Set `PORT` to run the API on a different port, and update `client/vite.config.js` to match.

## Scripts (in `client/`)

| Command         | What it does                     |
| --------------- | -------------------------------- |
| `npm start`     | Start the Vite dev server        |
| `npm test`      | Run the Vitest suite             |
| `npm run build` | Build to `client/dist`           |
| `npm run preview` | Serve the production build     |

## API

| Method | Path              | Response                                        |
| ------ | ----------------- | ----------------------------------------------- |
| GET    | `/api/movies`     | All movies (id, title, director, metascore)     |
| GET    | `/api/movies/:id` | One movie including `stars`, or 404             |
| POST   | `/api/movies`     | Adds a movie (in memory) and returns the list   |

## Deploying the demo

```bash
npm run build:demo   # static build for GitHub Pages (run in client/)
```

The output is published to the `gh-pages` branch.
