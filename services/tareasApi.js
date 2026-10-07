import { Platform } from "react-native";

const URL_POR_DEFECTO =
  Platform.OS === "android" ? "http://10.0.2.2:5134" : "http://localhost:5134";
export const API_URL = process.env.EXPO_PUBLIC_API_URL || URL_POR_DEFECTO;

export async function peticion(ruta, opciones = {}) {
  let respuesta;
  try {
    respuesta = await fetch(`${API_URL}${ruta}`, {
      headers: { "Content-Type": "application/json" },
      ...opciones,
    });
  } catch {
    throw new Error(
      `No se pudo conectar con la API (${API_URL}). ¿Está corriendo "dotnet run"?`
    );
  }

  if (respuesta.status === 204) return null;

  const datos = await respuesta.json().catch(() => null);
  if (!respuesta.ok) {
    throw new Error(
      datos?.error || datos?.mensaje || `Error ${respuesta.status} de la API`
    );
  }
  return datos;
}

export const obtenerTareas = () => peticion("/tareas");

export const crearTarea = (tarea) =>
  peticion("/tareas", { method: "POST", body: JSON.stringify(tarea) });

export const actualizarTarea = (id, tarea) =>
  peticion(`/tareas/${id}`, { method: "PUT", body: JSON.stringify(tarea) });

export const eliminarTarea = (id) =>
  peticion(`/tareas/${id}`, { method: "DELETE" });
