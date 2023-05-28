import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const listaJugadores = [
    { id: 1, nombre: "Messi", deporte: "Futbol" },
    { id: 2, nombre: "Federer", deporte: "Tenis" },
    { id: 3, nombre: "Pachiao", deporte: "Boxeo" }
  ]

  const renderJugadores = () => {
    setJugadorLista(listaJugadores)
  }

  const renderValoresJugadores = ({ item }) => (
    <View style={{alignItems: 'center', margin: 12 }}>
      <Text style={{ fontSize: 20 }}>{`Nombre:${item.nombre}, Deporte: ${item.deporte}`}</Text>
      
    </View>
  )


const Jugadores = () => {
  return (
    <View >
        <Button title='Mostrar jugadores' onPress={renderJugadores} />
        <FlatList data={jugadorLista} renderItem={renderValoresJugadores} keyExtractor={(item) => item.id}
        />
    </View>
  )
}

export default Jugadores

const styles = StyleSheet.create({})