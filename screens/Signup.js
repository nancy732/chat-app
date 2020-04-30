import React, { useState } from 'react';
import { StyleSheet, View, Text, Image, TextInput } from 'react-native';

import Images from '../assets/index'

export default function Signup({ navigation }) {
    const [name, setName] = useState('')
    const [result, setResult] = useState('')
    const handleSubmit = () => {
        if (name == "") {
            setResult("required")
        }
        else {
            navigation.navigate('Contacts')
        }
    }
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
