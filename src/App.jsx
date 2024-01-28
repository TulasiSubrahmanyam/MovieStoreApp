import { useState, useEffect } from 'react';
import SearchIcon from "./assets/searchIcon.svg";
import './App.css';
import MovieCard from './MovieCard';

// Use HTTPS for the API_URL
const API_URL = "https://www.omdbapi.com/?i=tt3896198&apikey=5470d370";

function App() {
  const [searchTerm, setSearchTerm] = useState("");
  const [movieData, setMovieData] = useState([]);
  const [error, setError] = useState(null);

  const searchMovies = async (title) => {
    try {
      const response = await fetch(`${API_URL}&s=${title}`);
      
      if (!response.ok) {
        setError(response.status);
        console.log(response.status);
      }

      const data = await response.json();
      setMovieData(data.Search);
      console.log(data.Search);
      setError(null); // Clear any previous errors if successful
    } catch (error) {
      console.error(`An error occurred: ${error.message}`);
      setMovieData(null);
      setError(error.message); // Set the error message in the state
    }
  }

  useEffect(() => {
    searchMovies('Batman');
  }, []);

  return (
    <div className="app">
      <h1>Movie Store</h1>

      <div className="search">
        <input
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search for movies"
        />
        <img
          src={SearchIcon}
          alt="search"
          onClick={() => searchMovies(searchTerm)}
        />
      </div>
      {error && <p>Error: {error}</p>}

      {movieData?.length > 0 ? (
        <div className="container">
          {movieData.map((movie) => (
            <MovieCard key={movie.imdbID} movie={movie} />
          ))}
        </div>
      ) : (
        <div className="empty">
          <h2>No movies found</h2>
        </div>
      )}
    </div>
  );
}

export default App;
