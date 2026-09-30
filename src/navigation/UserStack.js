import { createNativeStackNavigator } from '@react-navigation/native-stack';

import HomeScreen from '../screens/HomeScreen';
import PerfilScreen from '../screens/PerfilScreen';
import CadastroPetScreen from '../screens/CadastroPetScreen';
import PetsScreen from '../screens/PetsScreen';
import EditarPetScreen from '../screens/EditarPetScreen';

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

      <Stack.Screen
        name="Pets"
        component={PetsScreen}
        options={{
          title: 'Meus Pets',
        }}
      />

      <Stack.Screen
        name="EditarPet"
        component={EditarPetScreen}
        options={{
          title: 'Editar Pet',
        }}
      />

    </Stack.Navigator>
  );
}