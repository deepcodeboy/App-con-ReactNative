import React from 'react'
import { useState } from 'react';
import Constants from 'expo-constants'
import { scale } from 'react-native-size-matters'
import { StyleSheet, Text, View, TextInput, Button, FlatList, TouchableOpacity, Image, ImageBackground } from 'react-native';

const Pokemon = ({navigation}) => {
    const [pokemons, setPokemons] = useState([])
    const [searchText, setSearchText] = useState('');

    const getPokemons = async () => {

        const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=50&offset=0')
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
        <View style={styles.card}>
            <Text style={styles.title}>{`Pokemon n°${item.id}: ${item.name}`}</Text>
            <Image style={styles.image} source={{ uri: item.img }} />
            <Button style={{backgroundColor:"red"}} title="Borrar Pokemon" onPress={() => deletePokemon(item.id)} />
        </View>
    )

    const deletePokemon = (id) => {
        const updatedPokemons = pokemons.filter((pokemon) => pokemon.id !== id);
        setPokemons(updatedPokemons);
    };

    const buscarPokemons = pokemons.filter((pokemon) =>
        pokemon.name.toLowerCase().includes(searchText.toLowerCase())
    );


    return (
        <ImageBackground source={require('../images/pokemon_wallpaper.jpg')} style={styles.backgroundImage}>

            <View style={styles.divInput}>
                {pokemons.length > 0 && (<TextInput style={styles.searchInput} placeholder="Buscar Pokémon" value={searchText} onChangeText={(text) => setSearchText(text)}
                />)}
            </View>

            <View style={styles.container}>
                <FlatList data={buscarPokemons} numColumns={2} renderItem={renderValoresPOkemons} keyExtractor={(item) => item.id}
                />
            </View>

            <View style={styles.bajarBoton}>
                {pokemons.length == 0 && (<TouchableOpacity style={styles.button} title='Mostrar pokemones' onPress={getPokemons}>
                    <Text style={styles.buttonText}>Mostrar Pokemons</Text>
                </TouchableOpacity>)}
            </View>

        </ImageBackground>
    )
}

export default Pokemon

const styles = StyleSheet.create({
    bajarBoton: {
        width: '80%',
        marginTop: 630,
        textAlign: 'center',
        marginLeft: '10%'

    },
    container: {
        width: "100%",
        paddingBottom:100

    },
    divInput: {
        alignItems: 'center'

    },
    searchInput: {
        width: '95%',
        textAlign: 'center',
        height: 40,
        color: "#000",
        marginBottom: 16,
        paddingHorizontal: 15,
        borderRadius: 8,
        borderColor: 'gray',
        borderWidth: 1,
        backgroundColor: "#f0f0f0",
        marginTop: scale(Constants.statusBarHeight)

    },
    card: {
        flex: 1,
        alignItems: 'center',
        margin: 12,
        padding: 12,
        borderRadius: 8,
        backgroundColor: '#f0f0f099',

    },
    title: {
        fontSize: 20,
        marginBottom: 8,

    },
    image: {
        width: '100%',
        height: 150,
        resizeMode: 'contain'

    },
    backgroundImage: {
        flex: 1,
        width: "100%",
        resizeMode: 'contain',
        textAlign: 'center'

    },
    button: {
        backgroundColor: '#f0f0f090',
        borderRadius: 50,
        borderColor: "",
        borderWidth: 0.2,
        paddingVertical: 12,

    },
    buttonText: {
        color: '#000',
        fontSize: 25,
        textAlign: 'center'

    }
})