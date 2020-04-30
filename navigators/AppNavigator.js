import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import Contacts from '../screens/Contacts'
import Chat from '../screens/Chat'
import Login from '../screens/Login'
import Signup from '../screens/Signup';
const AppNavigator = () => {
    const Stack = createStackNavigator();

    return (
        <Stack.Navigator initialRouteNmae="Login" headerMode="none">
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="Signup" component={Signup} />

            <Stack.Screen name="Contacts" component={Contacts} />
            <Stack.Screen name="Chat" component={Chat} />
        </Stack.Navigator>
    );
};

export default AppNavigator;
