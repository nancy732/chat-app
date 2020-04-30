import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import RootNavigator from './navigators/RootNavigator';
// import { db } from './Config/Config'

const App = () => {
  const Stack = createStackNavigator();
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="RootNavigator" headerMode="none">
        <Stack.Screen name="RootNavigator" component={RootNavigator} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
