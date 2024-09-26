import { OmdbMovieDTO } from './OmdbMovie.dto';

export type OmdbResponseDTO = {
  Search: OmdbMovieDTO[];
  totalResults: string;
  Response: string;
};
