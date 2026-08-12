"use client";

import {
  AnimatePresence,
  motion,
} from "motion/react";

import {
  useEffect,
  useState,
} from "react";

/* =========================
   IMAGENES DEL CARRUSEL
========================= */

const heroImages = [
  "/hero-adriguady2-1.png",
  "/hero-adriguady2-2.png",
  "/hero-adriguady2-3.png",
];

export default function HeroBanner() {
  const [imagenActiva, setImagenActiva] =
    useState(0);

  const [pausado, setPausado] =
    useState(false);

  /* =========================
     CARRUSEL AUTOMATICO
  ========================= */

  useEffect(() => {
    if (pausado) return;

    const intervalo = window.setInterval(() => {
      setImagenActiva((actual) =>
        actual === heroImages.length - 1
          ? 0
          : actual + 1
      );
    }, 5000);

    return () => {
      window.clearInterval(intervalo);
    };
  }, [pausado]);

  /* =========================
     IR AL MENU
  ========================= */

  const scrollToMenu = () => {
    document
      .getElementById("menu")
      ?.scrollIntoView({
        behavior: "smooth",
      });
  };

  return (
    <section
      id="inicio"
      onMouseEnter={() => setPausado(true)}
      onMouseLeave={() => setPausado(false)}
      className="relative h-screen min-h-162.5 overflow-hidden bg-[#06172a]"
    >
      {/* =========================
          CARRUSEL DE FONDO
      ========================= */}

      <AnimatePresence initial={false}>
        <motion.div
          key={heroImages[imagenActiva]}
          initial={{
            opacity: 0,
          }}
          animate={{
            opacity: 1,
          }}
          exit={{
            opacity: 0,
          }}
          transition={{
            duration: 1.2,
            ease: "easeInOut",
          }}
          style={{
            backgroundImage: `url("${heroImages[imagenActiva]}")`,
          }}
          className="absolute inset-0 z-0 bg-cover bg-[position:68%_center] bg-no-repeat md:bg-center"
        />
      </AnimatePresence>

      {/* =========================
          CAPA AZUL
      ========================= */}

      <div className="absolute inset-0 z-10 bg-[#06172a]/20" />

      {/* =========================
          DEGRADADO IZQUIERDO
      ========================= */}

      <div className="absolute inset-0 z-10 bg-linear-to-r from-[#06172a]/95 via-[#07101c]/65 to-transparent" />

      {/* =========================
          DEGRADADO INFERIOR
      ========================= */}

      <div className="absolute inset-0 z-10 bg-linear-to-t from-[#07101c]/90 via-transparent to-[#06172a]/20" />

      {/* =========================
          CONTENIDO
      ========================= */}

      <div className="relative z-20 flex h-full items-center">
        <div className="mx-auto w-full max-w-7xl px-6 md:px-12">

          <div className="max-w-xl">

            {/* SUBTITULO */}

            <motion.p
              initial={{
                opacity: 0,
                y: 25,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                duration: 0.7,
                delay: 0.2,
              }}
              className="mb-2 text-sm font-semibold uppercase tracking-[0.35em] text-[#bfe8ff]"
            >
              Comida casera
            </motion.p>

            {/* =========================
                LOGO
            ========================= */}

            <motion.img
              src="/logo-adriguady2-hero.png"
              alt="Adriguady2"
              initial={{
                opacity: 0,
                y: 40,
                scale: 0.95,
              }}
              animate={{
                opacity: 1,
                y: 0,
                scale: 1,
              }}
              transition={{
                duration: 1,
                delay: 0.4,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="w-full max-w-125 object-contain"
            />

            {/* =========================
                LINEA CELESTE
            ========================= */}

            <motion.div
              initial={{
                width: 0,
              }}
              animate={{
                width: 90,
              }}
              transition={{
                duration: 1,
                delay: 0.9,
              }}
              className="my-5 h-1 rounded-full bg-[#58b9f5]"
            />

            {/* =========================
                DESCRIPCION
            ========================= */}

            <motion.p
              initial={{
                opacity: 0,
                y: 30,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                duration: 0.8,
                delay: 1,
              }}
              className="max-w-md text-base leading-7 text-[#f7fbff] md:text-lg"
            >
              Comida rica, abundante y hecha como
              en casa, con sopa, pan y postre.
            </motion.p>

            {/* =========================
                BOTONES
            ========================= */}

            <motion.div
              initial={{
                opacity: 0,
                y: 30,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                duration: 0.8,
                delay: 1.3,
              }}
              className="mt-8 flex flex-wrap gap-4"
            >
              {/* VER MENU */}

              <motion.button
                whileHover={{
                  scale: 1.05,
                }}
                whileTap={{
                  scale: 0.96,
                }}
                onClick={scrollToMenu}
                className="rounded-full bg-[#58b9f5] px-7 py-3 text-sm font-bold text-[#06172a] shadow-lg shadow-[#58b9f5]/20 transition hover:bg-[#bfe8ff]"
              >
                Ver menú
              </motion.button>

              {/* WHATSAPP */}

              <motion.a
                whileHover={{
                  scale: 1.05,
                  backgroundColor:
                    "rgba(88,185,245,0.20)",
                }}
                whileTap={{
                  scale: 0.96,
                }}
                href="https://wa.me/3874024408"
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full border border-[#bfe8ff]/50 bg-[#06172a]/40 px-7 py-3 text-sm font-medium text-white backdrop-blur-md"
              >
                WhatsApp
              </motion.a>
            </motion.div>

          </div>
        </div>
      </div>

      {/* =========================
          INDICADORES DEL CARRUSEL
      ========================= */}

      <motion.div
        initial={{
          opacity: 0,
          y: 20,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        transition={{
          delay: 1.8,
          duration: 0.7,
        }}
        className="absolute bottom-8 left-1/2 z-30 flex -translate-x-1/2 items-center gap-3"
      >
        {heroImages.map((_, index) => {
          const activa =
            index === imagenActiva;

          return (
            <button
              key={index}
              onClick={() =>
                setImagenActiva(index)
              }
              aria-label={`Mostrar imagen ${
                index + 1
              }`}
              className={`h-2 rounded-full transition-all duration-500 ${
                activa
                  ? "w-9 bg-[#58b9f5]"
                  : "w-2 bg-white/50 hover:bg-white"
              }`}
            />
          );
        })}
      </motion.div>

    </section>
  );
}