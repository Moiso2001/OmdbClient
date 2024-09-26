import { useEffect, useState } from "react";

import { saveMovieRated } from "../../services/ApiService";
import { StarRating } from "../utils/StarRating";
import { Card } from "../Card/Card";

import { OmdbMovieDTO } from "../../dto/OmdbMovie.dto";
import { MovieDTO } from "../../dto/Movie.dto";

import style from "./Cards.module.css"

type CardsProps = {
  movies: OmdbMovieDTO[]
}

/**
 * Component in charge to manage multiple cards, handle pagination and submitting movie 
 * reviews to be storaged on DB
 * 
 * @authjor mplata - 25/09/2024
 */
export function Cards({movies}: CardsProps) {
  /* Global States */
  const [page, setPage] = useState(0);
  const [message, setMessage] = useState<string>()
  const [error, setError] = useState<string>()
  const [openRating, setOpenRating] = useState<boolean>(false)
  const [movieRated, setMovieRated] = useState<MovieDTO>()

  /* Function Handlers */
  function handleNextMovie (){
    if(movies[page + 1]){
      setPage(prevPage => prevPage + 1)
    } else {
       setMessage("Thanks you have reached all movies!")

       setTimeout(() => {
        setMessage("");
       }, 3000);
    }
  }

  function handlePrevMovie (){
    if(movies[page - 1]){
      setPage(prevPage => prevPage - 1)
    } 
  }

  function handleRating(ratingValue: number) {
    setMovieRated((prevMovieRated) =>
      prevMovieRated ? { ...prevMovieRated, rating: ratingValue } : prevMovieRated
    );
  }

  function handleMovieRatedSubmit (){
    if(movieRated){
      saveMovieRated(movieRated)
        .then(data => {

          if(data){
            setMessage("Thanks for your opinion!")
            setTimeout(() => {
              setMessage("");
            }, 3000);
          } else {
            setMessage("You have already criticized this film.")
            setTimeout(() => {
              setMessage("");
            }, 3000);
          }
          
        })
        .catch(err => {
          setError("There was an issue submiting your opinion. Please try later!"); 
          console.error(err)
        })
    }

    setOpenRating(false)
    handleNextMovie()
  }

  /* React cycle management */
  useEffect(() => {
    if(openRating){
      const newMovie = movies[page]

      setMovieRated({
        title: newMovie.Title,
        year: newMovie.Year,
        imdbID: newMovie.imdbID,
        type: newMovie.Type,
        poster: newMovie.Poster
      })
    } else {
      setMovieRated(undefined)
    }
  }, [openRating, page])

  useEffect(() => {
    setPage(0)
  }, [movies])

  if(movies && movies.length > 0){
    return (
      <div className={style.div_global}>
        {/* Card carrousel */}
        <div>
          {<Card movie={movies[page]}/>}
        </div>

        <div className={style.div_features}>
          {/* Buttons */}
          <div className={style.div_buttons}>
            <button
              type="button" 
              className="btn btn-dark"
              onClick={handlePrevMovie}
              disabled={page === 0}
            >
              Previous
            </button>
            <button 
              type="button" 
              className="btn btn-dark"
              onClick={_ => setOpenRating(prevState => !prevState)}
            >Rate</button>
            <button 
              type="button" 
              className="btn btn-dark"
              onClick={handleNextMovie}
              disabled={error !== undefined && error.length > 0}
            >Next</button>
          </div>

          {/* Informative Messages */}
          <div>
            {error !== undefined && error.length > 0
              ? <span>{error}</span>
              : <></>
            }
            {message !== undefined && message.length > 0
              ? <span>{message}</span>
              : <></>
            }
          </div>     

          {/* Rate Options */}
          {openRating &&
            <div className={style.features__div_feedback}>
              <div className={style.feedback__div_inputs}>
                <textarea 
                  name="comment"
                  className="form-control"
                  placeholder="Let us know your opinion..."
                  value={movieRated?.comments}
                  onChange={(e) =>
                    setMovieRated((prevMovieRated) =>
                      prevMovieRated
                        ? { ...prevMovieRated, comments: e.target.value }
                        : prevMovieRated
                    )
                  }
                />
                <StarRating handleRating={handleRating}/>
              </div>

              <div>
                <button 
                  type="button" 
                  className="btn btn-outline-success btn-dark"
                  onClick={handleMovieRatedSubmit}
                  disabled={!movieRated?.comments || !movieRated?.rating}
                > Save</button>
              </div>
            </div>
          }
          
        </div>
      </div>
    );
  } else {
    return (
      <>
        <span>There are no movies here...</span>
      </>
    )
  }
  
}