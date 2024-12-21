import React from "react";
import { Page, PageConfig } from "../genericPage/Page";
import { PlanetProperties } from "@/interfaces/PlanetProperties";
import { getPlanetImage } from "@/utils/getImage";
import { PLANETS_URL } from "@/constants/constants";

export const PlanetsPage: React.FC = () => {
  const config: PageConfig<PlanetProperties> = {
    texts: {
      mainTitle: "Imperial Planetary Database",
      loadingMessage: "Scanning the galaxy for planetary systems...",
      filterInputPlaceholder: "Search planets by Imperial decree...",
      filterMessage: "Deploying probe droids...",
    },
    fetchUrl: PLANETS_URL,
    sortOptions: [
      { label: "Name", value: "name" },
      { label: "Population", value: "population" },
      { label: "Gravity", value: "gravity" },
    ],
    cardProperties: ["gravity", "climate", "name", "population", "terrain"],
    name: "planets",
    getImage: getPlanetImage,
    debounceTime: 300,
  };
  return <Page config={config} />;
};
