import TitleEditor from "components/MapInfoEditor/ModalComponents/TitleEditor";
import { MAP_INFO_EDITORS } from "./enums";

export const DEFAULT_LAT = 40;
export const DEFAULT_LNG = 30;
export const DEFAULT_ZOOM = 4;

// Mapbox
export const MAPBOX_BASE_API_URL = "https://api.mapbox.com/";
export const MAPBOX_API_PATHS = {
  PLACES: "geocoding/v5/mapbox.places/",
};

export const MAIN_BRAND_COLOR = "#2A2A2A";

export const APP_NAME = "AltasCraft";

// Tailwind
export const BTN_CLASSNAMES =
  "text-sm bg-main-brand-color border border-main-brand-color py-2 px-4 text-white hover:bg-transparent hover:text-main-brand-color";

export const SECONDARY_BTN_CLASSNAMES =
  "text-sm bg-transparent border border-main-brand-color py-2 px-4 text-main-brand-color hover:bg-main-brand-color hover:text-white";

export const SMALL_TEXT_CLASSNAMES = "text-sm text-gray-400 text-center";

// Regex
export const EMAIL_REGEX = /\S+@\S+\.\S+/;

export const UNEXPECTED_ERROR_MESSAGE = "An unexpected error ocurred.";

// MapInfoEditor

export const SELECTED_MAP_INFO_EDITOR_COMPONENTS = {
  [MAP_INFO_EDITORS.TITLE]: TitleEditor,
};
