// Peticiones a los endpoints de licencias de TareasAPI.
// Usa la misma dirección de la API y el mismo manejo de errores que las tareas.
import { peticion } from "./tareasApi";

// GET /licencias -> lista de licencias guardadas
export const obtenerLicencias = () => peticion("/licencias");

// POST /licencias -> devuelve la licencia creada, con su id
export const crearLicencia = (licencia) =>
  peticion("/licencias", { method: "POST", body: JSON.stringify(licencia) });
