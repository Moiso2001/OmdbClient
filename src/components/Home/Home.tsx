import { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { getMoviesByTitle } from "../../services/ApiService";
import { Cards } from "../Cards/Cards";

import { OmdbMovieDTO } from "../../dto/OmdbMovie.dto";

import 'bootstrap/dist/css/bootstrap.min.css';
import { FaStar } from "react-icons/fa";
import style from "./Home.module.css"

/**
 * Home route component, will handle search funcionality and request of movies to API
 * 
 * @author mplata - 25/09/2024
 */
export function Home () {
    /* Global States */
    const [movies, setMovies] = useState<OmdbMovieDTO[]>()

    const [input, setInput] = useState<string>()
    const [error, setError] = useState<string | undefined>()

    /* Function handlers */
    function handleOnSubmit (e: React.FormEvent<HTMLFormElement>) {
      e.preventDefault()

      if(input){
          getMoviesByTitle(input)
              .then(data => {
                  console.log(data)
                  if(data?.Response === "True"){
                      setMovies(data.Search)
                  }
              })
              .catch(err => console.error(err))
      }
    }

    /* React cycle management, and input validation */
    const validateInput = useCallback(() => {
        const isValid = /^[a-zA-Z0-9 ]*$/.test(input || "");

        if(!isValid){
            setError("Input must be alphanumeric characters only.")
            return
        }

        if(input && input.length > 50){
            setError("A maximum of 50 characters is allowed.")
            return
        }

        setError(undefined)
    }, [input])

    useEffect(() => {
        validateInput()
    }, [validateInput])

    return (
      <div className={style.div_global}>
        {/* Header */}
        <div className={style.div_header}>
          <Link 
            to="/rates"
            style={{textDecoration: "none", color: "white"}}
          >
            <div className={style.header__div_star}>
                <FaStar/>
            </div>
          </Link>
          
          {/* Search Input */}
          <div className={style.div_form}>
            <form onSubmit={handleOnSubmit}>
              <input
                className="form-control me-2"
                type="search"
                placeholder="Search"
                aria-label="Search"
                value={input}
                onChange={e => setInput(e.target.value)}
              />
              <button 
                  className="btn btn-outline-success btn btn-light" 
                  type="submit"
                  disabled={error !== undefined && error.length > 0}
              >
                Search
              </button>
            </form>

            {error !== undefined && error.length > 0
              ? <div className={style.form__div_error}>
                  <span>{error}</span>
                </div>
              : <></>
            }
          </div>
        </div>

        {/* Body */}
        <div className={style.div_body}>
          <div className={style.body__div_description}>
              <h3>What do you think?</h3>
          </div>

          {/* Cards */}
          <Cards movies={movies && movies.length > 0 ? movies : []}/>
        </div>
      </div>
    );
}