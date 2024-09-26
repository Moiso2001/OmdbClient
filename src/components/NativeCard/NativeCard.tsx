import { MovieDTO } from "../../dto/Movie.dto";

import { FaRegTrashAlt } from "react-icons/fa";
import { FaStar } from "react-icons/fa"

import style from "./NativeCard.module.css";


type NativeCadProps ={
    movie: MovieDTO
    deleteMovie: Function
}

/**
 * This card will represent the movies brought from DB and not from the API, this will include rate and comment.
 * 
 * @author mplata - 25/09/2024
 */
export function NativeCard({movie, deleteMovie}: NativeCadProps) {
  return (
    <div className={style.div_global}>
        <div>
            <div>
                <img src={movie.poster}/>
            </div>

            <div className={style.div_title}>
                <h3>{movie.title}</h3>
                <FaRegTrashAlt
                    onClick={_ => deleteMovie(movie.id)}
                    style={{cursor: "pointer"}}
                />
            </div>

            <div className={style.div_rate}>
                <FaStar style={{color: "rgb(228, 228, 8)"}}/>
                <span>{movie.rating}</span>
            </div>
            
            <div className={style.div_comments}>
                <textarea 
                  name="comment"
                  className="form-control"
                  placeholder="Let us know your opinion..."
                  value={movie.comments}
                />
            </div>
        </div>
    </div>
  );
}