import axios, { AxiosError } from 'axios';

import movies from '../../data/movies.json';

// Demo mode (static hosting, no Express server): answer the app's /api requests
// in the browser with the same data and responses as server.js.
function respond(config, status, data) {
  const response = { data, status, statusText: String(status), headers: {}, config, request: {} };
  if (status >= 400) {
    return Promise.reject(
      new AxiosError(`Request failed with status code ${status}`, AxiosError.ERR_BAD_REQUEST, config, {}, response)
    );
  }
  return Promise.resolve(response);
}

export function installDemoApi() {
  axios.defaults.adapter = config => {
    const path = config.url.replace(/\/$/, '');

    if (path === '/api/movies') {
      return respond(config, 200, movies.map(({ id, title, director, metascore }) => ({ id, title, director, metascore })));
    }

    const match = path.match(/^\/api\/movies\/([^/]+)$/);
    if (match) {
      const movie = movies.find(m => m.id.toString() === match[1]);
      return movie
        ? respond(config, 200, movie)
        : respond(config, 404, { message: `Movie ${match[1]} not found` });
    }

    return respond(config, 404, { message: 'Not found' });
  };
}
