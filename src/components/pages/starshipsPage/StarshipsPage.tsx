import React from "react";
import { STARSHIPS_URL } from "@/constants/constants";
import { getStarshipImage } from "@/utils/getImage";
import { StarshipProperties } from "@/interfaces/StarshipProperties";
import { Page, PageConfig } from "../genericPage/Page";

export const StarshipsPage: React.FC = () => {
  const config: PageConfig<StarshipProperties> = {
    texts: {
      mainTitle: "Imperial Starship Registry",
      loadingMessage: "Scanning the galaxy for starships...",
      filterInputPlaceholder: "Search starships by Imperial decree...",
      filterMessage: "Deploying probe droids...",
    },
    fetchUrl: STARSHIPS_URL,
    sortOptions: [
      { label: "Name", value: "name" },
      { label: "Cargo capacity", value: "cargo_capacity" },
      { label: "Crew", value: "crew" },
      { label: "Hyperdrive rating", value: "hyperdrive_rating" },
    ],
    cardProperties: [
      "cargo_capacity",
      "crew",
      "hyperdrive_rating",
      "MGLT",
      "starship_class",
    ],
    name: "starships",
    getImage: getStarshipImage,
  };
  return <Page config={config} />;
};
