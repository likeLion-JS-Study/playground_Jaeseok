import { useState, useEffect, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import MovieDetail from '../components/MovieDetail';

function Detail() {
  const [loading, setLoading] = useState(true);
  const [movie, setMovie] = useState([]);
  const { id } = useParams();
  const getMovie = useCallback(async () => {
    const json = await (await fetch(`https://yts.mx/api/v2/movie_details.json?movie_id=${id}`)).json();
    setMovie(json.data.movie);
    setLoading(false);
    console.log(json);
  }, [id])
  useEffect(() => {
    getMovie();
  }, [getMovie])
  return (
    <>
    {
      loading ?
        (<h1> Loading...</h1 >) : (
            <div>
              <MovieDetail
                title = {movie.title_long}
                src = {movie.medium_cover_image}
                description = {movie.description_full}
                rating = {movie.rating}
                geners = {movie.genres}
              />
            </div>
          )}
    </>
  )
}

export default Detail;