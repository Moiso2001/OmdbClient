import { OmdbMovieDTO } from "../../dto/OmdbMovie.dto";

import style from "./Card.module.css";

type CardProps = {
  movie: OmdbMovieDTO 
}

/**
 * Individual card will display the movie data
 * 
 * @author mplata - 25/09/2024
 */
export function Card({movie}: CardProps) {
  return (
    <div className={style.div_global}>  
        <div>
            <div>
              <img src={movie.Poster}/>
            </div>
            <div className={style.div_title}>
              <h3>{movie.Title}</h3>
              <p>{movie.Year}</p>
            </div>
        </div>

        <div className={style.div_extra}>
          <a href={`https://www.imdb.com/title/${movie.imdbID}/`} target="__BLANK" rel="noopener noreferrer">IMDb Review</a>
        </div>
    </div>
  );
}