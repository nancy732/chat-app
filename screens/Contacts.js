import React, { useState, useEffect } from 'react';
import {
    StyleSheet,
    FlatList,
    View,
    Text,
    PermissionsAndroid,
} from 'react-native';
import database from '@react-native-firebase/database';

import Contacts from 'react-native-contacts';

const styles = StyleSheet.create({
    itemContainer: {
        margin: 10
    },
    contactName: {
        fontSize: 16,
        color: 'blue'
    }
})

export default function Contact({ route, navigation }) {

    const [Users, setUsers] = useState([])
    const [send, setSend] = useState(true)
    const sender = route.params.sender
    const { senderName } = route.params
    useEffect(() => {
        PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.READ_CONTACTS,
            {
                title: 'Contacts',
                message: ' This app would like to see your contacts'
            }
        ).then(() => {

            Contacts.getAll((err, contacts) => {
                if (err === 'denied') {
                    console.log("cannot access");
                } else {
                    database()
                        .ref(`/users`)
                        .once('value')
                        .then(snapshot => {
                            if (snapshot.val() !== null) {
                                snapshot.val().map(value => {
                                    if (value != null) {
                                        contacts.map(phone => {
                                            phone.phoneNumbers.map(number => {
                                                const newNumber = ('+91' + number.number)
                                                if (value.phoneNumber == number.number || value.phoneNumber == newNumber) {
                                                    const User = {
                                                        number: value.phoneNumber,
                                                        uid: value.uid,
                                                        name: phone.displayName
                                                    }
                                                    Users.push(User)
                                                    setSend(false)
                                                }
                                            })

                                        })
                                    }
                                })
                            }
                        })

                }
            })

        });
    })

    const Item = ({ name, number, uid, sender, senderName, navigation }) => (
        <View style={styles.itemContainer}>
            <Text onPress={() => navigation.navigate('Chat', { name: name, uid: uid, senderName: senderName, sender: sender })} style={styles.contactName}>
                {name}
            </Text>
            <Text style={styles.phones}> {number}</Text>
        </View>
    )

    console.log(Users)
    return (
        <View style={styles.container}>
            <FlatList
                data={Users}
                renderItem={({ item }) => (
                    <Item
                        name={item.name}
                        number={item.number}
                        uid={item.uid}
                        sender={sender}
                        senderName={senderName}
                        navigation={navigation}
                    />
                )}
                keyExtractor={(item, index) => index}
            />
        </View>
    )

}
