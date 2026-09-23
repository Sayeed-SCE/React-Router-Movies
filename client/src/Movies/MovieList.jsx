import { Link } from 'react-router';

import MovieCard from './MovieCard';

export default function MovieList({ movies }) {
  return (
    <div className="movie-list">
      {movies.map(movie => (
        <Link key={movie.id} to={`/movies/${movie.id}`} className="movie-link">
          <MovieCard movie={movie} />
        </Link>
      ))}
    </div>
  );
}
