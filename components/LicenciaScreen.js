// ------------------------------------------------------------
// PANTALLA DE LICENCIA DE CONDUCIR
// Muestra los datos de una licencia dentro de una "tarjeta" (card).
// ------------------------------------------------------------

// useState es un "hook" de React que nos permite guardar datos
// que pueden cambiar mientras la app está abierta (el "estado").
import { useState } from "react";

// Componentes básicos de React Native que vamos a usar:
// - View: una caja/contenedor (como un <div> en HTML).
// - Text: para mostrar texto.
// - Image: para mostrar imágenes.
// - ScrollView: un contenedor que permite deslizar (scroll) si el contenido no cabe.
// - StyleSheet: para crear los estilos (colores, tamaños, márgenes, etc.).
import { View, Text, Image, ScrollView, StyleSheet } from "react-native";

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
});

// ------------------------------------------------------------
// COMPONENTE EXTERNO: InfoFila
// Es un componente pequeño y reutilizable que dibuja UNA fila con:
//   etiqueta (el nombre del dato)  ......  valor (el dato)
// Recibe dos "props" (parámetros): etiqueta y valor.
// Ejemplo: <InfoFila etiqueta="Tipo" valor="Clase B" />
// Así evitamos repetir el mismo código para cada dato.
// ------------------------------------------------------------
function InfoFila({ etiqueta, valor }) {
  return (
    <View style={styles.fila}>
      <Text style={styles.etiqueta}>{etiqueta}</Text>
      <Text style={styles.valor}>{valor}</Text>
    </View>
  );
}

// ------------------------------------------------------------
// COMPONENTE PRINCIPAL: LicenciaScreen
// Es la pantalla completa que se registra en la navegación (App.js).
// ------------------------------------------------------------
export default function LicenciaScreen() {
  // Guardamos todos los datos de la licencia en un solo objeto.
  // - licencia: el valor actual de los datos (lo que leemos).
  // - setLicencia: la función para cambiarlos más adelante
  //   (por ejemplo, cuando los datos vengan de una API).
  const [licencia, setLicencia] = useState({
    nombre: "Bob Esponja Pantalones Cuadrados",
    numeroLicencia: "FQ-000112",
    fechaNacimiento: "14/07/1986",
    fechaVencimiento: "14/07/2030",
    tipoLicencia: "Clase B",
    direccion: "Piña 124, Fondo de Bikini",
    estado: "Activa",
    foto: "https://imgs.search.brave.com/GwEn5L1bm9LZw7pNui8MYFiRdCAnm_1nFxhYTgIY324/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly9tLm1l/ZGlhLWFtYXpvbi5j/b20vaW1hZ2VzL00v/TVY1Qk1qSXpOekEw/WVRndE16ZGtPQzAw/T1RVM0xUaGhZVGN0/WW1RM1ltWXlNR1V5/T0RNNFhrRXlYa0Zx/Y0dkZVFYVnlOelUx/TnpFM05UZ0AuanBn", // luego será la foto real de la API
  });

  return (
    // ScrollView: si la pantalla es pequeña, el usuario puede deslizar.
    // "style" es para el ScrollView en sí y "contentContainerStyle" para su contenido.
    <ScrollView style={styles.pantalla} contentContainerStyle={styles.contenedor}>
      {/* Tarjeta blanca que contiene toda la licencia */}
      <View style={styles.card}>
        {/* Encabezado con los títulos de la licencia */}
        <View style={styles.encabezado}>
          <Text style={styles.tituloEncabezado}>LICENCIA DE CONDUCIR</Text>
          <Text style={styles.subtituloEncabezado}>Fondo de Bikini</Text>
        </View>

        {/* Fila principal: foto a la izquierda, nombre y estado a la derecha */}
        <View style={styles.filaPrincipal}>
          {/* Para imágenes de internet se usa source={{ uri: "url" }} */}
          <Image source={{ uri: licencia.foto }} style={styles.foto} />

          <View style={styles.datosPrincipales}>
            {/* Las llaves { } permiten poner código JavaScript dentro del JSX,
                aquí leemos el nombre guardado en el estado */}
            <Text style={styles.nombre}>{licencia.nombre}</Text>

            {/* Badge con el estado de la licencia (ej. "Activa") */}
            <View style={styles.badge}>
              <Text style={styles.badgeTexto}>{licencia.estado}</Text>
            </View>
          </View>
        </View>

        {/* Línea separadora */}
        <View style={styles.linea} />

        {/* Usamos el componente InfoFila una vez por cada dato.
            A cada uno le mandamos su etiqueta (texto fijo) y
            su valor (el dato que sacamos del estado "licencia"). */}
        <InfoFila etiqueta="No. de Licencia" valor={licencia.numeroLicencia} />
        <InfoFila etiqueta="Fecha de Nacimiento" valor={licencia.fechaNacimiento} />
        <InfoFila etiqueta="Fecha de Vencimiento" valor={licencia.fechaVencimiento} />
        <InfoFila etiqueta="Tipo" valor={licencia.tipoLicencia} />
        <InfoFila etiqueta="Dirección" valor={licencia.direccion} />
      </View>
    </ScrollView>
  );
}
