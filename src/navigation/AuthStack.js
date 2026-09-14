import { createNativeStackNavigator } from '@react-navigation/native-stack';

import LoginScreen from '../screens/LoginScreen';
import CadastroScreen from '../screens/CadastroScreen';
import EsqueciSenhaScreen from '../screens/EsqueciSenhaScreen';

const Stack = createNativeStackNavigator();

export default function AuthStack() {
  return (
    <Stack.Navigator initialRouteName="Login">

      <Stack.Screen
        name="Login"
        component={LoginScreen}
        options={{
          title: 'Login',
        }}
      />

      <Stack.Screen
        name="Cadastro"
        component={CadastroScreen}
        options={{
          title: 'Criar conta',
        }}
      />

      <Stack.Screen
        name="EsqueciSenha"
        component={EsqueciSenhaScreen}
        options={{
          title: 'Recuperar senha',
        }}
      />

    </Stack.Navigator>
  );
}