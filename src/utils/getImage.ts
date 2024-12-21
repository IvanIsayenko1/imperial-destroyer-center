import tatooine from "../assets/img/planets/tatooine.png";
import alderaan from "../assets/img/planets/alderaan.jpg";
import yaviniv from "../assets/img/planets/yaviniv.png";
import hoth from "../assets/img/planets/hoth.png";
import dagobah from "../assets/img/planets/Dagobah.jpg";
import bespin from "../assets/img/planets/bespin.png";
import endor from "../assets/img/planets/endor.png";
import naboo from "../assets/img/planets/naboo.png";
import coruscant from "../assets/img/planets/coruscant.png";
import kamino from "../assets/img/planets/kamino.jpg";
import planetPlaceholder from "../assets/img/planets/placeholder.png";

import cr90 from "../assets/img/starships/cr90corvette.png";
import deathStar from "../assets/img/starships/deathStar.png";
import Executor_BF2 from "../assets/img/starships/Executor_BF2.png";
import ImperialClassStarDestroyer from "../assets/img/starships/ImperialClassStarDestroyer.png";
import milleniumFalcon from "../assets/img/starships/milleniumFalcon.png";
import rebeltransport from "../assets/img/starships/rebelTransport.jpg";
import SWBF_TIE_Avanzado_x1 from "../assets/img/starships/SWBF_TIE_Avanzado_x1.png";
import X_wing from "../assets/img/starships/X-wing.png";
import Y_wing from "../assets/img/starships/Y-wing.png";
import starshipPlaceholder from "../assets/img/starships/placeholder.png";

import AT_AT from "../assets/img/vehicles/AT-AT.png";
import atst from "../assets/img/vehicles/atst.jpg";
import cloudCar from "../assets/img/vehicles/Cloud-car-v2.png";
import sailbarge from "../assets/img/vehicles/Sailbarge.png";
import sandcrawler from "../assets/img/vehicles/sandcrawler.jpg";
import T16skyhopper from "../assets/img/vehicles/T16skyhopper.png";
import TIEfighter from "../assets/img/vehicles/TIEfighter.png";
import landspeeder from "../assets/img/vehicles/X34-landspeeder.jpg";
import vehiclePlaceholder from "../assets/img/vehicles/placeholder.png";

const planetImages: { [key: string]: string } = {
  tatooine,
  alderaan,
  "yavin iv": yaviniv,
  hoth,
  dagobah,
  bespin,
  endor,
  naboo,
  coruscant,
  kamino,
};

export const getPlanetImage = (planetName: string): string => {
  const normalizedName = planetName.toLowerCase();
  return planetImages[normalizedName] || planetPlaceholder;
};

const starshipImages: { [key: string]: string } = {
  "cr90 corvette": cr90,
  "death star": deathStar,
  executor: Executor_BF2,
  "star destroyer": ImperialClassStarDestroyer,
  "millennium falcon": milleniumFalcon,
  "rebel transport": rebeltransport,
  "tie advanced x1": SWBF_TIE_Avanzado_x1,
  "x-wing": X_wing,
  "y-wing": Y_wing,
};

export const getStarshipImage = (starshipName: string): string => {
  const normalizedName = starshipName.toLowerCase();
  return starshipImages[normalizedName] || starshipPlaceholder;
};

const vehicleImages: { [key: string]: string } = {
  "at-at": AT_AT,
  "at-st": atst,
  "cloud car": cloudCar,
  "sail barge": sailbarge,
  "sand crawler": sandcrawler,
  "t-16 skyhopper": T16skyhopper,
  "tie/ln starfighter": TIEfighter,
  "x-34 landspeeder": landspeeder,
};

export const getVehicleImage = (vehicleName: string): string => {
  const normalizedName = vehicleName.toLowerCase();
  return vehicleImages[normalizedName] || vehiclePlaceholder;
};
