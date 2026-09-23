import { NavLink, Link } from 'react-router';

export default function SavedList({ list }) {
  return (
    <div className="saved-list">
      <h3>Saved Movies:</h3>
      {list.map(movie => (
        <NavLink
          key={movie.id}
          to={`/movies/${movie.id}`}
          className={({ isActive }) => (isActive ? 'saved-movie saved-active' : 'saved-movie')}
        >
          {movie.title}
        </NavLink>
      ))}
      <Link to="/" className="home-button">
        Home
      </Link>
    </div>
  );
}
