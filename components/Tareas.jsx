import { StyleSheet, Text, View, TextInput, Button, FlatList, TouchableOpacity, Image, ScrollView } from 'react-native';
import React from 'react'
import { useEffect, useState } from 'react';

const agregarTareaALista = () => {
    const [tarea, setTarea] = useState('');
    const [tareaLista, setTareaLista] = useState([]);
    const [jugadorLista, setJugadorLista] = useState([])


    if (tarea !== '') {
      // Agregar la tarea a la lista de tareas
      setTareaLista(listas => [...listas, { id: Date.now().toString(), text: tarea }]);
      setTarea(''); // Limpiar el TextInput
    }
  };

  const renderLista = ({ item }) => (
    <View style={{alignItems: 'center', margin: 12 }}>
      <Text style={{ fontSize: 20 }}>{item.text}</Text>
      <TouchableOpacity onPress={() => quitarElementoLista(item.id)} style={styles.input}>
        <Text >borrar</Text>
      </TouchableOpacity>
    </View>
    
  )
  
  const quitarElementoLista = (idElemento) => {
    setTareaLista(listas => listas.filter(e => e.id != idElemento))
  }

const Tareas = () => {
  return (
    <View style={styles.divs}>
        <TextInput style={styles.input} onChangeText={text => setTarea(text)} value={tarea} placeholder="Agregar tarea" />
        <Button title="Agregar" onPress={agregarTareaALista} color="red" />
      <FlatList data={tareaLista} renderItem={renderLista} keyExtractor={item => item.id} />

      </View>
  )
}

export default Tareas

const styles = StyleSheet.create({})