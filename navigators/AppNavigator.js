import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import Contact from '../screens/Contacts'
import Chat from '../screens/Chat'
import Login from '../screens/Login'
import Signup from '../screens/Signup';
import Messages from '../screens/Messages';
const AppNavigator = () => {
    const Stack = createStackNavigator();

    return (
        <Stack.Navigator initialRouteNmae="Login" headerMode="none">
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="Signup" component={Signup} />
            <Stack.Screen name="Messages" component={Messages} />
            <Stack.Screen name="Contacts" component={Contact} />
            <Stack.Screen name="Chat" component={Chat} />
        </Stack.Navigator>
    );
};

export default AppNavigator;
