import MovieCard from "../components/MovieCard";
import { useState, useEffect } from "react";
import "../css/Home.css";
import { SearchMovies, fetchPopularMovies } from "../services/api";

function Home() {
    const [searchQuery, setSearchQuery] = useState("");
    const [movies, setMovies] = useState([]);
    const [error, setError] = useState(null); 
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadPopularMovie = async () => {
            try {
                const popularMovies = await fetchPopularMovies();
                setMovies(popularMovies);
            } catch (err) {
                console.log(err);
                setError("Failed to load movies ...");
            } finally {
                setLoading(false);
            }
        };
        loadPopularMovie();
    }, []);

    const handlesSearch = async (e) => {
        e.preventDefault();
        if (!searchQuery.trim()) return
        if(loading) return

        setLoading(true)  
        try{
          const searchResults  =await SearchMovies(searchQuery)
          setMovies(searchResults)
          setError(null)
        }catch(err){
            console.log(err)
           setError("Faild to search movies ...")
        }finally{
            setLoading(false)
        }

    };

    return (
        <div className="home">
            <form onSubmit={handlesSearch} className="search-form">
                <input
                    value={searchQuery}
                    type="text"
                    placeholder="search for movies ... "
                    className="search-input"
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
                <button type="submit" className="search-button">Search</button>
            </form>

            {error && <div className="error-message">{error}</div>}
            {loading ? <div className="loading">Loading...</div> :
                <div className="movies-grid">
                    {movies.map((movie) => (
                        <MovieCard movie={movie} key={movie.id} />
                    ))}
                </div>
            }
        </div>
    );
}

export default Home;