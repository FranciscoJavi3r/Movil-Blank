// ------------------------------------------------------------
// PANTALLA DE FORMULARIO
// Muestra una tarjeta de perfil (imagen, nombre) y un pequeño
// formulario con campos para correo y teléfono.
// ------------------------------------------------------------
import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
// Componentes de React Native. TextInput es una caja donde el usuario puede escribir.
import { Alert, Button, Image, StyleSheet, ScrollView, Text, TextInput, View } from 'react-native';
// import Lista from './components/Lista';
// import Input from './components/TextInput';

export default function Formulario() {

  // Código de práctica anterior (comentado, no se ejecuta):
  // const [counter, setCounter] = useState(0)
  // const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

  return (
    // Versión anterior de la pantalla (comentada, no se ejecuta):
    // <View style={styles.container}>
    //   <Text>Open up App.js to start working on your app!</Text>
    //   <Text>Alguna Palabra</Text>
    //   <Button title='Alerta' onPress={() => alert('Mensaje de alerta')}/>
    //   <Button title='Contador +' onPress={() => setCounter(counter + 1)}/>
    //   <Text style={{marginTop: 10}}>Contador: {counter}</Text>
    //   <Lista list={numbers} />
    //   <Input />
    //   <StatusBar style="auto" />
    // </View>

    // ScrollView permite deslizar si el contenido no cabe en la pantalla.
    <ScrollView contentContainerStyle={styles.container}>
      {/* Tarjeta con la información del perfil */}
      <View style={styles.viewcontainer}>
        {/* Imagen tomada de internet mediante su URL (uri) */}
        <Image source={{ uri: 'https://imgs.search.brave.com/u3xR4hmQcCoGJc8QusAin9CTtNnki6qZ65HRWaK5a9o/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly93YWxs/cGFwZXJzLmNvbS9p/bWFnZXMvaGQvbGlu/ay1oZC13YWxscGFw/ZXItbWg2MnZzMzE5/dndoa3NqNS5qcGc'}} style={{ width:100, height: 100 }} />
        {/* Se pueden combinar estilos con un arreglo: [estiloBase, { estiloExtra }] */}
        <Text style={[styles.texto1, { paddingTop: 30 }]}>Francico Javier Hermosillo Aguila</Text>
        <Text style={styles.texto1}>Jugador del Cruz Azul</Text>

        {/* Sección del formulario */}
        <View style={styles.viewcontainer2}>
          <Text style={styles.texto2}>Correo</Text>
          {/* placeholder: texto gris de ayuda que se ve cuando el campo está vacío */}
          <TextInput style={styles.entradaTexto} placeholder="Ingresa tu correo" placeholderTextColor="rgba(0, 0, 0, 0.5)"/>
          <Text style={styles.texto2}>Telefono</Text>
          <TextInput style={styles.entradaTexto} placeholder="Ej. 449-2032-10" placeholderTextColor="rgba(0, 0, 0, 0.5)"/>
          {/* Por ahora el botón no hace nada: onPress es una función vacía */}
          <Button title="Guardar" onPress={() => {}}/>
        </View>

      </View>
    </ScrollView>
  );
}

// Estilos de la pantalla del formulario.
const styles = StyleSheet.create({
  // Contenido del ScrollView: centrado y con fondo beige.
  container: {
    flex: 1,
    backgroundColor: '#e7dccb',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 12,
  },
  // Tarjeta principal del perfil.
  viewcontainer: {
    justifyContent: 'center',
    backgroundColor: '#d3c2ad',
    alignItems: 'center',
    padding: 30,
    width: 450,
    borderWidth: 2,
    borderRadius: 20,
  },
  // Caja interna donde van los campos del formulario.
  viewcontainer2: {
    backgroundColor: '#8f7763',
    padding: 20,
    margin: 20,
    borderWidth: 2,
    borderRadius: 20,
  },
  // Texto centrado (nombre y descripción).
  texto1: {
    textAlign: 'center'
  },
  // Texto de las etiquetas del formulario, en negritas.
  texto2: {
    textAlign: 'left',
    fontWeight: 'bold'
  },
  // Estilo de las cajas de texto donde escribe el usuario.
  entradaTexto: {
    backgroundColor: "#e7dccb",
    borderWidth: 2,
    margin: 5,
    paddingTop: 5,
    paddingEnd: 5,
  }
});
