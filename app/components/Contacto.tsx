"use client";

import { motion } from "motion/react";

export default function Contacto() {
  return (
    <section
      id="contacto"
      className="relative scroll-mt-24 overflow-hidden border-t border-white/5 bg-[#07101c] px-6 py-24 text-[#f7fbff]"
    >
      {/* =========================
          LUCES DECORATIVAS
      ========================= */}

      <div className="pointer-events-none absolute -right-40 top-0 h-96 w-96 rounded-full bg-[#58b9f5]/10 blur-3xl" />

      <div className="pointer-events-none absolute -left-40 bottom-0 h-80 w-80 rounded-full bg-[#f5a623]/6 blur-3xl" />

      <div className="relative mx-auto max-w-6xl">

        {/* =========================
            TITULO
        ========================= */}

        <motion.div
          initial={{
            opacity: 0,
            y: 40,
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
            Estamos cerca
          </p>

          <h2 className="text-3xl font-bold text-white md:text-5xl">
            Contactanos
          </h2>

          <div className="mx-auto mt-5 h-1 w-16 rounded-full bg-[#58b9f5]" />

          <p className="mx-auto mt-6 max-w-xl text-sm leading-7 text-[#b8c9da] md:text-base">
            Hacé tu pedido, consultanos el menú del
            día o coordiná la entrega directamente
            con nosotros.
          </p>
        </motion.div>

        {/* =========================
            TARJETAS
        ========================= */}

        <div className="grid gap-5 md:grid-cols-3">

          {/* =========================
              WHATSAPP
          ========================= */}

          <motion.a
            href="https://wa.me/3874024408"
            target="_blank"
            rel="noopener noreferrer"
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
              amount: 0.25,
            }}
            transition={{
              duration: 0.6,
            }}
            whileHover={{
              y: -7,
            }}
            className="group flex flex-col rounded-3xl border border-[#58b9f5]/15 bg-[#0b2038]/70 p-7 shadow-xl shadow-black/15 backdrop-blur-sm transition-colors hover:border-[#58b9f5]/45"
          >
            <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-[#58b9f5]/12 text-2xl">
              💬
            </div>

            <p className="mb-2 text-xs font-bold uppercase tracking-widest text-[#58b9f5]">
              WhatsApp
            </p>

            <h3 className="text-xl font-bold text-white">
              Hacé tu pedido
            </h3>

            <p className="mt-3 flex-1 text-sm leading-6 text-[#b8c9da]">
              Escribinos y coordinamos todos los
              detalles de tu pedido.
            </p>

            <p className="mt-6 text-lg font-black text-[#f5a623]">
              387 402-4408
            </p>

            <p className="mt-3 text-sm font-semibold text-[#bfe8ff] transition group-hover:translate-x-1 group-hover:text-[#58b9f5]">
              Enviar mensaje →
            </p>
          </motion.a>

          {/* =========================
              UBICACION
          ========================= */}

          <motion.article
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
              amount: 0.25,
            }}
            transition={{
              duration: 0.6,
              delay: 0.1,
            }}
            whileHover={{
              y: -7,
            }}
            className="flex flex-col rounded-3xl border border-[#58b9f5]/15 bg-[#0b2038]/70 p-7 shadow-xl shadow-black/15 backdrop-blur-sm transition-colors hover:border-[#58b9f5]/45"
          >
            <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-[#58b9f5]/12 text-2xl">
              📍
            </div>

            <p className="mb-2 text-xs font-bold uppercase tracking-widest text-[#58b9f5]">
              Barrio Solis Pizarro
            </p>

            <h3 className="text-xl font-bold text-white">
              ADRIGUADY2
            </h3>

            <p className="mt-3 text-sm leading-6 text-[#b8c9da]">
              Las Cigueñas 3040
            </p>

            <div className="mt-6 space-y-3">

              <div className="flex items-center gap-3 rounded-2xl bg-[#06172a]/70 px-4 py-3">

                <span className="text-lg">
                  🛵
                </span>

                <p className="text-sm text-[#bfe8ff]">
                  Entrega a coordinar
                </p>

              </div>

              <div className="flex items-center gap-3 rounded-2xl bg-[#06172a]/70 px-4 py-3">

                <span className="text-lg">
                  🥡
                </span>

                <p className="text-sm text-[#bfe8ff]">
                  Retiro del pedido
                </p>

              </div>

            </div>
          </motion.article>

          {/* =========================
              HORARIOS
          ========================= */}

          <motion.article
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
              amount: 0.25,
            }}
            transition={{
              duration: 0.6,
              delay: 0.2,
            }}
            whileHover={{
              y: -7,
            }}
            className="flex flex-col rounded-3xl border border-[#58b9f5]/15 bg-[#0b2038]/70 p-7 shadow-xl shadow-black/15 backdrop-blur-sm transition-colors hover:border-[#58b9f5]/45"
          >
            <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-[#58b9f5]/12 text-2xl">
              🕐
            </div>

            <p className="mb-2 text-xs font-bold uppercase tracking-widest text-[#58b9f5]">
              Horarios
            </p>

            <h3 className="text-xl font-bold text-white">
              Horario de atención
            </h3>

            <div className="mt-5 space-y-4">

              {/* MENU */}

              <div className="rounded-2xl border border-[#f5a623]/15 bg-[#f5a623]/5 p-4">

                <p className="text-xs font-bold uppercase tracking-widest text-[#f5a623]">
                  Menú
                </p>

                <p className="mt-2 text-sm text-[#b8c9da]">
                  Lunes a viernes
                </p>

                <p className="mt-1 text-lg font-black text-white">
                  9:00 a 15:30
                </p>

              </div>

              {/* SANDWICHERIA */}

              <div className="rounded-2xl border border-[#58b9f5]/15 bg-[#58b9f5]/5 p-4">

                <p className="text-xs font-bold uppercase tracking-widest text-[#58b9f5]">
                  Sandwichería
                </p>

                <p className="mt-2 text-sm text-[#b8c9da]">
                  Martes a domingo
                </p>

                <p className="mt-1 text-lg font-black text-white">
                  20:00 a 00:00
                </p>

              </div>

            </div>
          </motion.article>

        </div>

        {/* =========================
            CTA INFERIOR
        ========================= */}

        <motion.div
          initial={{
            opacity: 0,
            y: 25,
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
            duration: 0.7,
          }}
          className="mt-16 text-center"
        >
          <motion.a
            href="https://wa.me/3874024408"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{
              scale: 1.05,
            }}
            whileTap={{
              scale: 0.96,
            }}
            className="inline-flex items-center gap-3 rounded-full bg-[#58b9f5] px-8 py-3.5 text-sm font-bold text-[#06172a] shadow-xl shadow-[#58b9f5]/15 transition hover:bg-[#bfe8ff]"
          >
            <span className="text-lg">
              💬
            </span>

            Pedir por WhatsApp
          </motion.a>
        </motion.div>

      </div>
    </section>
  );
}