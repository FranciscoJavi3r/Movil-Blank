import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

export default function ListView({ list }) {
  return (
    <View style={styles.container}>
        <Text>Lista de elementos:</Text>
        {list.map((item, index) => (
          <Text key={index}> {item}</Text>
        ))}
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center',
    },
})