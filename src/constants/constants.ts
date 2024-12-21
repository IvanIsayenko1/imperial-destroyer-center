// pagination
export const ELEMENTS_PER_PAGE = 10;

// SWAPI
export const FETCH_LIMIT = 100; // Limit for fetching data from SWAPI
export const BASE_URL = "https://www.swapi.tech/api/";
export const PLANETS_URL = `${BASE_URL}planets/`;
export const STARSHIPS_URL = `${BASE_URL}starships/`;
export const VEHICLES_URL = `${BASE_URL}vehicles/`;

// sort
export enum SORT_DIRECTIONS {
  ASC = "asc",
  DESC = "desc",
}
