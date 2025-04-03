import React, { useEffect } from 'react';
import { Provider } from 'react-redux';
import { store } from './src/redux/store';

import { NavigationContainer } from '@react-navigation/native';

import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ListScreen from './src/screens/ListScreen';

import { setupDatabase } from './src/database/database';
import AddItemScreen from './src/screens/AddItemScreen';
import EditItemScreen from './src/screens/EditItemScreen';


const Stack = createNativeStackNavigator();

const App = () => {
  useEffect(() => {
    setupDatabase();
  }, []);

  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Item Lists" component={ListScreen} />
          <Stack.Screen name="Add New Item" component={AddItemScreen} />
          <Stack.Screen name="Edit Item" component={EditItemScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
};

export default App;
