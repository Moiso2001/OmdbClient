import { MovieDTO } from '../dto/Movie.dto';
import { OmdbResponseDTO } from '../dto/OmdbResponse.dto'; 

const baseUrl = import.meta.env.VITE_BACKEND_URL || "";

/**
 * Main api call to retreive data from omdb by title, this is passed by our backend
 * 
 * @param title 
 * @returns Promise
 * @author mplata - 25/09/2024
 */
export const getMoviesByTitle = async (title: string): Promise<OmdbResponseDTO | undefined> => {
    try {
        const url = `${baseUrl}/${title}`;
  
        const response = await fetch(url);
        
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
      
        const data: OmdbResponseDTO = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching movies:', error);
    }
};

/**
 * Will get all the movies rated on our DB
 * 
 * @returns Response JSON
 * @author mplata - 25/09/2024
 */
export const getAllDbMovies = async () => {
    try {
      const url = baseUrl;
      const response = await fetch(url);
  
      if (!response.ok) {
        throw new Error('Failed to fetch movies');
      }
  
      const data: MovieDTO[] = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching movies:', error);
    }
};

/**
 * Method used when the user rate a movie, will save that movie with the extra metadata
 * 
 * @param movieRated 
 * @returns Response JSON
 * @author mplata - 25/09/2024
 */
export const saveMovieRated = async (movieRated: MovieDTO) => {
    try {
      const url = baseUrl;
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(movieRated),
      });
  
      if (!response.ok) {
        throw new Error('Failed to save the movie');
      }
  
      return await response.json();
    } catch (error) {
      console.error('Error saving movie:', error);
    }
};

/**
 * Method will delete the movie rated storaged on DB by movieId
 * 
 * @param movieId 
 * @returns Response JSON
 * @author mplata - 25/09/2024
 */
export const deleteMovie = async (movieId: number) => {
    try {
      const url = `${baseUrl}/delete/${movieId}`;
      const response = await fetch(url, {
        method: 'DELETE',
      });
  
      if (!response.ok) {
        throw new Error('Failed to delete the movie');
      }
  
      return await response.json();
    } catch (error) {
      console.error('Error deleting movie:', error);
    }
  };
  