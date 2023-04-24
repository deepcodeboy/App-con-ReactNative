import React, { useState } from 'react';
import { View, TextInput, Button, FlatList, StyleSheet, Text } from 'react-native';

const App = () => {
  const [task, setTask] = useState(''); // Estado para almacenar la tarea
  const [tasksList, setTasksList] = useState([]); // Estado para almacenar la lista de tareas

  const handleAddTask = () => {
    if (task !== '') {
      // Agregar la tarea a la lista de tareas
      setTasksList(prevTasks => [...prevTasks, { id: Date.now().toString(), text: task }]);
      setTask(''); // Limpiar el TextInput
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          onChangeText={text => setTask(text)}
          value={task}
          placeholder="Agregar tarea"
        />
        <Button title="Agregar" onPress={handleAddTask} />
      </View>
      <FlatList
        data={tasksList}
        renderItem={({ item }) => <Text style={styles.task}>{item.text}</Text>}
        keyExtractor={item => item.id}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#F8F8F8',
  },
  inputContainer: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  input: {
    flex: 1,
    marginRight: 8,
    paddingVertical: 8,
    paddingHorizontal: 16,
    backgroundColor: '#FFF',
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 4,
  },
  task: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    backgroundColor: '#FFF',
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 4,
    marginBottom: 8,
  },
});

export default App;
