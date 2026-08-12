import type { plantilla } from "./type";

const CSV_URL =
  "https://docs.google.com/spreadsheets/d/e/2PACX-1vTHz6BZccU2YtqwvGPAd5OXBeSjwqtd4vo9_CgFyFWQQRZuqc7OSC_Pj-BgfphgKKCR08OKfj7IWlbd/pub?gid=2036991759&single=true&output=csv";

const apipl = {
  match: {
    list: async (): Promise<plantilla[]> => {
      const text = await fetch(CSV_URL).then((res) => res.text());

      return text
        .trim()
        .split("\n")
        .slice(1)
        .filter((row) => row.trim() !== "")
        .map((row): plantilla => {
          const [ID_PLANTILLA, NOMBRE, IMAGEN, LINK] = row
            .replace(/\r/g, "")
            .split(",");

          return {
            ID_PLANTILLA: ID_PLANTILLA?.trim() ?? "",
            NOMBRE: NOMBRE?.trim() ?? "",
            IMAGEN: IMAGEN?.trim() ?? "",
            LINK: LINK?.trim() ?? "",
          };
        });
    },
  },
};

export default apipl;