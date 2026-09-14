import { NavigationContainer } from '@react-navigation/native';
import StackRoutes from './src/routes/stack.routes';
import './src/config/firebase';

export default function App() {
  return (
    <NavigationContainer>
      <StackRoutes />
    </NavigationContainer>
  );
}