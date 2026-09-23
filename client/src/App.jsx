import { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router';
import axios from 'axios';

import SavedList from './Movies/SavedList';
import MovieList from './Movies/MovieList';
import Movie from './Movies/Movie';

export default function App() {
  const [saved, setSaved] = useState([]);
  const [movieList, setMovieList] = useState([]);

  useEffect(() => {
    const controller = new AbortController();
    axios
      .get('/api/movies', { signal: controller.signal })
      .then(response => setMovieList(response.data))
      .catch(error => {
        if (!axios.isCancel(error)) console.error('Server Error', error);
      });
    return () => controller.abort();
  }, []);

  const addToSavedList = movie => {
    setSaved(prev => (prev.some(m => m.id === movie.id) ? prev : [...prev, movie]));
  };

  return (
    <div>
      <SavedList list={saved} />

      <Routes>
        <Route path="/" element={<MovieList movies={movieList} />} />
        <Route path="/movies/:id" element={<Movie addToSavedList={addToSavedList} />} />
        <Route path="*" element={<div className="not-found">Page not found.</div>} />
      </Routes>
    </div>
  );
}
