"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import apim from "@/app/api/apim";

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

export default function Home() {
  const [menuItems, setMenuItems] = useState<Menus[]>([]);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  /* =========================
     FETCH
  ========================= */
  useEffect(() => {
    const fetchMenu = async () => {
      const data = await apim.match.list();
      setMenuItems(data);
      setLoading(false);
    };

    fetchMenu();
  }, []);

  /* =========================
     CART
  ========================= */

  const addToCart = (item: Menus) => {
    setCart((prev) => {
      const existing = prev.find((i) => i.ID === item.ID);

      if (existing) {
        return prev.map((i) =>
          i.ID === item.ID ? { ...i, qty: i.qty + 1 } : i
        );
      }

      return [...prev, { ...item, qty: 1 }];
    });
  };

  const changeQty = (id: string, delta: number) => {
    setCart((prev) =>
      prev.map((item) =>
        item.ID === id
          ? { ...item, qty: Math.max(1, item.qty + delta) }
          : item
      )
    );
  };

  const removeFromCart = (id: string) => {
    setCart((prev) => prev.filter((item) => item.ID !== id));
  };

  const getTotal = () => {
    return cart
      .reduce((acc, item) => acc + item.PRECIO * item.qty, 0)
      .toFixed(2);
  };

  const sendToWhatsApp = () => {
    const message = cart
      .map(
        (item, i) =>
          `${i + 1}. ${item.MENU} x${item.qty} - $${(
            item.PRECIO * item.qty
          ).toFixed(2)}`
      )
      .join("%0A");

    const url = `https://wa.me/3874024408?text=Pedido:%0A${message}%0ATotal:$${getTotal()}`;

    window.open(url, "_blank");
  };

  if (loading) {
    return (
      <main className="min-h-screen flex items-center justify-center text-white">
        Cargando menú...
      </main>
    );
  }

  return (
    <main className="relative min-h-screen text-white overflow-hidden">
      {/* 🔥 FONDO ORIGINAL */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-[url('/fondo.jpeg')] bg-cover bg-center" />
        <div className="absolute inset-0 bg-black/70" />
      </div>

      {/* 🔥 HEADER ORIGINAL */}
      <header className="flex flex-col items-center justify-center py-16">
        <div className="w-44 h-44 rounded-full overflow-hidden border border-[#d4af37] shadow-lg">
          <video
            src="/logo.mp4"
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover"
          />
        </div>

        <h1 className="text-4xl font-light tracking-[0.3em] mt-6">
          ADRIGUADI
        </h1>

        <div className="w-16 h-1px bg-[#d4af37] my-4" />

        <p className="text-gray-300 text-sm tracking-widest">
          ALTA COCINA
        </p>
        <div className="flex gap-6 mt-6 text-[#d4af37]">
  <a href="https://wa.me/3874024408" target="_blank">
    <img
      src="https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/whatsapp.svg"
      className="w-8 h-8"
      style={{ filter: "invert(73%) sepia(45%) saturate(400%) hue-rotate(10deg)" }}
    />
  </a>

  <a href="https://maps.google.com/?q=El Chaja 1705, A4400 Salta" target="_blank">
    <img
      src="https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/googlemaps.svg"
      className="w-8 h-8"
      style={{ filter: "invert(73%) sepia(45%) saturate(400%) hue-rotate(10deg)" }}
    />
  </a>

  <a href="https://www.facebook.com/share/1CWciP4UtV/" target="_blank">
    <img
      src="https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/facebook.svg"
      className="w-8 h-8"
      style={{ filter: "invert(73%) sepia(45%) saturate(400%) hue-rotate(10deg)" }}
    />
  </a>
</div>
<div className="mt-10 text-center max-w-xl mx-auto">
  <h3 className="text-lg tracking-widest text-[#d4af37] mb-6">
    ¿CÓMO HACER TU PEDIDO?
  </h3>

  <div className="space-y-5 text-gray-300 text-sm">

    {/* Paso 1 */}
    <div className="flex items-center gap-4 justify-center">
      <img
        src="https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/foodpanda.svg"
        className="w-6 h-6 invert"
      />
      <p>Elegí tus platos favoritos del menú</p>
    </div>

    {/* Paso 2 */}
    <div className="flex items-center gap-4 justify-center">
      <img
        src="https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/addthis.svg"
        className="w-6 h-6 invert"
      />
      <p>Agregalos al carrito 🛒</p>
    </div>

    {/* Paso 3 */}
    <div className="flex items-center gap-4 justify-center">
      <img
        src="https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/whatsapp.svg"
        className="w-6 h-6 invert"
      />
      <p>Enviá tu pedido por WhatsApp</p>
    </div>

    {/* Paso 4 */}
    <div className="flex items-center gap-4 justify-center">
      <img
        src="https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/googlemaps.svg"
        className="w-6 h-6 invert"
      />
      <p>Coordinamos entrega o retiro 📍</p>
    </div>

  </div>
</div>
      </header>

      {/* MENU */}
      <section className="px-6 pb-24 max-w-6xl mx-auto">
        <h2 className="text-center text-2xl font-light mb-12">
          Nuestro Menú
        </h2>

        <div className="grid gap-10 md:grid-cols-3">
          {menuItems.map((item) => {
            const imageUrl = encodeURI(`${item.LINK}/${item.IMAGEN}`);

            return (
              <div
                key={item.ID}
                className="bg-[#111]/80 backdrop-blur rounded-3xl overflow-hidden shadow-xl hover:scale-[1.02] transition"
              >
                <div className="relative h-52 w-full">
                  <Image
                    src={imageUrl}
                    alt={item.MENU}
                    fill
                    className="object-cover"
                  />
                </div>

                <div className="p-6">
                  <h3 className="text-xl mb-2">{item.MENU}</h3>
                  <p className="text-gray-400 text-sm mb-6">
                    {item.DESCRIPCION}
                  </p>

                  <div className="flex justify-between">
                    <span className="text-[#d4af37] text-lg">
                      ${item.PRECIO}
                    </span>

                    <button
                      onClick={() => addToCart(item)}
                      className="border border-[#d4af37] px-4 py-2 rounded-full hover:bg-[#d4af37] hover:text-black"
                    >
                      Agregar
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* BOTÓN */}
      <button
        onClick={() => setOpen(true)}
        className="fixed bottom-6 right-6 bg-[#d4af37] text-black px-5 py-3 rounded-full shadow-lg"
      >
        🛒 {cart.length}
      </button>

      {/* DRAWER */}
      {open && (
        <div className="fixed inset-0 bg-black/60 flex justify-end z-50">
          <div className="w-full max-w-md bg-[#111] h-full p-6 overflow-y-auto">
            <div className="flex justify-between mb-6">
              <h2>Tu Pedido</h2>
              <button onClick={() => setOpen(false)}>✕</button>
            </div>

            {cart.map((item) => (
              <div key={item.ID} className="mb-4 border-b pb-4">
                <h3>{item.MENU}</h3>

                <div className="flex justify-between mt-2">
                  <div className="flex gap-2">
                    <button onClick={() => changeQty(item.ID, -1)}>
                      -
                    </button>
                    <span>{item.qty}</span>
                    <button onClick={() => changeQty(item.ID, 1)}>
                      +
                    </button>
                  </div>

                  <span>
                    ${(item.PRECIO * item.qty).toFixed(2)}
                  </span>
                </div>

                <button
                  onClick={() => removeFromCart(item.ID)}
                  className="text-red-400 text-xs mt-2"
                >
                  Eliminar
                </button>
              </div>
            ))}

            <p className="mt-6 text-lg">Total: ${getTotal()}</p>

            <button
              onClick={sendToWhatsApp}
              className="mt-4 w-full bg-[#d4af37] text-black py-3 rounded-full"
            >
              Enviar pedido
            </button>
          </div>
        </div>
      )}
    </main>
  );
}