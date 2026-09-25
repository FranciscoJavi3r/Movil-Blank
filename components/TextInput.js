// ------------------------------------------------------------
// COMPONENTE Input
// Una caja de texto que muestra arriba lo que el usuario va escribiendo.
// ------------------------------------------------------------
import { StyleSheet, Text, View, TextInput } from 'react-native'
import React, { useState } from 'react'

export default function Input() {
  // "texto" guarda lo que el usuario escribe; empieza vacío ('').
  // "setTexto" es la función que actualiza ese valor.
  const [texto, setTexto] = useState('')

    return (
    <View>
      {/* Muestra en tiempo real el valor guardado en "texto" */}
      <Text>Text Input: {texto}</Text>
        {/* value: lo que se ve dentro de la caja.
            onChangeText: se ejecuta cada vez que el usuario escribe
            y guarda el nuevo texto con setTexto. */}
        <TextInput
          placeholder="Escribe algo..."
          value={texto}
          onChangeText={setTexto}
          style={styles.input}
        />

    </View>
  )
}

// Estilo de la caja de texto: alto, borde gris y esquinas redondeadas.
const styles = StyleSheet.create({
    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginTop: 10,
        paddingHorizontal: 10,
        borderRadius: 5,
    },
})
