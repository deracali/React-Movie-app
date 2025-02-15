import "./App.css";
import MovieCard from "./MovieCard";
import Header from "./Headder";
import SearchIcon from "./search.svg";
import React, { useState, useEffect } from "react";
import Home from "./Home";

const API_URL = "https://www.omdbapi.com?apikey=f28b8592";

const App = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    searchMovies("Batman");
  }, []);

  const searchMovies = async (title) => {
    const response = await fetch(`${API_URL}&s=${title}`);

    const data = await response.json();

    setMovies(data.Search);
  };

  return (
    <>
      <Header title="MyTestApp" />
      <Home title="Watch something incredible." />
      <div className="search mt-0 md:mt-12 bg-white  px-9 shadow-3xl  ">
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

      <div className="app -mt-12">
        {movies?.length > 0 ? (
          <div className="container">
            {movies.map((movie) => (
              <MovieCard movie={movie} />
            ))}
          </div>
        ) : (
          <div className="empty">
            <h2>No movies found</h2>
          </div>
        )}
      </div>
    </>
  );
};

export default App;
