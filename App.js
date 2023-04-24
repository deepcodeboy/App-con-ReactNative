import { useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput, Button, FlatList, TouchableOpacity } from 'react-native';

export default function App() {
  const [tarea, setTarea] = useState('');
  const [tareaLista, setTareaLista] = useState([]);

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

  return (
    <View style={styles.container}>
      <View>
        <TextInput style={styles.input} onChangeText={text => setTarea(text)} value={tarea} placeholder="Agregar tarea" />
        <Button title="Agregar" onPress={agregarTareaALista} color="red" />
      </View>
      <FlatList data={tareaLista} renderItem={renderLista} keyExtractor={item => item.id} />
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
