import React from "react";
import { VehiclesProperties } from "@/interfaces/VehiclesProperties";
import { getVehicleImage } from "@/utils/getImage";
import { PageConfig } from "../genericPage/Page";
import { Page } from "../genericPage/Page";
import { VEHICLES_URL } from "@/constants/constants";

export const VehiclesPage: React.FC = () => {
  const config: PageConfig<VehiclesProperties> = {
    texts: {
      mainTitle: "Imperial Ground Forces",
      loadingMessage: "Scanning Imperial garrison manifests...",
      filterInputPlaceholder: "Search Imperial vehicle registry...",
      filterMessage: "Deploying scout walkers...",
    },
    fetchUrl: VEHICLES_URL,
    sortOptions: [
      { label: "Name", value: "name" },
      { label: "Model", value: "model" },
      { label: "Vehicle Class", value: "vehicle_class" },
      { label: "Crew", value: "crew" },
    ],
    cardProperties: ["model", "vehicle_class", "crew"],
    name: "people",
    getImage: getVehicleImage,
    debounceTime: 300,
  };
  return <Page config={config} />;
};
