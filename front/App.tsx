import 'react-native-gesture-handler';
import { createStackNavigator } from '@react-navigation/stack';
import Home from './screens/Home';
import { NavigationContainer } from '@react-navigation/native';
import UpdateExpense from 'screens/updateExpense';
import CreateExpense from 'screens/CreateExpense';
import { RootStackParamList } from 'interfaces';


export default function App() {
  

  const Stack = createStackNavigator<RootStackParamList>();

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={Home} options={{ headerShown: false }} />
        <Stack.Screen
          name="Update-Expense"
          component={UpdateExpense}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Create-Expense"
          component={CreateExpense}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
