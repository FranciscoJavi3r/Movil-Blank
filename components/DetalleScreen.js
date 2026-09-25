// ------------------------------------------------------------
// PANTALLA DE DETALLE
// Pantalla sencilla con un botón para regresar a la anterior.
// ------------------------------------------------------------
import { View, Text, Button, StyleSheet } from "react-native";

export default function DetalleScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Pantalla de Detalle</Text>
      <View style={styles.botonContenedor}>
        {/* navigation.goBack() regresa a la pestaña visitada antes
            (así lo configuramos con backBehavior="history" en App.js) */}
        <Button
          title="Regresar"
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
