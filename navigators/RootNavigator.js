import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';

import Splash from '../screens/Splash';
import AppNavigator from '../navigators/AppNavigator';

const RootNavigator = () => {
    const Stack = createStackNavigator();

    return (
        <Stack.Navigator initialRouteName="Splash" headerMode="none">
            <Stack.Screen name="Splash" component={Splash} />
            <Stack.Screen name="AppNavigator" component={AppNavigator} />
        </Stack.Navigator>
    );
};

export default RootNavigator;
