import { useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput, Button, FlatList, TouchableOpacity } from 'react-native';

export default function App() {
  const [tarea, setTarea] = useState('');
  const [tareaLista, setTareaLista] = useState([]);
  const [jugadorLista, setJugadorLista] = useState([])
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
    }

    const renderValoresPOkemons = ({ item }) => (
      <View style={{ flexDirection: 'col', alignItems: 'center', margin: 12 }}>
        <Text style={{ fontSize: 20 }}>{`Pokemon: ${item.name}`}</Text>
      </View>
    )

  const agregarTareaALista = () => {
    if (tarea !== '') {
      // Agregar la tarea a la lista de tareas
      setTareaLista(listas => [...listas, { id: Date.now().toString(), text: tarea }]);
      setTarea(''); // Limpiar el TextInput
    }
  };

  const renderLista = ({ item }) => (
    <View style={{ flexDirection: 'col', alignItems: 'center', margin: 12 }}>
      <Text style={{ fontSize: 20 }}>{item.text}</Text>
      <TouchableOpacity onPress={() => quitarElementoLista(item.id)} style={styles.input}>
        <Text >borrar</Text>
      </TouchableOpacity>
    </View>
  )

  const quitarElementoLista = (idElemento) => {
    setTareaLista(listas => listas.filter(e => e.id != idElemento))
  }


  const listaJugadores = [
    { id: 1, nombre: "Messi", deporte: "Futbol" },
    { id: 2, nombre: "Federer", deporte: "Tenis" },
    { id: 3, nombre: "Pachiao", deporte: "Boxeo" }
  ]

  const renderJugadores = () => {
    setJugadorLista(listaJugadores)
  }

  const renderValoresJugadores = ({ item }) => (
    <View style={{ flexDirection: 'col', alignItems: 'center', margin: 12 }}>
      <Text style={{ fontSize: 20 }}>{`Nombre:${item.nombre}, Deporte: ${item.deporte}`}</Text>
    </View>
  )


  return (
    <View style={styles.container}>
      <View>
        <TextInput style={styles.input} onChangeText={text => setTarea(text)} value={tarea} placeholder="Agregar tarea" />
        <Button title="Agregar" onPress={agregarTareaALista} color="red" />
      </View>
      <FlatList data={tareaLista} renderItem={renderLista} keyExtractor={item => item.id} />

      <View >
        <Button title='Mostrar jugadores' onPress={renderJugadores} />
        <FlatList data={jugadorLista} renderItem={renderValoresJugadores} keyExtractor={(item) => item.id}
        />
      </View>

      <View >
        <Button title='Mostrar pokemones' onPress={getPokemons} />
        <FlatList data={pokemons} renderItem={renderValoresPOkemons} keyExtractor={(item) => item.id}
        />
      </View>



    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    borderColor: 'black',
    padding: 10
  }
});

/*buscar una api o crear una lista nosotros mismos y que se muestre cuando se presione un boton*/
