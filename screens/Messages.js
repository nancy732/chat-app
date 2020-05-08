import React, { useState, useEffect } from 'react';
import { StyleSheet, StatusBar, Text, View, Image, TouchableOpacity } from 'react-native';
import SafeAreaView, { SafeAreaProvider } from 'react-native-safe-area-view';
import Images from '../assets/index'
import ContactFlatList from '../components/ContactFlatList'
import database from '@react-native-firebase/database';
const Messages = ({ route, navigation }) => {

    const [Users, setUsers] = useState([])
    const [send, setSend] = useState(true)
    const sender = route.params.uid
    const senderName = route.params.name

    useEffect(() => {
        database()
            .ref(`/${sender}`)
            .once('value')
            .then(snapshot => {
                if (snapshot.val() !== null) {
                    const keys = Object.keys(snapshot.val()).reverse()
                    keys.map(key => {
                        database()
                            .ref(`/${sender}/${key}`)
                            .once('value')
                            .then(snapshot => {
                                if (snapshot.val() != null) {
                                    snapshot.val().map((value, index) => {
                                        if (value != null && index == 1) {
                                            Users.push(value)
                                            setSend(false)
                                        }
                                    })
                                }
                            })
                    })
                }
            })
    })
    return (
        <>
            <StatusBar hidden />
            <SafeAreaProvider>
                <SafeAreaView style={styles.container}>
                    <View style={styles.header}>
                        <TouchableOpacity
                            style={styles.image}

                        >
                            <Image style={{ height: 40, width: 40 }} source={Images.about} />
                        </TouchableOpacity>
                        <Text style={styles.text}>Chats</Text>
                        <TouchableOpacity
                            style={styles.image}
                            onPress={() => {
                                navigation.navigate('Contacts', { senderName: senderName, sender: sender })
                            }}
                        >
                            <Image style={{ height: 30, width: 30, marginTop: 5 }} source={Images.contacts} />
                        </TouchableOpacity>
                    </View>
                    <View style={styles.contacts}>
                        <ContactFlatList navigation={navigation} sender={sender} senderName={senderName} Users={Users} />
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
        height: 35,
        width: 35,
        margin: 15,
    },
    header: {
        flex: 1,
        flexDirection: 'row',
        alignContent: 'center',
        justifyContent: 'space-between',
        borderBottomWidth: 1,
        borderBottomColor: '#DDDDDD'
    },
    contacts: {
        flex: 9,
        alignContent: 'center',
        justifyContent: 'center',
    },
    text: {
        color: 'black',
        fontSize: 25,
        margin: 15,
        fontWeight: 'bold'
    }
});

export default Messages;
