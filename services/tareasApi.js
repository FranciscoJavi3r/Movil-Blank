// ------------------------------------------------------------
// SERVICIO DE API: aquí vive TODA la comunicación con TareasAPI.
// Las pantallas no usan fetch directamente; llaman a estas funciones.
// ------------------------------------------------------------
import { Platform } from "react-native";

// Dirección de la API. Se puede cambiar sin tocar el código creando un
// archivo .env con:  EXPO_PUBLIC_API_URL=http://192.168.1.50:5134
// Por defecto:
//  - web e iOS simulador: localhost (la API corre en tu misma PC)
//  - emulador de Android: 10.0.2.2 es el "localhost" de la PC vista desde el emulador
const URL_POR_DEFECTO =
  Platform.OS === "android" ? "http://10.0.2.2:5134" : "http://localhost:5134";
export const API_URL = process.env.EXPO_PUBLIC_API_URL || URL_POR_DEFECTO;

// Función común para todas las peticiones. Se encarga de:
// 1. Avisar con un mensaje claro si no hay conexión con la API.
// 2. Convertir los errores de la API ({ error } o { mensaje }) en un Error.
// 3. No intentar leer JSON cuando la API responde 204 (sin contenido).
async function peticion(ruta, opciones = {}) {
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

  // 204 No Content: salió bien pero no hay cuerpo que leer (PUT y DELETE).
  if (respuesta.status === 204) return null;

  const datos = await respuesta.json().catch(() => null);
  if (!respuesta.ok) {
    throw new Error(
      datos?.error || datos?.mensaje || `Error ${respuesta.status} de la API`
    );
  }
  return datos;
}

// GET /tareas -> lista de tareas
export const obtenerTareas = () => peticion("/tareas");

// POST /tareas -> devuelve la tarea creada (con su id asignado)
export const crearTarea = (tarea) =>
  peticion("/tareas", { method: "POST", body: JSON.stringify(tarea) });

// PUT /tareas/{id} -> la API pide TODOS los campos (titulo, descripcion, completada)
export const actualizarTarea = (id, tarea) =>
  peticion(`/tareas/${id}`, { method: "PUT", body: JSON.stringify(tarea) });

// DELETE /tareas/{id}
export const eliminarTarea = (id) =>
  peticion(`/tareas/${id}`, { method: "DELETE" });
