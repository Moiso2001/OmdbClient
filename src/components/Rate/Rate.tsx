import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { deleteMovie, getAllDbMovies } from "../../services/ApiService";
import { NativeCard } from "../NativeCard/NativeCard";

import { MovieDTO } from "../../dto/Movie.dto";

import { FaHome } from "react-icons/fa";

import style from "./Rate.module.css";

/**
 * Rate route will save and show the movies already rated by the user
 * 
 * @author mplata - 25/09/2024
 */
export function Rate() {
  /* Global States */
  const [moviesRated, setMoviesRated] = useState<MovieDTO[]>();
  const [isDeleted, setIsDeleted] = useState(false);

  /* Function handlers */
  function handleDeleteMovie(id: number | undefined){
    if(id){
        deleteMovie(id)
            .then(data => {
              alert(data.message);
              setIsDeleted(true);
            })
            .catch(err => console.error(err))
    }
  }

  /* React cycle management */
  useEffect(() => {
    getAllDbMovies()
      .then(data => {
        setMoviesRated(data);
        setIsDeleted(false);
      })
      .catch(err => console.error(err))
  }, [isDeleted])

  return (
    <div className={style.div_global}>
      {/* Header */}
        <div className={style.div_header}>
          <h2>Your movies</h2>

          <Link to="/">
            <FaHome className={style.header__icon_home}/>
          </Link>
        </div>

        <hr/>

      {/* Movie Cards Carousel */}
        <div className={style.div_movies}>
          {moviesRated !== undefined
            ? moviesRated.map(movie => <NativeCard deleteMovie={handleDeleteMovie} movie={movie}/>)
            : <span>There are no movies here...</span>
          }
        </div>
    </div>
  );
}