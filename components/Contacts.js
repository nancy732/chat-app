import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, FlatList, PermissionsAndroid } from 'react-native';
import Contacts from 'react-native-contacts';


export default function Contact() {

    const [contacts, setContacts] = useState(null)

    useEffect(() => {
        PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.READ_CONTACTS,
            {
                title: 'Contacts',
                message: 'This app would like to view your contacts.'
            }
        ).then(() => {
            Contacts.getAll((err, contacts) => {
                if (err === 'denied') {
                    // error
                } else {
                    // contacts returned in Array
                    setContacts(contacts)
                }
            })
        })
    })

    return (
        <View style={styles.container}>
            <FlatList
                data={contacts}
                renderItem={({ item }) => (
                    <View>
                        <Text style={styles.contact_details}>
                            Name: {`${item.givenName} `} Surname: {item.familyName}
                        </Text>
                        {item.phoneNumbers.map(phone => (
                            <Text style={styles.phones}>{phone.label} : {phone.number}</Text>
                        ))}
                    </View>
                )}
                numColumns={1}
                keyExtractor={(item, index) => index}
            />
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
        marginTop: 30,
    },
    phones: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },
    contact_details: {
        textAlign: 'center',
        color: 'red',
        margin: 10,
    },
});