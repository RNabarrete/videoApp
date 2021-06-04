/* eslint-disable @typescript-eslint/naming-convention */
export interface ISerieApi {
  poster_path?: string;
  popularity?: number;
  id?: number;
  backdrop_path?: string;
  vote_average?: number;
  overview?: string;
  first_air_date?: string;
  origin_country?: number[];
  genre_ids?: number[];
  vote_count?: number;
  name?: string;
  original_name?: string;
}

export interface IListaSeries {
  page: number;
  results: ISerieApi[];
  total_results: number;
  total_pages: number;
}
