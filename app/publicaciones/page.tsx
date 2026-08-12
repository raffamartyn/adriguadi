"use client";

import { useEffect, useMemo, useState } from "react";
import { toPng } from "html-to-image";

import apim from "@/app/api/apim";
import apipl from "@/app/api/apipl";

const crearUrlImagen = (link: string, imagen: string) => {
  const urlOriginal = encodeURI(`${link}/${imagen}`);

  return `/api/image-proxy?url=${encodeURIComponent(urlOriginal)}`;
};

const esperarImagenes = async (elemento: HTMLElement) => {
  const imagenes = Array.from(elemento.querySelectorAll("img"));

  await Promise.all(
    imagenes.map(async (imagen) => {
      if (!imagen.complete) {
        await new Promise<void>((resolve) => {
          imagen.addEventListener("load", () => resolve(), { once: true });
          imagen.addEventListener("error", () => resolve(), { once: true });
        });
      }

      await imagen.decode().catch(() => undefined);
    })
  );
};

type Menus = {
  ID: string;
  MENU: string;
  DESCRIPCION: string;
  PRECIO: number;
  IMAGEN: string;
  LINK: string;
};

type Plantilla = {
  ID_PLANTILLA: string;
  NOMBRE: string;
  IMAGEN: string;
  LINK: string;
};

export default function PublicacionesPage() {
  const [menus, setMenus] = useState<Menus[]>([]);
  const [plantillas, setPlantillas] = useState<Plantilla[]>([]);

  const [seleccionados, setSeleccionados] = useState<string[]>(
    []
  );

  const [plantillaId, setPlantillaId] = useState("");

  const [fecha, setFecha] = useState(() =>
    new Date().toLocaleDateString("en-CA")
  );

  const [loading, setLoading] = useState(true);
  const [generando, setGenerando] = useState(false);

  /* =====================================================
     CARGAR DATOS
  ===================================================== */

  useEffect(() => {
    const cargar = async () => {
      try {
        const [dataMenus, dataPlantillas] =
          await Promise.all([
            apim.match.list(),
            apipl.match.list(),
          ]);

        setMenus(dataMenus);
        setPlantillas(dataPlantillas);

        if (dataPlantillas.length > 0) {
          setPlantillaId(
            dataPlantillas[0].ID_PLANTILLA
          );
        }
      } catch (error) {
        console.error(
          "Error cargando publicaciones:",
          error
        );
      } finally {
        setLoading(false);
      }
    };

    cargar();
  }, []);

  /* =====================================================
     PLANTILLA SELECCIONADA
  ===================================================== */

  const plantillaSeleccionada = useMemo(() => {
    return plantillas.find(
      (item) =>
        item.ID_PLANTILLA === plantillaId
    );
  }, [plantillas, plantillaId]);

  /* =====================================================
     SELECCIONAR PLATOS
  ===================================================== */

  const seleccionar = (id: string) => {
    setSeleccionados((prev) =>
      prev.includes(id)
        ? prev.filter((item) => item !== id)
        : [...prev, id]
    );
  };

  const seleccionarTodos = () => {
    if (seleccionados.length === menus.length) {
      setSeleccionados([]);
    } else {
      setSeleccionados(
        menus.map((item) => item.ID)
      );
    }
  };

  /* =====================================================
     MENUS SELECCIONADOS
  ===================================================== */

  const menusSeleccionados = useMemo(() => {
    return menus.filter((item) =>
      seleccionados.includes(item.ID)
    );
  }, [menus, seleccionados]);

  /* =====================================================
     MAXIMO 4 PLATOS POR IMAGEN
  ===================================================== */

  const paginas = useMemo(() => {
    const resultado: Menus[][] = [];

    for (
      let i = 0;
      i < menusSeleccionados.length;
      i += 4
    ) {
      resultado.push(
        menusSeleccionados.slice(i, i + 4)
      );
    }

    return resultado;
  }, [menusSeleccionados]);

  /* =====================================================
     DESCARGAR UNA PAGINA
  ===================================================== */

  const descargarPagina = async (
    index: number
  ) => {
    const elemento = document.getElementById(
      `publicacion-${index}`
    );

    if (!elemento) return;

    try {
      setGenerando(true);

      await esperarImagenes(elemento);
      await document.fonts.ready;

      const dataUrl = await toPng(elemento, {
        cacheBust: true,
        pixelRatio: 3,
        backgroundColor: "#ffffff",
        skipAutoScale: true,
      });

      const link =
        document.createElement("a");

      link.download = `adriguady2-${fecha}-pagina-${
        index + 1
      }.png`;

      link.href = dataUrl;

      link.click();
    } catch (error) {
      console.error(
        "Error generando imagen:",
        error
      );
    } finally {
      setGenerando(false);
    }
  };

  /* =====================================================
     DESCARGAR TODAS
  ===================================================== */

  const descargarTodas = async () => {
    try {
      setGenerando(true);

      for (
        let index = 0;
        index < paginas.length;
        index++
      ) {
        const elemento =
          document.getElementById(
            `publicacion-${index}`
          );

        if (!elemento) continue;

        await esperarImagenes(elemento);
        await document.fonts.ready;

        const dataUrl = await toPng(
          elemento,
          {
            cacheBust: true,
            pixelRatio: 3,
            backgroundColor: "#ffffff",
            skipAutoScale: true,
          }
        );

        const link =
          document.createElement("a");

        link.download = `adriguady2-${fecha}-pagina-${
          index + 1
        }.png`;

        link.href = dataUrl;

        link.click();

        await new Promise((resolve) =>
          setTimeout(resolve, 500)
        );
      }
    } catch (error) {
      console.error(
        "Error descargando publicaciones:",
        error
      );
    } finally {
      setGenerando(false);
    }
  };

  /* =====================================================
     LOADING
  ===================================================== */

  if (loading) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#07101c] text-white">
        Cargando publicaciones...
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#07101c] px-5 py-10 text-white">

      <div className="mx-auto max-w-7xl">

        {/* =================================================
            CABECERA
        ================================================= */}

        <div className="mb-10">

          <p className="text-xs uppercase tracking-[0.3em] text-[#58b9f5]">
            ADRIGUADY2
          </p>

          <h1 className="mt-3 text-3xl font-light md:text-5xl">
            Crear publicación
          </h1>

          <p className="mt-3 max-w-xl text-sm text-gray-400">
            Elegí una plantilla y los platos que querés
            publicar.
          </p>

        </div>

        <div className="grid gap-10 lg:grid-cols-[370px_1fr]">

          {/* =================================================
              PANEL IZQUIERDO
          ================================================= */}

          <aside>

            {/* FECHA */}

            <div className="mb-8">

              <p className="mb-3 text-sm text-gray-400">
                Fecha
              </p>

              <input
                type="date"
                value={fecha}
                onChange={(e) =>
                  setFecha(e.target.value)
                }
                className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none transition focus:border-[#58b9f5]"
              />

            </div>

            {/* =================================================
                PLANTILLAS
            ================================================= */}

            <div className="mb-10">

              <div className="mb-4 flex items-center justify-between">

                <p className="text-sm text-gray-400">
                  Elegir plantilla
                </p>

                <span className="text-xs text-gray-600">
                  {plantillas.length} disponibles
                </span>

              </div>

              {/* SIN PLANTILLAS */}

              {plantillas.length === 0 && (
                <div className="rounded-2xl border border-dashed border-white/10 p-5 text-center text-sm text-gray-500">
                  No hay plantillas disponibles.
                </div>
              )}

              {/* LISTA PLANTILLAS */}

              <div className="grid grid-cols-2 gap-3">

                {plantillas.map((item) => {
                  const seleccionada =
                    item.ID_PLANTILLA ===
                    plantillaId;

                  const imageUrl = crearUrlImagen(
                    item.LINK,
                    item.IMAGEN
                  );

                  return (
                    <button
                      key={item.ID_PLANTILLA}
                      onClick={() =>
                        setPlantillaId(
                          item.ID_PLANTILLA
                        )
                      }
                      className={`overflow-hidden rounded-2xl border text-left transition ${
                        seleccionada
                          ? "border-[#58b9f5] ring-2 ring-[#58b9f5]/20"
                          : "border-white/10 hover:border-white/30"
                      }`}
                    >

                      {/* MINIATURA */}

                      <div className="aspect-9/16 overflow-hidden bg-black">

                        <img
                          src={imageUrl}
                          alt={item.NOMBRE}
                          loading="eager"
                          className="h-full w-full object-cover"
                        />

                      </div>

                      {/* NOMBRE */}

                      <div
                        className={`p-3 text-center text-xs font-medium ${
                          seleccionada
                            ? "bg-[#58b9f5] text-[#07101c]"
                            : "bg-white/5 text-white"
                        }`}
                      >
                        {item.NOMBRE}
                      </div>

                    </button>
                  );
                })}

              </div>
            </div>

            {/* =================================================
                PLATOS
            ================================================= */}

            <div className="mb-4 flex items-center justify-between">

              <p className="text-sm text-gray-400">
                Platos
              </p>

              {menus.length > 0 && (
                <button
                  onClick={seleccionarTodos}
                  className="text-xs text-[#58b9f5]"
                >
                  {seleccionados.length ===
                  menus.length
                    ? "Quitar todos"
                    : "Seleccionar todos"}
                </button>
              )}

            </div>

            {/* LISTA */}

            <div className="max-h-150 space-y-2 overflow-y-auto pr-2">

              {menus.map((item) => {
                const seleccionado =
                  seleccionados.includes(
                    item.ID
                  );

                const imageUrl = crearUrlImagen(
                  item.LINK,
                  item.IMAGEN
                );

                return (
                  <button
                    key={item.ID}
                    onClick={() =>
                      seleccionar(item.ID)
                    }
                    className={`flex w-full items-center gap-3 rounded-2xl border p-3 text-left transition ${
                      seleccionado
                        ? "border-[#58b9f5] bg-[#58b9f5]/10"
                        : "border-white/10 bg-white/[0.03] hover:bg-white/[0.05]"
                    }`}
                  >

                    {/* FOTO */}

                    <img
                      src={imageUrl}
                      alt={item.MENU}
                      loading="eager"
                      className="h-14 w-14 rounded-xl object-cover"
                    />

                    {/* INFORMACION */}

                    <div className="min-w-0 flex-1">

                      <p className="truncate text-sm font-medium">
                        {item.MENU}
                      </p>

                      <p className="mt-1 text-sm font-bold text-[#58b9f5]">
                        $
                        {Number(
                          item.PRECIO
                        ).toLocaleString(
                          "es-AR"
                        )}
                      </p>

                    </div>

                    {/* CHECK */}

                    <div
                      className={`flex h-6 w-6 items-center justify-center rounded-full border text-xs ${
                        seleccionado
                          ? "border-[#58b9f5] bg-[#58b9f5] text-[#07101c]"
                          : "border-gray-600"
                      }`}
                    >
                      {seleccionado && "✓"}
                    </div>

                  </button>
                );
              })}

            </div>

          </aside>

          {/* =================================================
              VISTA PREVIA
          ================================================= */}

          <section>

            <div className="mb-5 flex items-center justify-between gap-4">

              <div>

                <h2 className="text-xl">
                  Vista previa
                </h2>

                <p className="mt-1 text-xs text-gray-500">
                  {menusSeleccionados.length} platos ·{" "}
                  {paginas.length} publicaciones
                </p>

              </div>

              {/* DESCARGAR TODAS */}

              {paginas.length > 1 &&
                plantillaSeleccionada && (
                  <button
                    onClick={descargarTodas}
                    disabled={generando}
                    className="rounded-full bg-[#58b9f5] px-5 py-2 text-sm font-medium text-[#07101c] transition hover:bg-[#75c7f8] disabled:opacity-50"
                  >
                    {generando
                      ? "Generando..."
                      : "Descargar todas"}
                  </button>
                )}

            </div>

            {/* =================================================
                SIN PLANTILLA
            ================================================= */}

            {!plantillaSeleccionada && (
              <div className="flex min-h-100 items-center justify-center rounded-3xl border border-dashed border-white/10">

                <p className="text-sm text-gray-500">
                  Elegí una plantilla.
                </p>

              </div>
            )}

            {/* =================================================
                SIN PLATOS
            ================================================= */}

            {plantillaSeleccionada &&
              paginas.length === 0 && (
                <div className="flex min-h-100 items-center justify-center rounded-3xl border border-dashed border-white/10">

                  <div className="text-center">

                    <p className="text-sm text-gray-400">
                      Seleccioná uno o más platos
                    </p>

                    <p className="mt-2 text-xs text-gray-600">
                      Se colocarán hasta 4 platos
                      por publicación.
                    </p>

                  </div>

                </div>
              )}

            {/* =================================================
                PUBLICACIONES
            ================================================= */}

            {plantillaSeleccionada && (
              <div className="grid items-start gap-10 xl:grid-cols-2">

                {paginas.map(
                  (pagina, index) => (
                    <div
                      key={index}
                      className="mx-auto w-full max-w-md"
                    >

                      <Publicacion
                        id={`publicacion-${index}`}
                        menus={pagina}
                        plantilla={
                          plantillaSeleccionada
                        }
                        fecha={fecha}
                        numero={
                          index + 1
                        }
                        total={
                          paginas.length
                        }
                      />

                      {/* DESCARGAR */}

                      <button
                        onClick={() =>
                          descargarPagina(
                            index
                          )
                        }
                        disabled={generando}
                        className="mt-4 w-full rounded-full border border-[#58b9f5] py-3 text-sm font-medium text-[#58b9f5] transition hover:bg-[#58b9f5] hover:text-[#07101c] disabled:opacity-50"
                      >
                        {generando
                          ? "Generando..."
                          : `Descargar página ${
                              index + 1
                            }`}
                      </button>

                    </div>
                  )
                )}

              </div>
            )}

          </section>

        </div>

      </div>

    </main>
  );
}

/* =====================================================
   COMPONENTE PUBLICACION
===================================================== */

function Publicacion({
  id,
  menus,
  plantilla,
  fecha,
  numero,
  total,
}: {
  id: string;
  menus: Menus[];
  plantilla: Plantilla;
  fecha: string;
  numero: number;
  total: number;
}) {

  /* =====================================================
     PLANTILLA
  ===================================================== */

  const plantillaUrl = crearUrlImagen(
    plantilla.LINK,
    plantilla.IMAGEN
  );

  /* =====================================================
     FECHA
  ===================================================== */

  const fechaTexto = new Date(
    `${fecha}T12:00:00`
  ).toLocaleDateString("es-AR", {
    weekday: "long",
    day: "numeric",
    month: "long",
  });

  /* =====================================================
     DISTRIBUCION AUTOMATICA
  ===================================================== */

  const cantidad = menus.length;

  const layout =
    cantidad === 1
      ? "grid-cols-1 place-items-center"
      : cantidad === 2
      ? "grid-cols-2 items-center"
      : "grid-cols-2 grid-rows-2";

  return (
    <div
      id={id}
      className="relative aspect-9/16 w-full overflow-hidden rounded-3xl bg-white shadow-2xl"
    >

      {/* La plantilla es una imagen real para que html-to-image espere su carga */}

      <img
        src={plantillaUrl}
        alt=""
        aria-hidden="true"
        loading="eager"
        className="absolute inset-0 h-full w-full object-cover"
      />

      {/* =================================================
          FECHA
      ================================================= */}

      <div className="absolute left-[8%] right-[8%] top-[23.5%] z-10 text-center">

        <p className="text-[3.2vw] font-black capitalize text-white drop-shadow-lg lg:text-[1.25vw]">
          {fechaTexto}
        </p>

      </div>

      {/* =================================================
          NUMERO DE PAGINA
      ================================================= */}

      {total > 1 && (
        <div className="absolute right-[5%] top-[23%] z-20 rounded-full bg-black/70 px-3 py-1 text-xs font-medium text-white">
          {numero}/{total}
        </div>
      )}

      {/* =================================================
          ZONA CENTRAL
      ================================================= */}

      <div className="absolute bottom-[22%] left-[7%] right-[7%] top-[28%] z-10">

        <div
          className={`grid h-full ${layout} gap-[3%]`}
        >

          {menus.map((item, index) => {
            const imageUrl = crearUrlImagen(
              item.LINK,
              item.IMAGEN
            );

            /* =============================================
               POSICION DE CADA TARJETA
            ============================================= */

            const posicion =
              cantidad === 1
                ? "h-[72%] w-[68%]"
                : cantidad === 2
                ? "h-[68%]"
                : cantidad === 3 &&
                  index === 2
                ? "col-span-2 h-full w-[48.5%] justify-self-center"
                : "h-full";

            return (
              <div
                key={item.ID}
                className={`
                  ${posicion}
                  flex min-h-0 flex-col
                  overflow-hidden rounded-2xl
                  border border-white/10
                  bg-[#06172a]/95
                  shadow-xl
                `}
              >

                {/* =========================================
                    FOTO
                ========================================= */}

                <div className="relative min-h-0 flex-1 overflow-hidden">

                  <img
                    src={imageUrl}
                    alt={item.MENU}
                    loading="eager"
                    className="h-full w-full object-cover"
                  />

                  <div className="absolute inset-0 bg-linear-to-t from-black/80 via-transparent to-transparent" />

                </div>

                {/* =========================================
                    INFORMACION
                ========================================= */}

                <div className="p-[6%]">

                  {/* NOMBRE */}

                  <h3 className="line-clamp-2 text-[3vw] font-bold leading-tight text-white lg:text-[1.2vw]">
                    {item.MENU}
                  </h3>

                  {/* PRECIO */}

                  <p className="mt-2 text-[3.6vw] font-black leading-none text-[#58b9f5] lg:text-[1.45vw]">
                    $
                    {Number(
                      item.PRECIO
                    ).toLocaleString(
                      "es-AR"
                    )}
                  </p>

                </div>

              </div>
            );
          })}

        </div>

      </div>

    </div>
  );
}