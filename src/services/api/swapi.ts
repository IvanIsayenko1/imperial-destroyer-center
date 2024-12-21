import { FETCH_LIMIT } from "@/constants/constants";
import {
  SwapiPagination,
  SwapiPageResponse,
} from "../../interfaces/SwapiListResponse";

export async function fetchAllValues<T>(URL: string) {
  let url = URL + `?page=1&limit=${FETCH_LIMIT}`;
  const allValues: T[] = [];
  let data: SwapiPageResponse = {} as SwapiPageResponse;

  while (url) {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Failed to fetch list: ${response.status}`);
    }
    data = await response.json();

    // Fetch detailed information for each value
    // if we want to sort by name, we need to fetch the detailed information
    // and have the whole array of values
    const detailedValue = await Promise.all(
      data.results.map(async (item: SwapiPagination) => {
        const detailResponse = await fetch(item.url, {
          cache: response.ok ? "force-cache" : "no-store",
        });

        if (!detailResponse.ok) {
          throw new Error(`Failed to fetch details: ${detailResponse.status}`);
        }

        return detailResponse.json();
      })
    );

    allValues.push(...detailedValue);
    url = data.next;
  }

  return allValues;
}
