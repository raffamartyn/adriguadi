import { NextRequest, NextResponse } from "next/server";

const DOMINIOS_PERMITIDOS = [
  "appsheet.com",
  "google.com",
  "googleusercontent.com",
  "googleapis.com",
  "ggpht.com",
];

const dominioPermitido = (hostname: string) =>
  DOMINIOS_PERMITIDOS.some(
    (dominio) =>
      hostname === dominio || hostname.endsWith(`.${dominio}`)
  );

export async function GET(request: NextRequest) {
  const valor = request.nextUrl.searchParams.get("url");

  if (!valor) {
    return NextResponse.json(
      { error: "Falta la URL de la imagen" },
      { status: 400 }
    );
  }

  try {
    const url = new URL(valor);

    if (url.protocol !== "https:" || !dominioPermitido(url.hostname)) {
      return NextResponse.json(
        { error: "Dominio de imagen no permitido" },
        { status: 403 }
      );
    }

    const respuesta = await fetch(url, {
      cache: "no-store",
      redirect: "follow",
    });

    if (!respuesta.ok) {
      return NextResponse.json(
        { error: "No se pudo cargar la imagen" },
        { status: respuesta.status }
      );
    }

    const tipo = respuesta.headers.get("content-type") ?? "image/jpeg";

    if (!tipo.startsWith("image/")) {
      return NextResponse.json(
        { error: "El recurso recibido no es una imagen" },
        { status: 415 }
      );
    }

    const imagen = await respuesta.arrayBuffer();

    return new NextResponse(imagen, {
      headers: {
        "Content-Type": tipo,
        "Cache-Control": "public, max-age=3600, stale-while-revalidate=86400",
      },
    });
  } catch (error) {
    console.error("Error en image-proxy:", error);

    return NextResponse.json(
      { error: "URL de imagen inválida" },
      { status: 400 }
    );
  }
}