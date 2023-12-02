import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import ua from "./locales/ua.json";

i18n.use(initReactI18next).init({
  fallbackLng: "ua",
  debug: true,
  resources: {
    ua: { translation: ua },
  },
});

export default i18n;
