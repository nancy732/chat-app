import React from 'react';
import { StyleSheet, StatusBar, Text, View, Image } from 'react-native';
import SafeAreaView, { SafeAreaProvider } from 'react-native-safe-area-view';
import Images from '../assets/index'
import ContactFlatList from '../components/ContactFlatList'
const Contacts = ({ navigation }) => {

    return (
        <>
            <StatusBar hidden />
            <SafeAreaProvider>
                <SafeAreaView style={styles.container}>
                    <View style={styles.header}>
                        <Text style={styles.text}>Contacts</Text>
                        <Image style={styles.image} source={Images.search} />
                    </View>
                    <View style={styles.contacts}>
                        <ContactFlatList navigation={navigation} />
                    </View>
                </SafeAreaView>
            </SafeAreaProvider>
        </>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    image: {
        height: 30,
        width: 30,
        margin: 15,
    },
    header: {
        flex: 1,
        backgroundColor: 'blue',
        flexDirection: 'row',
        alignContent: 'center',
        justifyContent: 'space-between',
    },
    contacts: {
        flex: 9,
        alignContent: 'center',
        justifyContent: 'center',
    },
    text: {
        color: 'white',
        fontSize: 25,
        margin: 12,
        fontWeight: 'bold'
    }
});

export default Contacts;
