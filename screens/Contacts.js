import React, { useState, useEffect } from 'react';
import {
    StyleSheet,
    FlatList,
    View,
    Text,
    PermissionsAndroid,
    Image
} from 'react-native';
import database from '@react-native-firebase/database';
import Images from '../assets/index'
import Contacts from 'react-native-contacts';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { RadioButton } from 'react-native-paper';

export default function Contact({ route, navigation }) {

    const [Users, setUsers] = useState([])
    const [send, setSend] = useState(true)
    const [Name, setName] = useState('')
    const [chat, setChat] = useState({
        name: '',
        uid: '',
        senderName: '',
        sender: ''
    })
    const [checked, setChecked] = useState(false)
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
    }, [])

    console.log(Users)
    const Item = ({ name, number, uid, sender, senderName, navigation }) => (
        <View style={styles.itemContainer}>
            <TouchableOpacity style={{ flexDirection: 'row' }} >
                <Image style={styles.itemView} source={Images.person} />
                <Text style={styles.contactName}>
                    {name}
                </Text>

            </TouchableOpacity>
            <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                <RadioButton
                    value={name}
                    status={checked && Name === name ? 'checked' : 'unchecked'}
                    onPress={() => {
                        setChecked(!checked)
                        setName(checked ? '' : name)
                        setChat({
                            ...chat,
                            name: name,
                            uid: uid,
                            senderName: senderName,
                            sender: sender
                        })
                    }}
                />
            </View>
        </View>
    )
    return (
        <View style={styles.container}>

            <TouchableOpacity style={{
                position: 'relative',
                top: 20,
                left: 10
            }}
                onPress={() => { navigation.navigate('Messages') }}
            >
                <Image style={styles.image} source={Images.expand} />
            </TouchableOpacity>
            <View style={styles.header}>

                <Text style={styles.text}>
                    New Chat
                </Text>

                <Text style={styles.to}>
                    To:  {Name}
                </Text>
            </View>
            <View style={{ flex: 6 }}>
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
                <Text style={{ ...styles.chat, backgroundColor: checked ? 'blue' : '#DDDDDD' }}
                    onPress={() => navigation.navigate('Chat', { name: chat.name, uid: chat.uid, senderName: chat.senderName, sender: chat.sender })}
                >Chat</Text>
            </View>
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#EEEEEE'
    },
    itemContainer: {
        flex: 1,
        flexDirection: 'row',
        padding: 10,
        marginHorizontal: '2.5%',
        alignContent: 'center',
        width: '95%',
        borderBottomColor: '#DDDDDD',
        backgroundColor: 'white',
        borderBottomWidth: 1,
    },
    contactName: {
        fontSize: 20,
        color: 'black',
        paddingHorizontal: 10,
        paddingTop: 7,
        width: '75%'
    },
    header: {
        flex: 1,
        alignItems: 'center',
    },
    itemView: {
        height: 40,
        width: 40,
        padding: 20,
        borderColor: '#DDDDDD',
        borderWidth: 1,
        borderRadius: 20,
    },
    to: {
        width: '90%',
        paddingVertical: 7,
        fontWeight: 'bold',
        alignContent: 'center',
        paddingHorizontal: 15,
        borderColor: "#DDDDDD",
        backgroundColor: '#DDDDDD',
        borderWidth: 1,
        borderRadius: 20
    },
    text: {
        fontWeight: 'bold',
        fontSize: 20,
        paddingBottom: 7
    },
    image: {
        height: 40,
        width: 40
    },
    chat: {
        zIndex: 20,
        position: 'absolute',
        bottom: '7%',
        left: '20%',
        width: '60%',
        paddingVertical: 10,
        fontWeight: 'bold',
        borderColor: "#DDDDDD",
        borderWidth: 1,
        borderRadius: 20,
        textAlign: 'center',
        color: 'white'
    }
})
