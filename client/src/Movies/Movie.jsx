import { useState, useEffect } from 'react';
import { useParams } from 'react-router';
import axios from 'axios';

import MovieCard from './MovieCard';

export default function Movie({ addToSavedList }) {
  const { id } = useParams();
  const [movie, setMovie] = useState();
  const [error, setError] = useState(null);

  useEffect(() => {
    const controller = new AbortController();
    setMovie(undefined);
    setError(null);
    axios
      .get(`/api/movies/${id}`, { signal: controller.signal })
      .then(response => setMovie(response.data))
      .catch(err => {
        if (axios.isCancel(err)) return;
        setError(err.response?.status === 404 ? 'Movie not found.' : 'Could not load this movie.');
      });
    return () => controller.abort();
  }, [id]);

  if (error) {
    return <div className="movie-error">{error}</div>;
  }

  if (!movie) {
    return <div>Loading movie information...</div>;
  }

  return (
    <div className="save-wrapper">
      <MovieCard movie={movie} showStars />
      <button type="button" className="save-button" onClick={() => addToSavedList(movie)}>
        Save
      </button>
    </div>
  );
}
