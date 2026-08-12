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

const imagenesLocal = [
  "/local-adriguady2-1.png",
  "/local-adriguady2-2.png",
];

export default function SobreNosotros() {
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
        actual === imagenesLocal.length - 1
          ? 0
          : actual + 1
      );
    }, 5000);

    return () => {
      window.clearInterval(intervalo);
    };
  }, [pausado]);

  return (
    <section
      id="nosotros"
      className="relative scroll-mt-24 overflow-hidden bg-[#07101c] px-5 py-14 text-[#f7fbff] md:py-16"
    >
      {/* =========================
          DECORACION
      ========================= */}

      <div className="pointer-events-none absolute -left-40 top-1/3 h-72 w-72 rounded-full bg-[#58b9f5]/8 blur-3xl" />

      <div className="pointer-events-none absolute -right-40 bottom-0 h-64 w-64 rounded-full bg-[#f5a623]/5 blur-3xl" />

      <div className="relative mx-auto grid max-w-5xl items-center gap-8 lg:grid-cols-2 lg:gap-10">

        {/* =========================
            CARRUSEL
        ========================= */}

        <motion.div
          initial={{
            opacity: 0,
            x: -35,
          }}
          whileInView={{
            opacity: 1,
            x: 0,
          }}
          viewport={{
            once: false,
            amount: 0.25,
          }}
          transition={{
            duration: 0.65,
          }}
          onMouseEnter={() =>
            setPausado(true)
          }
          onMouseLeave={() =>
            setPausado(false)
          }
          className="relative"
        >
          {/* FOTO */}

          <div className="relative h-72 overflow-hidden rounded-3xl border border-[#58b9f5]/20 bg-[#06172a] shadow-xl shadow-black/25 sm:h-84 lg:h-96">

            <AnimatePresence initial={false}>
              <motion.div
                key={
                  imagenesLocal[imagenActiva]
                }
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
                  duration: 0.9,
                  ease: "easeInOut",
                }}
                className="absolute inset-0"
              >
                <Image
                  src={
                    imagenesLocal[imagenActiva]
                  }
                  alt={`Local de ADRIGUADY2 ${
                    imagenActiva + 1
                  }`}
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover"
                />
              </motion.div>
            </AnimatePresence>

            {/* SOMBRA */}

            <div className="absolute inset-0 bg-linear-to-t from-[#06172a]/75 via-transparent to-transparent" />

            {/* ETIQUETA */}

            <div className="absolute bottom-4 left-4 rounded-full border border-white/15 bg-[#06172a]/75 px-4 py-2 backdrop-blur-md">

              <p className="text-xs font-bold text-white">
                Un espacio hecho en familia
              </p>

            </div>

            {/* INDICADORES */}

            <div className="absolute bottom-5 right-4 z-20 flex items-center gap-2">

              {imagenesLocal.map(
                (_, index) => {
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
                          ? "w-7 bg-[#58b9f5]"
                          : "w-2 bg-white/50 hover:bg-white"
                      }`}
                    />
                  );
                }
              )}

            </div>
          </div>

          {/* MARCO TRASERO */}

          <div className="absolute -bottom-3 -left-3 -z-10 h-full w-full rounded-3xl border border-[#58b9f5]/20" />

          {/* =========================
              SELLO 4 AÑOS
          ========================= */}

          <motion.div
            initial={{
              opacity: 0,
              scale: 0.7,
            }}
            whileInView={{
              opacity: 1,
              scale: 1,
            }}
            viewport={{
              once: false,
              amount: 0.5,
            }}
            transition={{
              duration: 0.5,
              delay: 0.2,
            }}
            className="absolute -right-2 -top-3 flex h-18 w-18 flex-col items-center justify-center rounded-full border-4 border-[#07101c] bg-[#f5a623] text-center text-[#06172a] shadow-lg sm:-right-3 sm:h-20 sm:w-20"
          >
            <span className="text-xl font-black">
              2
            </span>

            <span className="text-[10px] font-black uppercase tracking-wide">
              años
            </span>
          </motion.div>

        </motion.div>

        {/* =========================
            HISTORIA
        ========================= */}

        <motion.div
          initial={{
            opacity: 0,
            x: 35,
          }}
          whileInView={{
            opacity: 1,
            x: 0,
          }}
          viewport={{
            once: false,
            amount: 0.25,
          }}
          transition={{
            duration: 0.65,
            delay: 0.05,
          }}
        >
          {/* TITULO PEQUEÑO */}

          <p className="mb-2 text-[11px] font-bold uppercase tracking-[0.3em] text-[#58b9f5]">
            Nuestra historia
          </p>

          {/* TITULO */}

          <h2 className="max-w-lg text-2xl font-bold leading-tight text-white md:text-3xl">
            Comida casera hecha con compromiso
          </h2>

          <div className="mt-4 h-1 w-16 rounded-full bg-[#58b9f5]" />

          {/* TEXTO */}

          <div className="mt-5 space-y-3 text-sm leading-6 text-[#b8c9da]">

            <p>
              ADRIGUADY2 nació como un
              emprendimiento familiar para ofrecer
              comida rica, abundante y hecha como
              en casa.
            </p>

            <p>
              Desde hace cuatro años acompañamos
              a nuestros clientes con platos
              caseros, atención cercana y el
              compromiso de mejorar cada día.
            </p>

            <p>
              Cuidamos la higiene del espacio y la
              manipulación responsable de los
              alimentos en cada preparación.
            </p>

          </div>

          {/* =========================
              VALORES
          ========================= */}

          <div className="mt-6 grid gap-3 sm:grid-cols-3">

            <Valor
              icono="👨‍👩‍👧‍👦"
              titulo="Familiar"
              descripcion="Construido en familia."
              delay={0}
            />

            <Valor
              icono="🤝"
              titulo="Compromiso"
              descripcion="Atención responsable."
              delay={0.08}
            />

            <Valor
              icono="✨"
              titulo="Higiene"
              descripcion="Preparación cuidada."
              delay={0.16}
            />

          </div>

          {/* =========================
              FRASE FINAL
          ========================= */}

          <motion.div
            initial={{
              opacity: 0,
              y: 15,
            }}
            whileInView={{
              opacity: 1,
              y: 0,
            }}
            viewport={{
              once: false,
              amount: 0.5,
            }}
            transition={{
              duration: 0.5,
              delay: 0.2,
            }}
            className="mt-6 rounded-xl border-l-4 border-[#f5a623] bg-[#0b2038]/70 px-4 py-3"
          >
            <p className="text-sm font-semibold leading-6 text-[#f7fbff]">
              “Cada pedido lleva el sabor y el
              cuidado que compartiríamos en
              nuestra propia mesa.”
            </p>
          </motion.div>

        </motion.div>
      </div>
    </section>
  );
}

/* =====================================================
   COMPONENTE VALOR
===================================================== */

function Valor({
  icono,
  titulo,
  descripcion,
  delay,
}: {
  icono: string;
  titulo: string;
  descripcion: string;
  delay: number;
}) {
  return (
    <motion.article
      initial={{
        opacity: 0,
        y: 18,
      }}
      whileInView={{
        opacity: 1,
        y: 0,
      }}
      viewport={{
        once: false,
        amount: 0.4,
      }}
      transition={{
        duration: 0.45,
        delay,
      }}
      whileHover={{
        y: -4,
      }}
      className="rounded-xl border border-[#58b9f5]/15 bg-[#0b2038]/65 p-3 transition-colors hover:border-[#58b9f5]/40"
    >
      <div className="mb-2 text-xl">
        {icono}
      </div>

      <h3 className="text-sm font-bold text-white">
        {titulo}
      </h3>

      <p className="mt-1 text-[11px] leading-4 text-[#b8c9da]">
        {descripcion}
      </p>
    </motion.article>
  );
}