import { StyleSheet, View} from 'react-native';
import Pokemon from './components/Pokemones';
import Home from './components/Home';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="HomeScreen" component={Home} options={{headerShown:false}}/>
        <Stack.Screen name="Pokemons" component={Pokemon} options={{headerShown:false}} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

});

/*buscar una api o crear una lista nosotros mismos y que se muestre cuando se presione un boton*/
