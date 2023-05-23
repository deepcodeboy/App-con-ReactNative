import { StyleSheet, Text, View, Button, Image, ImageBackground, TouchableOpacity } from 'react-native'
import React from 'react'
import Constants from 'expo-constants'

import { scale } from 'react-native-size-matters'


const Home = ({ navigation }) => {
  return (
    <ImageBackground source={require('../images/cyndaquil.jpg')} style={styles.backgroundImage}>
      <View style={styles.container}>
        <Text style={styles.title}>Bienvenido/a, joven Promesa</Text>

      </View>
      <View style={styles.bajarBoton}>
        <TouchableOpacity style={styles.button} title='Pokedex' onPress={() => navigation.navigate('Pokemons')}>
          <Text style={styles.buttonText}>Acceder a la Pokedex</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  )
}

export default Home

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    width: "100%",
    resizeMode: 'contain',
    textAlign: 'center'

  },
  bajarBoton: {
    width: '80%',
    marginTop: 600,
    textAlign: 'center',
    marginLeft: '10%'

  },
  buttonText: {
    color: '#f1f1f1',
    fontSize: 28,
    textAlign: 'center',

  },
  title: {
    fontSize: 27,
    marginTop:20,
    textAlign: 'center',
    color: '#f1f1f1',

  },
  container: {
    marginTop: scale(Constants.statusBarHeight)
  },
  button: {
    //backgroundColor: '#77999995',
    backgroundColor: '#00000095',
    borderRadius: 50,
    borderColor: "",
    borderWidth: 0.2,
    paddingVertical: 12,

  },
})