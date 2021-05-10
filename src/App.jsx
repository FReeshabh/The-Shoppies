import React, {useState, useEffect} from 'react';
import Movie from './components/Movie';
import Button from '@material-ui/core/Button';

function App() {
    const APP_KEY="df9d5122" //API key should be hidden, but oof
    const [movies, setMovies] = useState([])
    const [query, setQuery] = useState('shop')
    const [search, setSearch] = useState('shop')
    const [nominations, setNominations] = useState([])
  
    useEffect(() => {
       getMovies()
       getSearch()
    }, [query, search])

    //fetch the movies
    const getMovies = async () => {
      const response = await fetch(
        `https://www.omdbapi.com/?s=${query}&apikey=${APP_KEY}`
      );
      const data = await response.json();
      setMovies(data.Search)
      console.log(data.Search);
    }
    
    //update and set Search value
    const updateSearch = e => {
      setSearch(e.target.value);
    }
    
    //set the search term to send to the query
    const getSearch = e => {
      setQuery(search.trim());
    }

    //function to add a movie to the nomination list
    const addNomination = film => {
      if(!nominations.includes(film)){
        const newNomination = [film, ...nominations]
        setNominations(newNomination)
        console.log(nominations);
      }
      console.log(nominations.length);
      if(nominations.length > 3){ // Starts counting from 0, so will trigger at 5 nominations
        // showBanner()
        alert("You have added 5 or more nominated movies")
      }
    }

    // Function to remove the nominations based on the IMDBId
    function removeNomination(id) { 
      const newNomination = nominations.filter((film) => film.imdbID !== id)
      setNominations(newNomination)
      console.log(nominations);
    }
    
  return (
    //indentations being a nightmare here
  <div className="App">
    <form className="search-form" 
      onSubmit={getSearch} 
      onChange={getSearch}>
      <h1 className="title-text">The Shoppies: Movie awards for entrepreneurs</h1>
      <input className="search-bar" type="text" value={search} onChange={updateSearch} /> <button className="search-button" type="submit">Search</button>
    </form>

    {/* show number of results found */}
    <h3>{(movies && movies.length > 0) ? movies.length: "1"} Result(s) for "<b>{query}</b>"</h3>
    <div className="MOV">
      {/* Probably could've made a component for this */}
      <div className="movies-list">
        {movies ? movies.map(movie => (
        <ul>
          <li><Movie
          id={movie.imdbID}
          title = {movie.Title}
          year = {movie.Year}
          img = {movie.Poster}
          ></Movie> 
          <Button className="Button" disabled={nominations.includes(movie)} onClick={() => {addNomination(movie)}}>Nominate</Button>
          </li>
          </ul>
    )) : <h3> <i>No results found for "{query}"</i></h3>}
    </div>

    <div className="nominations-list">
      <h3>Nominations</h3>
      {nominations.map(nomination => (
        <ul>
          <li>
            <Movie
               id={nomination.imdbID}
               title = {nomination.Title}
               year = {nomination.Year}
               img = {nomination.Poster}
             />
              <Button className="Button" onClick={() => {removeNomination(nomination.imdbID)}}>Remove Nomination</Button>
          </li>
        </ul>
      ))}
      {/* life is closing div tags */}
      </div>
      </div>
      </div>
  );
}

export default App;