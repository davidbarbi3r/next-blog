import { buildLegacyTheme } from "sanity";

export const myTheme = buildLegacyTheme({
  "--white": "#FFF",
  "--black": "#264653",

  "--gray": "#666",
  "--gray-base": "#666",

  "--component-bg": "#264653",
  "--component-text-color": "#FFF",

  "--brand-primary": "#2a9d8f",

  "--default-button-color": "#666",
  "--default-button-primary-color": "#2a9d8f",
  "--default-button-success-color": "#2a9d8f",
  "--default-button-warning-color": "#f4a261",
  "--default-button-danger-color": "#e76f51",

  "--state-info-color": "#2a9d8f",
  "--state-success-color": "#2a9d8f",
  "--state-warning-color": "#f4a261",
  "--state-danger-color": "#e76f51",

  "--main-navigation-color": "#264653",
  "--main-navigation-color--inverted": "#FFF",

  "--focus-color": "#2a9d8f",
});
