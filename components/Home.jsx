import { StyleSheet, Text, View,Button } from 'react-native'
import React from 'react'

const Home = ({navigation}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Bienvenido a la página de inicio</Text>
      <Button
        title="Pokedex"
        onPress={() => navigation.navigate('Pokemons')}
      />
    </View>
  )
}

export default Home

const styles = StyleSheet.create({})