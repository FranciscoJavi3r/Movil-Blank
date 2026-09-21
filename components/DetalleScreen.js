import { View, Text, Button, StyleSheet } from "react-native";

export default function InicioScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Pantalla de Inicio</Text>
      <View style={styles.botonContenedor}>
        <Button
          title="Ir a Inicio"
          onPress={() => navigation.goBack()}
        />
      </View>

    </View>
  );
}

const styles = StyleSheet.create({
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