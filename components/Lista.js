// ------------------------------------------------------------
// COMPONENTE Lista
// Recibe un arreglo (list) y muestra cada elemento como un texto.
// Ejemplo de uso: <Lista list={[1, 2, 3]} />
// ------------------------------------------------------------
import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

export default function ListView({ list }) {
  return (
    <View style={styles.container}>
        <Text>Lista de elementos:</Text>
        {/* .map() recorre el arreglo y crea un <Text> por cada elemento.
            React necesita una "key" única en cada elemento de una lista
            para saber cuál es cuál; aquí usamos la posición (index). */}
        {list.map((item, index) => (
          <Text key={index}> {item}</Text>
        ))}
    </View>
  )
}

// Estilos: centra el contenido.
const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center',
    },
})
