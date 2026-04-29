import type { Menus } from "./type";

const CSV_URL =
  "https://docs.google.com/spreadsheets/d/e/2PACX-1vTHz6BZccU2YtqwvGPAd5OXBeSjwqtd4vo9_CgFyFWQQRZuqc7OSC_Pj-BgfphgKKCR08OKfj7IWlbd/pub?output=csv";

const apim = {
  match: {
    list: async (): Promise<Menus[]> => {
      const text = await fetch(CSV_URL).then((res) => res.text());

      return text
        .trim()
        .split("\n")
        .slice(1)
        .filter((row) => row.trim() !== "")
        .map((row): Menus => {
          const [ID, MENU, DESCRIPCION, PRECIO, IMAGEN, LINK] = row
            .replace(/\r/g, "")
            .split(",");

          return {
            ID: ID?.trim() ?? "",
            MENU: MENU?.trim() ?? "",
            DESCRIPCION: DESCRIPCION?.trim() ?? "",
            PRECIO: Number(PRECIO?.trim() ?? 0),
            IMAGEN: IMAGEN?.trim() ?? "",
            LINK: LINK?.trim() ?? "",
          };
        });
    },
  },
};

export default apim;