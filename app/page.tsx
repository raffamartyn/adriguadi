"use client";

import Image from "next/image";

import {
  AnimatePresence,
  motion,
} from "motion/react";

import {
  useEffect,
  useState,
} from "react";

import apim from "@/app/api/apim";

import HeroBanner from "@/app/components/HeroBanner";
import Navbar from "@/app/components/Navbar";
import Contacto from "@/app/components/Contacto";
import SobreNosotros from "@/app/components/SobreNosotros";

type Menus = {
  ID: string;
  MENU: string;
  DESCRIPCION: string;
  PRECIO: number;
  IMAGEN: string;
  LINK: string;
};

type CartItem = Menus & {
  qty: number;
};

const formatearPrecio = (precio: number) => {
  return new Intl.NumberFormat("es-AR", {
    style: "currency",
    currency: "ARS",
    maximumFractionDigits: 0,
  }).format(precio);
};

export default function Home() {
  const [menuItems, setMenuItems] = useState<Menus[]>([]);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  /* =========================
     CARGAR MENU
  ========================= */

  useEffect(() => {
    const fetchMenu = async () => {
      try {
        const data = await apim.match.list();

        setMenuItems(data);
      } catch (error) {
        console.error(
          "Error cargando el menú:",
          error
        );
      } finally {
        setLoading(false);
      }
    };

    fetchMenu();
  }, []);

  /* =========================
     BLOQUEAR SCROLL
  ========================= */

  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  /* =========================
     CARRITO
  ========================= */

  const addToCart = (item: Menus) => {
    setCart((prev) => {
      const existing = prev.find(
        (i) => i.ID === item.ID
      );

      if (existing) {
        return prev.map((i) =>
          i.ID === item.ID
            ? {
                ...i,
                qty: i.qty + 1,
              }
            : i
        );
      }

      return [
        ...prev,
        {
          ...item,
          qty: 1,
        },
      ];
    });
  };

  const changeQty = (
    id: string,
    delta: number
  ) => {
    setCart((prev) =>
      prev.map((item) =>
        item.ID === id
          ? {
              ...item,
              qty: Math.max(
                1,
                item.qty + delta
              ),
            }
          : item
      )
    );
  };

  const removeFromCart = (id: string) => {
    setCart((prev) =>
      prev.filter((item) => item.ID !== id)
    );
  };

  const getTotal = () => {
    return cart.reduce(
      (acc, item) =>
        acc + item.PRECIO * item.qty,
      0
    );
  };

  const cantidadCarrito = cart.reduce(
    (acc, item) => acc + item.qty,
    0
  );

  /* =========================
     WHATSAPP
  ========================= */

  const sendToWhatsApp = () => {
    if (cart.length === 0) return;

    const productos = cart
      .map(
        (item, index) =>
          `${index + 1}. ${item.MENU} x${
            item.qty
          } - ${formatearPrecio(
            item.PRECIO * item.qty
          )}`
      )
      .join("\n");

    const mensaje =
      `Hola ADRIGUADY2, quiero realizar el siguiente pedido:\n\n` +
      `${productos}\n\n` +
      `Total: ${formatearPrecio(getTotal())}`;

    const url =
      `https://wa.me/3874024408?text=` +
      encodeURIComponent(mensaje);

    window.open(
      url,
      "_blank",
      "noopener,noreferrer"
    );
  };

  /* =========================
     LOADING
  ========================= */

  if (loading) {
    return (
      <main className="flex min-h-screen flex-col items-center justify-center gap-5 bg-[#07101c] text-white">

        <div className="h-12 w-12 animate-spin rounded-full border-4 border-[#58b9f5]/20 border-t-[#58b9f5]" />

        <p className="text-sm font-medium tracking-wide text-[#bfe8ff]">
          Cargando menú...
        </p>

      </main>
    );
  }

  return (
    <main className="min-h-screen overflow-x-hidden bg-[#07101c] text-[#f7fbff]">

      {/* =========================
          NAVEGACION Y HERO
      ========================= */}

      <Navbar />

      <HeroBanner />

      {/* =========================
          COMO PEDIR
      ========================= */}

      <section className="relative overflow-hidden px-6 py-24">

        {/* DECORACION */}

        <div className="pointer-events-none absolute -left-32 top-20 h-72 w-72 rounded-full bg-[#58b9f5]/8 blur-3xl" />

        <div className="pointer-events-none absolute -right-32 bottom-0 h-72 w-72 rounded-full bg-[#f5a623]/5 blur-3xl" />

        <div className="relative mx-auto max-w-6xl">

          {/* TITULO */}

          <motion.div
            initial={{
              opacity: 0,
              y: 35,
            }}
            whileInView={{
              opacity: 1,
              y: 0,
            }}
            viewport={{
              once: false,
              amount: 0.3,
            }}
            transition={{
              duration: 0.7,
            }}
            className="mb-14 text-center"
          >
            <p className="mb-3 text-xs font-bold uppercase tracking-[0.35em] text-[#58b9f5]">
              Fácil y rápido
            </p>

            <h2 className="text-3xl font-bold text-white md:text-4xl">
              ¿Cómo hacer tu pedido?
            </h2>

            <div className="mx-auto mt-5 h-1 w-16 rounded-full bg-[#58b9f5]" />
          </motion.div>

          {/* PASOS */}

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">

            {/* PASO 1 */}

            <PasoPedido
              numero="01"
              icono="🍽️"
              titulo="Elegí tus platos"
              descripcion="Revisá nuestro menú y elegí tus comidas favoritas."
              delay={0}
            />

            {/* PASO 2 */}

            <PasoPedido
              numero="02"
              icono="🛒"
              titulo="Agregá al carrito"
              descripcion="Seleccioná las cantidades que necesitás."
              delay={0.1}
            />

            {/* PASO 3 */}

            <PasoPedido
              numero="03"
              icono="💬"
              titulo="Enviá el pedido"
              descripcion="Mandanos tu pedido directamente por WhatsApp."
              delay={0.2}
            />

            {/* PASO 4 */}

            <PasoPedido
              numero="04"
              icono="📍"
              titulo="Coordinamos"
              descripcion="Acordamos entrega o retiro de tu pedido."
              delay={0.3}
            />

          </div>
        </div>
      </section>

      {/* =========================
          MENU
      ========================= */}

      <section
        id="menu"
        className="scroll-mt-24 border-y border-white/5 bg-[#06172a]/70 px-6 py-24"
      >
        <div className="mx-auto max-w-6xl">

          {/* TITULO MENU */}

          <motion.div
            initial={{
              opacity: 0,
              y: 35,
            }}
            whileInView={{
              opacity: 1,
              y: 0,
            }}
            viewport={{
              once: false,
              amount: 0.3,
            }}
            transition={{
              duration: 0.7,
            }}
            className="mb-14 text-center"
          >
            <p className="mb-3 text-xs font-bold uppercase tracking-[0.35em] text-[#58b9f5]">
              Rico, casero y abundante
            </p>

            <h2 className="text-3xl font-bold text-white md:text-5xl">
              Nuestro Menú
            </h2>

            <div className="mx-auto mt-5 h-1 w-16 rounded-full bg-[#58b9f5]" />
          </motion.div>

          {/* SIN MENU */}

          {menuItems.length === 0 && (
            <div className="rounded-3xl border border-dashed border-white/10 bg-[#0b2038]/40 px-6 py-16 text-center">

              <p className="text-[#bfe8ff]">
                No hay platos disponibles en este momento.
              </p>

            </div>
          )}

          {/* CARDS */}

          <div className="grid gap-7 sm:grid-cols-2 lg:grid-cols-3">

            {menuItems.map((item, index) => {
              const imageUrl = encodeURI(
                `${item.LINK}/${item.IMAGEN}`
              );

              return (
                <motion.article
                  key={item.ID}
                  initial={{
                    opacity: 0,
                    y: 35,
                  }}
                  whileInView={{
                    opacity: 1,
                    y: 0,
                  }}
                  viewport={{
                    once: false,
                    amount: 0.15,
                  }}
                  transition={{
                    duration: 0.6,
                    delay:
                      (index % 3) * 0.08,
                  }}
                  whileHover={{
                    y: -7,
                  }}
                  className="group overflow-hidden rounded-3xl border border-[#58b9f5]/15 bg-[#0b2038]/85 shadow-xl shadow-black/20 backdrop-blur-md transition-colors hover:border-[#58b9f5]/45"
                >
                  {/* IMAGEN */}

                  <div className="relative h-56 w-full overflow-hidden">

                    <Image
                      src={imageUrl}
                      alt={item.MENU}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className="object-cover transition duration-700 group-hover:scale-105"
                    />

                    <div className="absolute inset-0 bg-linear-to-t from-[#07101c]/80 via-transparent to-transparent" />

                    {/* ETIQUETA */}

                    <span className="absolute left-4 top-4 rounded-full border border-white/10 bg-[#06172a]/75 px-3 py-1 text-xs font-semibold text-[#bfe8ff] backdrop-blur-md">
                      Comida casera
                    </span>

                  </div>

                  {/* INFORMACION */}

                  <div className="flex min-h-55 flex-col p-6">

                    <h3 className="mb-2 text-xl font-bold text-white">
                      {item.MENU}
                    </h3>

                    <p className="mb-6 line-clamp-3 flex-1 text-sm leading-6 text-[#b8c9da]">
                      {item.DESCRIPCION}
                    </p>

                    <div className="flex items-center justify-between gap-4">

                      {/* PRECIO */}

                      <span className="text-xl font-black text-[#f5a623]">
                        {formatearPrecio(
                          item.PRECIO
                        )}
                      </span>

                      {/* AGREGAR */}

                      <motion.button
                        whileHover={{
                          scale: 1.04,
                        }}
                        whileTap={{
                          scale: 0.96,
                        }}
                        onClick={() =>
                          addToCart(item)
                        }
                        className="rounded-full bg-[#58b9f5] px-5 py-2.5 text-sm font-bold text-[#06172a] shadow-lg shadow-[#58b9f5]/10 transition hover:bg-[#bfe8ff]"
                      >
                        Agregar
                      </motion.button>

                    </div>
                  </div>
                </motion.article>
              );
            })}

          </div>
        </div>
      </section>

      {/* =========================
          CONTACTO
      ========================= */}
      <SobreNosotros />
      <Contacto />

      {/* =========================
          BOTON CARRITO
      ========================= */}

      <AnimatePresence>
        {cantidadCarrito > 0 && (
          <motion.button
            initial={{
              opacity: 0,
              scale: 0.7,
              y: 20,
            }}
            animate={{
              opacity: 1,
              scale: 1,
              y: 0,
            }}
            exit={{
              opacity: 0,
              scale: 0.7,
              y: 20,
            }}
            whileHover={{
              scale: 1.06,
            }}
            whileTap={{
              scale: 0.94,
            }}
            onClick={() => setOpen(true)}
            className="fixed bottom-5 right-5 z-40 flex items-center gap-3 rounded-full bg-[#58b9f5] px-5 py-3 font-bold text-[#06172a] shadow-2xl shadow-black/40 md:bottom-7 md:right-7"
          >
            <span className="text-xl">
              🛒
            </span>

            <span className="hidden sm:inline">
              Mi pedido
            </span>

            <span className="flex h-7 min-w-7 items-center justify-center rounded-full bg-[#06172a] px-2 text-xs text-white">
              {cantidadCarrito}
            </span>
          </motion.button>
        )}
      </AnimatePresence>

      {/* =========================
          DRAWER CARRITO
      ========================= */}

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{
              opacity: 0,
            }}
            animate={{
              opacity: 1,
            }}
            exit={{
              opacity: 0,
            }}
            className="fixed inset-0 z-60 flex justify-end bg-[#020711]/75 backdrop-blur-sm"
            onClick={() => setOpen(false)}
          >
            <motion.aside
              initial={{
                x: "100%",
              }}
              animate={{
                x: 0,
              }}
              exit={{
                x: "100%",
              }}
              transition={{
                type: "spring",
                stiffness: 280,
                damping: 30,
              }}
              className="h-full w-full max-w-md overflow-y-auto border-l border-[#58b9f5]/15 bg-[#07101c] p-6 shadow-2xl"
              onClick={(e) =>
                e.stopPropagation()
              }
            >
              {/* CABECERA */}

              <div className="mb-7 flex items-center justify-between border-b border-white/10 pb-5">

                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.25em] text-[#58b9f5]">
                    ADRIGUADY2
                  </p>

                  <h2 className="mt-1 text-2xl font-bold text-white">
                    Tu pedido
                  </h2>
                </div>

                <button
                  onClick={() => setOpen(false)}
                  className="flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/5 text-xl text-[#bfe8ff] transition hover:border-[#58b9f5]/40 hover:bg-[#58b9f5]/10 hover:text-white"
                  aria-label="Cerrar carrito"
                >
                  ✕
                </button>

              </div>

              {/* CARRITO VACIO */}

              {cart.length === 0 && (
                <div className="py-16 text-center">

                  <div className="mb-4 text-5xl">
                    🛒
                  </div>

                  <p className="text-[#b8c9da]">
                    Todavía no agregaste ningún plato.
                  </p>

                </div>
              )}

              {/* PRODUCTOS */}

              <div className="space-y-4">

                {cart.map((item) => {
                  const imageUrl = encodeURI(
                    `${item.LINK}/${item.IMAGEN}`
                  );

                  return (
                    <div
                      key={item.ID}
                      className="rounded-2xl border border-white/10 bg-[#0b2038]/65 p-4"
                    >
                      <div className="flex gap-4">

                        {/* FOTO */}

                        <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-xl">

                          <Image
                            src={imageUrl}
                            alt={item.MENU}
                            fill
                            sizes="80px"
                            className="object-cover"
                          />

                        </div>

                        {/* DATOS */}

                        <div className="min-w-0 flex-1">

                          <div className="flex items-start justify-between gap-3">

                            <h3 className="line-clamp-2 font-bold text-white">
                              {item.MENU}
                            </h3>

                            <button
                              onClick={() =>
                                removeFromCart(
                                  item.ID
                                )
                              }
                              className="shrink-0 text-xs font-medium text-red-400 transition hover:text-red-300"
                            >
                              Eliminar
                            </button>

                          </div>

                          <p className="mt-1 text-sm font-bold text-[#f5a623]">
                            {formatearPrecio(
                              item.PRECIO *
                                item.qty
                            )}
                          </p>

                          {/* CANTIDAD */}

                          <div className="mt-3 flex items-center gap-3">

                            <button
                              onClick={() =>
                                changeQty(
                                  item.ID,
                                  -1
                                )
                              }
                              className="flex h-8 w-8 items-center justify-center rounded-full border border-[#58b9f5]/30 bg-[#06172a] font-bold text-[#bfe8ff] transition hover:bg-[#58b9f5] hover:text-[#06172a]"
                            >
                              −
                            </button>

                            <span className="min-w-5 text-center font-bold text-white">
                              {item.qty}
                            </span>

                            <button
                              onClick={() =>
                                changeQty(
                                  item.ID,
                                  1
                                )
                              }
                              className="flex h-8 w-8 items-center justify-center rounded-full border border-[#58b9f5]/30 bg-[#06172a] font-bold text-[#bfe8ff] transition hover:bg-[#58b9f5] hover:text-[#06172a]"
                            >
                              +
                            </button>

                          </div>

                        </div>
                      </div>
                    </div>
                  );
                })}

              </div>

              {/* TOTAL */}

              {cart.length > 0 && (
                <div className="mt-8 border-t border-white/10 pt-6">

                  <div className="flex items-end justify-between">

                    <span className="text-sm font-medium text-[#b8c9da]">
                      Total del pedido
                    </span>

                    <span className="text-3xl font-black text-[#f5a623]">
                      {formatearPrecio(
                        getTotal()
                      )}
                    </span>

                  </div>

                  <button
                    onClick={sendToWhatsApp}
                    className="mt-6 w-full rounded-full bg-[#58b9f5] py-4 text-base font-bold text-[#06172a] shadow-lg shadow-[#58b9f5]/15 transition hover:bg-[#bfe8ff]"
                  >
                    Enviar pedido por WhatsApp
                  </button>

                  <p className="mt-4 text-center text-xs leading-5 text-gray-500">
                    Al continuar se abrirá WhatsApp
                    con el detalle de tu pedido.
                  </p>

                </div>
              )}

            </motion.aside>
          </motion.div>
        )}
      </AnimatePresence>

    </main>
  );
}

/* =====================================================
   COMPONENTE PASO
===================================================== */

function PasoPedido({
  numero,
  icono,
  titulo,
  descripcion,
  delay,
}: {
  numero: string;
  icono: string;
  titulo: string;
  descripcion: string;
  delay: number;
}) {
  return (
    <motion.article
      initial={{
        opacity: 0,
        y: 30,
      }}
      whileInView={{
        opacity: 1,
        y: 0,
      }}
      viewport={{
        once: false,
        amount: 0.25,
      }}
      transition={{
        duration: 0.6,
        delay,
      }}
      whileHover={{
        y: -5,
      }}
      className="relative overflow-hidden rounded-3xl border border-[#58b9f5]/15 bg-[#0b2038]/65 p-6 shadow-lg shadow-black/10 transition-colors hover:border-[#58b9f5]/40"
    >
      <span className="absolute right-5 top-4 text-3xl font-black text-[#f5a623]/20">
        {numero}
      </span>

      <div className="mb-5 flex h-13 w-13 items-center justify-center rounded-2xl bg-[#58b9f5]/12 text-2xl">
        {icono}
      </div>

      <h3 className="mb-2 text-lg font-bold text-white">
        {titulo}
      </h3>

      <p className="text-sm leading-6 text-[#b8c9da]">
        {descripcion}
      </p>
    </motion.article>
  );
}