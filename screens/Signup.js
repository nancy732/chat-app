import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, Image, TextInput } from 'react-native';
import auth from '@react-native-firebase/auth'
import Images from '../assets/index'
import database from '@react-native-firebase/database';

export default function Signup({ navigation }) {
    const [name, setName] = useState('')
    const [result, setResult] = useState('')
    const [user, setUser] = useState({
        uid: '',
        phoneNumber: ''
    });
    const [num, setNum] = useState()
    const [store, setStore] = useState(true)
    useEffect(() => {
        database()
            .ref(`/users`)
            .once('value')
            .then(snapshot => {
                if (snapshot.val() != null) {
                    setNum(snapshot.val().length)
                }
                else {
                    setNum('1')
                }
            });
    }, [name])

    useEffect(() => {
        database()
            .ref(`/users`)
            .once('value')
            .then(snapshot => {
                console.log(snapshot.val())
                snapshot.val().map(value => {
                    if (value != null) {
                        if (value.phoneNumber == user.phoneNumber) {
                            setStore(false)
                        }
                    }
                })

            });
    }, [name])

    const handleSubmit = () => {
        if (name == "") {
            setResult("required")
        }
        else {
            if (store) {
                database()
                    .ref(`/users/${num}`)

                    .set({
                        id: num,
                        uid: user.uid,
                        name: name,
                        phoneNumber: user.phoneNumber
                    })
                    .then(() => console.log('Data updated.'));
            }
            navigation.navigate('Messages', { name: name, uid: user.uid })
        }
    }

    function onAuthStateChanged(user) {
        setUser({
            ...user,
            uid: user.uid,
            phoneNumber: user.phoneNumber
        });
    }

    useEffect(() => {
        const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
        return subscriber;
    }, []);


    console.log(user)
    return (
        <View style={styles.container}>

            <View style={styles.imageContainer}>
                <Image style={styles.image} source={Images.login} />
            </View>

            <View style={styles.textContainer}>
                <Text style={styles.text}>SignUp with Chat App</Text>
                <View style={result ? styles.error : styles.inputNumber}>
                    <TextInput style={{ width: 120, textAlign: 'center' }} placeholder="Enter your Name" onChangeText={text => {
                        setResult('')

                        setName(text)
                    }} />
                    <Text style={styles.submit} onPress={() => {
                        handleSubmit()
                    }}>
                        <Image style={{ height: 30, width: 30 }} source={Images.tick} />
                    </Text>
                </View>
                <Text style={styles.result}>{result}</Text>
            </View>

        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        justifyContent: 'space-evenly'
    },
    image: {
        height: 250,
        width: 250
    },
    imageContainer: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center"
    },
    textContainer: {
        flex: 2,
        alignItems: 'center',
        justifyContent: "flex-start",
    },
    text: {
        fontSize: 25,
        marginBottom: 10
    },
    inputNumber: {
        flexDirection: 'row',
        borderBottomColor: '#DDDDDD',
        borderBottomWidth: 1,
    },
    error: {
        flexDirection: 'row',
        borderBottomColor: 'red',
        borderBottomWidth: 1,
    },
    flag: {
        height: 25,
        width: 30,
        marginTop: 10
    },
    submit: {
        height: 40,
        width: 40
    },
    result: {
        color: 'red',
        fontSize: 15
    }
})
