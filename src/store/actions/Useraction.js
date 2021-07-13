import { CHANGE_LANGUAGE } from "../types";

export const switchLang = (lang) => {
    return {
        type: CHANGE_LANGUAGE,
        payload: lang,
    }
};