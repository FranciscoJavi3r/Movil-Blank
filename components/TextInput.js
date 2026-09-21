import { StyleSheet, Text, View, TextInput } from 'react-native'
import React, { useState } from 'react'

export default function Input() {
  const [texto, setTexto] = useState('')

    return (
    <View>
      <Text>Text Input: {texto}</Text>
        <TextInput
          placeholder="Escribe algo..."
          value={texto}
          onChangeText={setTexto}
          style={styles.input}
        />

    </View>
  )
}

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