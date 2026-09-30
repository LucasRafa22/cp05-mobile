import { createNativeStackNavigator } from '@react-navigation/native-stack';

import HomeScreen from '../screens/HomeScreen';
import PerfilScreen from '../screens/PerfilScreen';
import CadastroPetScreen from '../screens/CadastroPetScreen';

const Stack = createNativeStackNavigator();

export default function UserStack() {
  return (
    <Stack.Navigator initialRouteName="Home">

      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{
          title: 'Home',
        }}
      />

      <Stack.Screen
        name="Perfil"
        component={PerfilScreen}
        options={{
          title: 'Meu Perfil',
        }}
      />

      <Stack.Screen
        name="CadastroPet"
        component={CadastroPetScreen}
        options={{
          title: 'Cadastrar Pet',
        }}
      />

    </Stack.Navigator>
  );
}