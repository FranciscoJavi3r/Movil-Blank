// ------------------------------------------------------------
// PANTALLA DE INICIO
// Además de la barra de pestañas de abajo, tiene un botón
// para ir a cada pantalla.
// ------------------------------------------------------------
import { View, Text, Button, StyleSheet } from "react-native";

// React Navigation le pasa automáticamente la prop "navigation"
// a cada pantalla registrada en App.js. Con ella podemos cambiar de pantalla
// desde el código (hace lo mismo que tocar la pestaña).
export default function InicioScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Pantalla de Inicio</Text>

      {/* navigation.navigate("Nombre") abre la pantalla con ese nombre.
          El nombre debe ser igual al "name" usado en App.js */}
      <View style={styles.botonContenedor}>
        <Button
          title="Ir a Detalle"
          onPress={() => navigation.navigate("Detalle")}
        />
      </View>

      <View style={styles.botonContenedor}>
        <Button
          title="Ir a Formulario"
          onPress={() => navigation.navigate("Formulario")}
        />
      </View>

      <View style={styles.botonContenedor}>
        <Button
          title="Ir a Licencia"
          onPress={() => navigation.navigate("Licencia")}
        />
      </View>
    </View>
  );
}

// Estilos de la pantalla de inicio.
const styles = StyleSheet.create({
  // Contenedor principal: ocupa toda la pantalla (flex: 1)
  // y centra su contenido vertical y horizontalmente.
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#e7dccb",
  },
  titulo: {
    fontSize: 24,
    margin: 20,
    color: "#8f7763",
  },
  // Pequeño margen para que los botones no queden pegados.
  botonContenedor: {
    margin: 5,
  },
});
