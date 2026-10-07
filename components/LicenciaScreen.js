// ------------------------------------------------------------
// PANTALLA DE LICENCIA DE CONDUCIR
// Muestra las licencias guardadas en TareasAPI, cada una dentro de
// una "tarjeta" (card), y permite agregar una licencia nueva.
//   GET  /licencias  -> trae las licencias
//   POST /licencias  -> agrega una licencia
// ------------------------------------------------------------

import { useState, useEffect, useCallback } from "react";
import {
  View,
  Text,
  Image,
  ScrollView,
  TextInput,
  Pressable,
  ActivityIndicator,
  StyleSheet,
} from "react-native";
import { obtenerLicencias, crearLicencia } from "../services/licenciasApi";

// ------------------------------------------------------------
// ESTILOS
// Aquí se definen todos los estilos de la pantalla. Cada nombre
// (pantalla, card, foto, etc.) se usa después con style={styles.nombre}.
// ------------------------------------------------------------
const styles = StyleSheet.create({
  // Fondo de toda la pantalla. flex: 1 hace que ocupe todo el espacio disponible.
  pantalla: { flex: 1, backgroundColor: "#e6f7ff" },
  // Espacio interno alrededor del contenido.
  contenedor: { padding: 20 },
  // La tarjeta blanca de la licencia, con esquinas redondeadas y sombra.
  card: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    elevation: 4, // sombra en Android
    shadowColor: "#000", // las propiedades shadow* son la sombra en iOS
    shadowOpacity: 0.15,
    shadowRadius: 6,
  },
  // Parte de arriba de la tarjeta (títulos), centrada.
  encabezado: { alignItems: "center", marginBottom: 16 },
  tituloEncabezado: { fontSize: 12, letterSpacing: 2, color: "#0077b6", fontWeight: "700" },
  subtituloEncabezado: { fontSize: 18, fontWeight: "bold", color: "#023e8a" },
  // Fila con la foto a la izquierda y el nombre a la derecha.
  // flexDirection: "row" acomoda los elementos uno al lado del otro.
  filaPrincipal: { flexDirection: "row", alignItems: "center", marginBottom: 12 },
  foto: { width: 90, height: 90, borderRadius: 12, marginRight: 16, borderWidth: 2, borderColor: "#0077b6" },
  // Cuadro que ocupa el lugar de la foto cuando la licencia no tiene una.
  fotoVacia: { backgroundColor: "#caf0f8", alignItems: "center", justifyContent: "center" },
  fotoInicial: { fontSize: 36, fontWeight: "bold", color: "#0077b6" },
  // flex: 1 hace que esta parte ocupe el espacio que sobra junto a la foto.
  datosPrincipales: { flex: 1 },
  nombre: { fontSize: 18, fontWeight: "bold", color: "#03045e", marginBottom: 6 },
  // "Badge" = etiqueta pequeña con fondo de color (aquí muestra el estado "Activa").
  badge: {
    backgroundColor: "#b7e4c7",
    alignSelf: "flex-start", // que no se estire, solo mida lo que mide su texto
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 20,
  },
  badgeTexto: { color: "#2d6a4f", fontSize: 12, fontWeight: "600" },
  // Línea gris delgada que separa secciones.
  linea: { height: 1, backgroundColor: "#ddd", marginVertical: 10 },
  // Estilos que usa el componente InfoFila (etiqueta a la izquierda, valor a la derecha).
  // justifyContent: "space-between" empuja un texto a cada extremo.
  fila: { flexDirection: "row", justifyContent: "space-between", paddingVertical: 6 },
  etiqueta: { fontSize: 13, color: "#666" },
  // flexShrink: 1 permite que el texto se parta en varias líneas si es muy largo.
  valor: { fontSize: 13, fontWeight: "600", color: "#333", flexShrink: 1, textAlign: "right" },
  // Formulario para agregar una licencia.
  tituloFormulario: { fontSize: 16, fontWeight: "bold", color: "#023e8a", marginBottom: 12 },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
    marginBottom: 10,
    fontSize: 14,
  },
  boton: {
    backgroundColor: "#0077b6",
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: "center",
  },
  botonDeshabilitado: { opacity: 0.6 },
  botonTexto: { color: "#fff", fontWeight: "600" },
  mensajeError: { color: "#c1121f", marginBottom: 10, textAlign: "center" },
  centrado: { alignItems: "center", paddingVertical: 30 },
  vacio: { textAlign: "center", color: "#666", marginBottom: 16 },
});

// Campos del formulario, en el orden en que se muestran.
const CAMPOS = [
  { clave: "nombre", placeholder: "Nombre completo" },
  { clave: "numeroLicencia", placeholder: "No. de Licencia" },
  { clave: "fechaNacimiento", placeholder: "Fecha de Nacimiento, dd/mm/aaaa" },
  { clave: "fechaVencimiento", placeholder: "Fecha de Vencimiento, dd/mm/aaaa" },
  { clave: "tipoLicencia", placeholder: "Tipo, por ejemplo Clase B" },
  { clave: "direccion", placeholder: "Dirección" },
  { clave: "foto", placeholder: "URL de la foto, opcional", opcional: true },
];

const FORMULARIO_VACIO = Object.fromEntries(CAMPOS.map((c) => [c.clave, ""]));

// ------------------------------------------------------------
// COMPONENTE EXTERNO: InfoFila
// Dibuja UNA fila con: etiqueta (el nombre del dato) ...... valor (el dato)
// Ejemplo: <InfoFila etiqueta="Tipo" valor="Clase B" />
// ------------------------------------------------------------
function InfoFila({ etiqueta, valor }) {
  return (
    <View style={styles.fila}>
      <Text style={styles.etiqueta}>{etiqueta}</Text>
      <Text style={styles.valor}>{valor}</Text>
    </View>
  );
}

// Una tarjeta con todos los datos de una licencia.
function TarjetaLicencia({ licencia }) {
  // El subtítulo es el lugar, la última parte de la dirección:
  // "Piña 124, Fondo de Bikini" -> "Fondo de Bikini"
  const lugar = licencia.direccion.split(",").pop().trim();

  return (
    <View style={styles.card}>
      <View style={styles.encabezado}>
        <Text style={styles.tituloEncabezado}>LICENCIA DE CONDUCIR</Text>
        <Text style={styles.subtituloEncabezado}>{lugar}</Text>
      </View>

      <View style={styles.filaPrincipal}>
        {licencia.foto ? (
          <Image source={{ uri: licencia.foto }} style={styles.foto} />
        ) : (
          <View style={[styles.foto, styles.fotoVacia]}>
            <Text style={styles.fotoInicial}>{licencia.nombre.charAt(0)}</Text>
          </View>
        )}

        <View style={styles.datosPrincipales}>
          <Text style={styles.nombre}>{licencia.nombre}</Text>
          <View style={styles.badge}>
            <Text style={styles.badgeTexto}>{licencia.estado}</Text>
          </View>
        </View>
      </View>

      <View style={styles.linea} />

      <InfoFila etiqueta="No. de Licencia" valor={licencia.numeroLicencia} />
      <InfoFila etiqueta="Fecha de Nacimiento" valor={licencia.fechaNacimiento} />
      <InfoFila etiqueta="Fecha de Vencimiento" valor={licencia.fechaVencimiento} />
      <InfoFila etiqueta="Tipo" valor={licencia.tipoLicencia} />
      <InfoFila etiqueta="Dirección" valor={licencia.direccion} />
    </View>
  );
}

// ------------------------------------------------------------
// COMPONENTE PRINCIPAL: LicenciaScreen
// ------------------------------------------------------------
export default function LicenciaScreen() {
  // Licencias que llegan de la API con GET /licencias.
  const [licencias, setLicencias] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);

  // Datos que se van escribiendo en el formulario.
  const [formulario, setFormulario] = useState(FORMULARIO_VACIO);
  const [guardando, setGuardando] = useState(false);
  const [mensajeForm, setMensajeForm] = useState(null);

  const cargar = useCallback(async () => {
    setCargando(true);
    try {
      setLicencias(await obtenerLicencias());
      setError(null);
    } catch (e) {
      setError(e.message);
    } finally {
      setCargando(false);
    }
  }, []);

  // Se ejecuta una vez al abrir la pantalla.
  useEffect(() => {
    cargar();
  }, [cargar]);

  const cambiarCampo = (clave, valor) =>
    setFormulario((actual) => ({ ...actual, [clave]: valor }));

  // Envía la licencia nueva con POST /licencias.
  const guardar = async () => {
    const faltantes = CAMPOS.filter((c) => !c.opcional && !formulario[c.clave].trim());
    if (faltantes.length > 0) {
      setMensajeForm("Completa todos los campos obligatorios.");
      return;
    }

    setGuardando(true);
    setMensajeForm(null);
    try {
      const datos = Object.fromEntries(
        Object.entries(formulario).map(([clave, valor]) => [clave, valor.trim()])
      );
      const nueva = await crearLicencia(datos);
      setLicencias((actuales) => [...actuales, nueva]);
      setFormulario(FORMULARIO_VACIO);
    } catch (e) {
      setMensajeForm(e.message);
    } finally {
      setGuardando(false);
    }
  };

  return (
    <ScrollView style={styles.pantalla} contentContainerStyle={styles.contenedor}>
      {cargando ? (
        <View style={styles.centrado}>
          <ActivityIndicator size="large" color="#0077b6" />
        </View>
      ) : error ? (
        <View style={styles.centrado}>
          <Text style={styles.mensajeError}>{error}</Text>
          <Pressable style={[styles.boton, { paddingHorizontal: 20 }]} onPress={cargar}>
            <Text style={styles.botonTexto}>Reintentar</Text>
          </Pressable>
        </View>
      ) : licencias.length === 0 ? (
        <Text style={styles.vacio}>Todavía no hay licencias guardadas.</Text>
      ) : (
        licencias.map((licencia) => (
          <TarjetaLicencia key={licencia.id} licencia={licencia} />
        ))
      )}

      {/* Formulario para agregar una licencia nueva */}
      <View style={styles.card}>
        <Text style={styles.tituloFormulario}>Agregar licencia</Text>
        {CAMPOS.map((campo) => (
          <TextInput
            key={campo.clave}
            style={styles.input}
            placeholder={campo.placeholder}
            value={formulario[campo.clave]}
            onChangeText={(valor) => cambiarCampo(campo.clave, valor)}
            autoCapitalize={campo.clave === "foto" ? "none" : "sentences"}
          />
        ))}
        {!!mensajeForm && <Text style={styles.mensajeError}>{mensajeForm}</Text>}
        <Pressable
          style={[styles.boton, guardando && styles.botonDeshabilitado]}
          onPress={guardar}
          disabled={guardando}
        >
          <Text style={styles.botonTexto}>{guardando ? "Guardando..." : "Guardar licencia"}</Text>
        </Pressable>
      </View>
    </ScrollView>
  );
}
