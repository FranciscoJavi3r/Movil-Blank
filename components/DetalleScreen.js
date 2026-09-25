// ------------------------------------------------------------
// PANTALLA DE DETALLE
// Pantalla sencilla con un botón para regresar a la anterior.
// ------------------------------------------------------------
import { View, Text, Button, StyleSheet } from "react-native";

// Nota: la función se llama InicioScreen, pero como se exporta con
// "export default", en App.js se importa con el nombre DetalleScreen.
export default function InicioScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Pantalla de Inicio</Text>
      <View style={styles.botonContenedor}>
        {/* navigation.goBack() regresa a la pestaña visitada antes
            (así lo configuramos con backBehavior="history" en App.js) */}
        <Button
          title="Ir a Inicio"
          onPress={() => navigation.goBack()}
        />
      </View>

    </View>
  );
}

// Estilos de la pantalla.
const styles = StyleSheet.create({
  // Ocupa toda la pantalla y centra el contenido.
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#e7dccb",
  },
  titulo: {
    fontSize: 24,
    marginTop: 20,
  },
  botonContenedor: {
    margin: 5,
  },
});
