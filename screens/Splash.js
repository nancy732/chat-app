import React, { useEffect } from 'react';
import { StyleSheet, StatusBar, Text } from 'react-native';
import { ActivityIndicator, Colors } from 'react-native-paper';
import SafeAreaView, { SafeAreaProvider } from 'react-native-safe-area-view';

const Splash = ({ navigation }) => {
    useEffect(() => {
        setTimeout(() => {
            navigation.navigate('AppNavigator');
        }, 2000);
    });

    return (
        <>
            <StatusBar hidden />
            <SafeAreaProvider>
                <SafeAreaView style={styles.container}>
                    <ActivityIndicator size="large" color="#0000ff" animating={true} />
                    <Text>Let's Chat</Text>
                </SafeAreaView>
            </SafeAreaProvider>
        </>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    image: {
        height: '100%',
        width: '100%',
    },
});

export default Splash;
