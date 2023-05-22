import { StyleSheet, Text, View, TextInput, Button, FlatList, TouchableOpacity, Image, ScrollView } from 'react-native';
import React from 'react'
import { useEffect, useState } from 'react';

const Pokemon = () => {
  const [pokemons, setPokemons] = useState([])

const getPokemons = async () => {

    const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=30&offset=0')
    const listaPokemons = await response.json()
    const { results } = listaPokemons

    const newPokemons = results.map(async (pokemon) => {

      const response = await fetch(pokemon.url)
      const poke = await response.json()

      return {
        id: poke.id,
        name: poke.name,
        img: poke.sprites.other["official-artwork"].front_default
      }
    })
    setPokemons(await Promise.all(newPokemons))
    console.log(pokemons)
  }

  const renderValoresPOkemons = ({ item }) => (
    <View style={{flex:1, alignItems: 'center', margin: 12 }}>
      <Text style={{ fontSize: 20 }}>{`Pokemon n°${item.id}: ${item.name}`}</Text>
      <Image style={{width:'90%', height:300, resizeMode: 'contain'}} source={{uri:item.img}}/>
    </View>
  )


  return (
    <View style={styles.list}>
      <Button title='Mostrar pokemones' onPress={getPokemons} />
      <FlatList data={pokemons} numColumns={1} renderItem={renderValoresPOkemons} keyExtractor={(item) => item.id}
      />
    </View>
  )
}

export default Pokemon

const styles = StyleSheet.create({
    list:{
        // flex:2,
        width: '100%'
      },
    background:{

    }
})