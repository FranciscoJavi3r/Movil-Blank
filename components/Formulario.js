import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { Alert, Button, Image, StyleSheet, ScrollView, Text, TextInput, View } from 'react-native';
// import Lista from './components/Lista';
// import Input from './components/TextInput';

export default function Formulario() {

  // const [counter, setCounter] = useState(0)
  // const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

  return (
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

    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.viewcontainer}>
        <Image source={{ uri: 'https://imgs.search.brave.com/u3xR4hmQcCoGJc8QusAin9CTtNnki6qZ65HRWaK5a9o/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly93YWxs/cGFwZXJzLmNvbS9p/bWFnZXMvaGQvbGlu/ay1oZC13YWxscGFw/ZXItbWg2MnZzMzE5/dndoa3NqNS5qcGc'}} style={{ width:100, height: 100 }} />
        <Text style={[styles.texto1, { paddingTop: 30 }]}>Francico Javier Hermosillo Aguila</Text>
        <Text style={styles.texto1}>Jugador del Cruz Azul</Text>

        <View style={styles.viewcontainer2}>
          <Text style={styles.texto2}>Correo</Text>
          <TextInput style={styles.entradaTexto} placeholder="Ingresa tu correo" placeholderTextColor="rgba(0, 0, 0, 0.5)"/>
          <Text style={styles.texto2}>Telefono</Text>
          <TextInput style={styles.entradaTexto} placeholder="Ej. 449-2032-10" placeholderTextColor="rgba(0, 0, 0, 0.5)"/>
          <Button title="Guardar" onPress={() => {}}/>
        </View>

      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e7dccb',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 12,
  },
  viewcontainer: {
    justifyContent: 'center',
    backgroundColor: '#d3c2ad',
    alignItems: 'center',
    padding: 30,
    width: 450,
    borderWidth: 2,
    borderRadius: 20,
  },
  viewcontainer2: {
    backgroundColor: '#8f7763',
    padding: 20,
    margin: 20,
    borderWidth: 2,
    borderRadius: 20,
  },
  texto1: {
    textAlign: 'center'
  },
  texto2: {
    textAlign: 'left',
    fontWeight: 'bold'
  },
  entradaTexto: {
    backgroundColor: "#e7dccb",
    borderWidth: 2,
    margin: 5,
    paddingTop: 5,
    paddingEnd: 5,
  }
});