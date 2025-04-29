import fetch from 'node-fetch';
import fs from 'fs';

const buscarProductosTemu = async (palabraClave) => {
  try {
    const respuesta = await fetch(`https://www.temu.com/api/search?query=${encodeURIComponent(palabraClave)}`);
    if (!respuesta.ok) throw new Error("No se pudo obtener productos de Temu");
    const data = await respuesta.json();

    const productos = data?.items?.map((item, i) => ({
      id: `temu-${i + 1}`,
      nombre: item.title,
      descripcion: item.description || "",
      precio: item.price?.value || 0,
      imagen: item.image?.url || "",
      origen: "Temu"
    })) || [];

    fs.writeFileSync("productos_temux.json", JSON.stringify(productos, null, 2));
    console.log("Productos guardados en productos_temux.json");
  } catch (error) {
    console.error("Error al buscar productos:", error.message);
  }
};

buscarProductosTemu("electronica");