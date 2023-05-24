import React from 'react'
import { useState, useEffect } from 'react';
import Constants from 'expo-constants'
import { scale } from 'react-native-size-matters'
import 'react-native-vector-icons'; // Agrega esta línea
import { set } from 'react-native-vector-icons'; // Agrega esta línea
import { StyleSheet, Text, View, TextInput, Button, FlatList, TouchableOpacity, Image, ImageBackground } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

const Pokemon = ({ navigation }) => {
    const [pokemons, setPokemons] = useState([])
    const [searchText, setSearchText] = useState('');

    useEffect(() => { console.log(pokemons) }, [pokemons]);


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
                img: poke.sprites.other["official-artwork"].front_default,
                imgShiny: poke.sprites.other["official-artwork"].front_shiny,
                showShiny: false
            }
        })
        setPokemons(await Promise.all(newPokemons))
        console.log(pokemons)
    }

    const renderValoresPokemons = ({ item }) => (
        <View style={styles.card}>
            <Text style={styles.title}>{`Pokemon n°${item.id}: ${mayusLetra(item.name)}`}</Text>
            <Image style={styles.image} source={{ uri: item.showShiny ? item.imgShiny : item.img }} />

            <View style={styles.divButtonsInCard}>
                <TouchableOpacity style={styles.buttonCard} onPress={() => toShiny(item.id)}>
                    <Text style={styles.buttonTextCard}>{item.showShiny ? "Normal" : "Shiny"}</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.buttonCard} onPress={() => deletePokemon(item.id)}>
                    {/* <Text style={styles.buttonTextCard}>Eliminar</Text> */}
                    <FontAwesome style={{paddingTop:3.5,}} name="trash" size={20} color="white" />
                </TouchableOpacity>
            </View>
        </View>
    );

    const mayusLetra = (text) => {
        return text.charAt(0).toUpperCase() + text.slice(1);
    };

    const deletePokemon = (id) => {
        const updatedPokemons = pokemons.filter((pokemon) => pokemon.id !== id);
        setPokemons(updatedPokemons);
    };

    const toShiny = (id) => {
        setPokemons((prevPokemons) => prevPokemons.map((pokemon) => {
            if (pokemon.id === id) {
                return {
                    ...pokemon,
                    showShiny: !pokemon.showShiny
                };
            }
            return pokemon;
        })
        );
    };

    const buscarPokemons = pokemons.filter((pokemon) =>
        pokemon.name.toLowerCase().includes(searchText.toLowerCase())
    );

    return (
        <ImageBackground source={require('../images/pokemon_wallpaper.jpg')} style={styles.backgroundImage}>

            {pokemons.length == 0 && (<View style={styles.divDexterText}>
                <Text style={styles.textDexter}>Bienvenido a la Pokedex</Text>

            </View>)}

            <View style={styles.divInput}>
                {pokemons.length > 0 && (<TextInput style={styles.searchInput} placeholder="Buscar Pokémon" value={searchText} onChangeText={(text) => setSearchText(text)}
                />)}
            </View>

            <View style={styles.container}>
                <FlatList data={buscarPokemons} numColumns={2} renderItem={renderValoresPokemons} keyExtractor={(item) => item.id}
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
        marginTop: 505,
        textAlign: 'center',
        marginLeft: '10%'

    },
    container: {
        width: "100%",
        paddingBottom: 100

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
        fontSize: 21,
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
        fontSize: 27,
        textAlign: 'center',

    },
    buttonCard: {
        backgroundColor: '#00000060',
        borderRadius: 18,
        borderWidth: 0.1,
        paddingVertical: 8,
        padding:15,
        margin:4,
        flexDirection:'row',
        //paddingHorizontal: 12,
        // padding: 10,
        // marginTop: 10,
        // marginLeft:2,
        // marginRight:2,
        // marginBottom: 3,

    },
    buttonTextCard: {
        color: '#fff',
        fontSize: 20,
        textAlign: 'center',
    },
    divButtonsInCard: {
        flexDirection: 'row',
        marginTop: 8,
    },
    textDexter: {
        fontSize: 27,
        marginTop: 20,
        textAlign: 'center',
        color: '#f1f1f1',
    },
    divDexterText: {
        marginTop: scale(Constants.statusBarHeight)

    }
})