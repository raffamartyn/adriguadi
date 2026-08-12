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

export default function Navbar() {
  const [scrolled, setScrolled] =
    useState(false);

  const [open, setOpen] =
    useState(false);

  /* =========================
     DETECTAR SCROLL
  ========================= */

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    handleScroll();

    window.addEventListener(
      "scroll",
      handleScroll
    );

    return () => {
      window.removeEventListener(
        "scroll",
        handleScroll
      );
    };
  }, []);

  /* =========================
     IR A SECCION
  ========================= */

  const scrollTo = (id: string) => {
    document
      .getElementById(id)
      ?.scrollIntoView({
        behavior: "smooth",
      });

    setOpen(false);
  };

  /* =========================
     ESTILO LINKS DESKTOP
  ========================= */

  const linkClass =
    "relative text-base font-semibold tracking-wide text-[#f7fbff] transition duration-300 after:absolute after:-bottom-2 after:left-0 after:h-0.5 after:w-0 after:rounded-full after:bg-[#58b9f5] after:transition-all after:duration-300 hover:text-[#bfe8ff] hover:after:w-full";

  return (
    <motion.nav
      initial={{
        y: -80,
        opacity: 0,
      }}
      animate={{
        y: 0,
        opacity: 1,
      }}
      transition={{
        duration: 0.8,
      }}
      className={`fixed left-0 top-0 z-50 w-full border-b transition-all duration-500 ${
        scrolled
          ? "border-white/10 bg-[#06172a]/90 py-2 shadow-xl shadow-black/20 backdrop-blur-xl"
          : "border-transparent bg-linear-to-b from-[#06172a]/70 to-transparent py-3"
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-5 md:px-12">

        {/* =========================
            LOGO
        ========================= */}

        <motion.button
          onClick={() => scrollTo("inicio")}
          whileHover={{
            scale: 1.03,
          }}
          whileTap={{
            scale: 0.97,
          }}
          className="relative z-50 flex items-center"
          aria-label="Volver al inicio"
        >
          <Image
            src="/logo-adriguady2-hero.png"
            alt="Adriguady2"
            width={300}
            height={148}
            priority
            className={`w-auto object-contain transition-all duration-500 ${
              scrolled
                ? "h-11 md:h-13"
                : "h-13 md:h-16"
            }`}
          />
        </motion.button>

        {/* =========================
            MENU DESKTOP
        ========================= */}

        <div className="hidden items-center gap-9 md:flex">

          <button
            onClick={() => scrollTo("inicio")}
            className={linkClass}
          >
            Inicio
          </button>

          <button
            onClick={() => scrollTo("menu")}
            className={linkClass}
          >
            Menú
          </button>

          <button
            onClick={() => scrollTo("nosotros")}
            className={linkClass}
          >
            Sobre nosotros
          </button>

          <motion.button
            onClick={() => scrollTo("contacto")}
            whileHover={{
              scale: 1.04,
            }}
            whileTap={{
              scale: 0.96,
            }}
            className="rounded-full bg-[#58b9f5] px-6 py-2.5 text-base font-bold text-[#06172a] shadow-lg shadow-[#58b9f5]/15 transition hover:bg-[#bfe8ff]"
          >
            Contacto
          </motion.button>

        </div>

        {/* =========================
            BOTON MOBILE
        ========================= */}

        <button
          onClick={() => setOpen((prev) => !prev)}
          className="relative z-50 flex h-11 w-11 flex-col items-center justify-center gap-1.5 rounded-full border border-white/15 bg-[#06172a]/50 backdrop-blur-md md:hidden"
          aria-label={
            open
              ? "Cerrar menú"
              : "Abrir menú"
          }
          aria-expanded={open}
        >
          <motion.span
            animate={
              open
                ? {
                    rotate: 45,
                    y: 7,
                  }
                : {
                    rotate: 0,
                    y: 0,
                  }
            }
            className="h-0.5 w-6 rounded-full bg-[#bfe8ff]"
          />

          <motion.span
            animate={
              open
                ? {
                    opacity: 0,
                    x: 10,
                  }
                : {
                    opacity: 1,
                    x: 0,
                  }
            }
            className="h-0.5 w-6 rounded-full bg-[#bfe8ff]"
          />

          <motion.span
            animate={
              open
                ? {
                    rotate: -45,
                    y: -7,
                  }
                : {
                    rotate: 0,
                    y: 0,
                  }
            }
            className="h-0.5 w-6 rounded-full bg-[#bfe8ff]"
          />
        </button>

      </div>

      {/* =========================
          MENU MOBILE
      ========================= */}

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{
              opacity: 0,
              height: 0,
            }}
            animate={{
              opacity: 1,
              height: "auto",
            }}
            exit={{
              opacity: 0,
              height: 0,
            }}
            transition={{
              duration: 0.35,
            }}
            className="overflow-hidden border-t border-white/10 bg-[#06172a]/98 backdrop-blur-xl md:hidden"
          >
            <div className="flex flex-col px-6 py-5">

              <button
                onClick={() =>
                  scrollTo("inicio")
                }
                className="border-b border-white/10 py-4 text-left text-lg font-semibold text-white transition hover:pl-2 hover:text-[#58b9f5]"
              >
                Inicio
              </button>

              <button
                onClick={() =>
                  scrollTo("menu")
                }
                className="border-b border-white/10 py-4 text-left text-lg font-semibold text-white transition hover:pl-2 hover:text-[#58b9f5]"
              >
                Menú
              </button>

              <button
                onClick={() =>
                  scrollTo("nosotros")
                }
                className="border-b border-white/10 py-4 text-left text-lg font-semibold text-white transition hover:pl-2 hover:text-[#58b9f5]"
              >
                Sobre nosotros
              </button>

              <button
                onClick={() =>
                  scrollTo("contacto")
                }
                className="mt-5 rounded-full bg-[#58b9f5] py-3.5 text-center text-base font-bold text-[#06172a] transition hover:bg-[#bfe8ff]"
              >
                Contacto
              </button>

            </div>
          </motion.div>
        )}
      </AnimatePresence>

    </motion.nav>
  );
}