import type { Menus } from "./type";

const CSV_URL =
  "https://docs.google.com/spreadsheets/d/e/2PACX-1vTHz6BZccU2YtqwvGPAd5OXBeSjwqtd4vo9_CgFyFWQQRZuqc7OSC_Pj-BgfphgKKCR08OKfj7IWlbd/pub?output=csv";

/* =====================================================
   DIVIDIR CSV RESPETANDO COMAS Y COMILLAS
===================================================== */

const dividirFilaCSV = (fila: string): string[] => {
  const columnas: string[] = [];
  let valor = "";
  let entreComillas = false;

  for (let i = 0; i < fila.length; i++) {
    const caracter = fila[i];
    const siguiente = fila[i + 1];

    // Comillas dobles dentro de un texto
    if (
      caracter === '"' &&
      entreComillas &&
      siguiente === '"'
    ) {
      valor += '"';
      i++;
      continue;
    }

    // Abrir o cerrar texto entre comillas
    if (caracter === '"') {
      entreComillas = !entreComillas;
      continue;
    }

    // Separar solamente las comas que están fuera de comillas
    if (caracter === "," && !entreComillas) {
      columnas.push(valor.trim());
      valor = "";
      continue;
    }

    valor += caracter;
  }

  columnas.push(valor.trim());

  return columnas;
};

/* =====================================================
   CONVERTIR PRECIO DE FORMA SEGURA
===================================================== */

const convertirPrecio = (valor?: string): number => {
  if (!valor) return 0;

  const limpio = valor
    .replace(/\$/g, "")
    .replace(/\s/g, "")
    .replace(/\./g, "")
    .replace(",", ".");

  const precio = Number(limpio);

  return Number.isFinite(precio) ? precio : 0;
};

/* =====================================================
   API DEL MENÚ
===================================================== */

const apim = {
  match: {
    list: async (): Promise<Menus[]> => {
      const respuesta = await fetch(CSV_URL, {
        cache: "no-store",
      });

      if (!respuesta.ok) {
        throw new Error(
          `No se pudo cargar el menú: ${respuesta.status}`
        );
      }

      const texto = await respuesta.text();

      return texto
        .replace(/\r/g, "")
        .split("\n")
        .slice(1)
        .filter((fila) => fila.trim() !== "")
        .map((fila): Menus => {
          const [
            ID,
            MENU,
            DESCRIPCION,
            PRECIO,
            IMAGEN,
            LINK,
          ] = dividirFilaCSV(fila);

          return {
            ID: ID?.trim() ?? "",
            MENU: MENU?.trim() ?? "",
            DESCRIPCION: DESCRIPCION?.trim() ?? "",
            PRECIO: convertirPrecio(PRECIO),
            IMAGEN: IMAGEN?.trim() ?? "",
            LINK: LINK?.trim() ?? "",
          };
        })
        .filter((item) => item.ID !== "" && item.MENU !== "");
    },
  },
};

export default apim;