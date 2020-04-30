import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View, TextInput, Image, Modal, ImageBackground, TouchableOpacity } from 'react-native';
import Images from '../assets/index';
import { Auth } from '../Config/Config'

export default function Signup({ navigation }) {

    const [Email, setEmail] = useState();
    const [Password, setPassword] = useState();
    const [result, setResult] = useState()
    const [visible, setVisible] = useState(true)

    const handleVisibility = e => {
        setVisible(!visible)
    }

    const handleLink = e => {
        navigation.navigate('Login')
    }
    const handleSubmit = e => {
        e.preventDefault();

        if (
            Email == "" ||
            Password == ""
        ) {
            setResult("Required!");
        }
        else {
            Auth
                .createUserWithEmailAndPassword(Email, Password)
                .then(() => {
                    console.log('User account created & signed in!');
                })
                .catch(error => {
                    if (error.code === 'auth/email-already-in-use') {
                        console.log('That email address is already in use!');
                    }

                    if (error.code === 'auth/invalid-email') {
                        console.log('That email address is invalid!');
                    }

                    console.error(error);
                });

        }
    }

    return (
        <View style={styles.container}>
            <ImageBackground source={Images.background} style={styles.containerBackground}>
                <View style={styles.textContainer}>
                    <Text style={styles.text}>Who are you!</Text>
                </View>
                <View style={styles.inputContainer}>
                    <Text style={{ paddingHorizontal: 15, color: 'red', textAlign: 'right' }}>{result}</Text>
                    <View style={styles.Inputtext}>
                        <Image style={styles.image} source={Images.personLogin} />
                        <TextInput
                            placeholder="Email"
                            name="Email"
                            style={{ paddingBottom: 0 }}
                            onChangeText={text => {
                                setEmail(text);
                            }}
                        />
                    </View>
                    <View style={styles.Inputtext}>
                        <Image style={styles.image} source={Images.lock} />

                        <TextInput
                            style={{ paddingBottom: 0 }}
                            placeholder="Password"
                            name="Password"
                            secureTextEntry={visible}
                            onChangeText={text => {
                                setPassword(text);
                            }}
                        />
                        <Text style={styles.icon} onPress={handleVisibility}>
                            <Image style={styles.image} source={visible ? Images.invisible : Images.visible} />
                        </Text>
                    </View>
                    <TouchableOpacity onPress={handleSubmit} style={styles.button}>
                        <Text style={{ textAlign: 'center' }}>Create Account</Text>
                    </TouchableOpacity>

                </View>
                <View style={styles.buttonContainer}>
                    <Text onPress={handleLink} style={styles.forgot} >Already have an Account!</Text>
                </View>
            </ImageBackground>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        justifyContent: 'space-evenly'
    },
    containerBackground: {
        flex: 1,
    },
    textContainer: {
        flex: 2,
        alignItems: 'center',
        justifyContent: 'space-around',
    },
    inputContainer: {
        flex: 4,
        alignContent: 'center',
        justifyContent: 'flex-end',
    },
    buttonContainer: {
        flex: 1,
        alignItems: 'flex-end',
        justifyContent: 'flex-start',
    },
    text: {
        borderColor: 'black',
        borderRadius: 5,
        borderWidth: 3,
        borderTopWidth: 2.5,
        paddingHorizontal: 20,
        paddingVertical: 7,
        fontFamily: 'sans-serif-medium',
        fontSize: 20,
    },
    Inputtext: {
        flexDirection: 'row',
        borderColor: 'gray',
        backgroundColor: 'transparent',
        borderWidth: 2,
        borderRadius: 20,
        paddingHorizontal: 40,
        paddingBottom: 5,
        marginBottom: 5
    },
    image: {
        height: 20,
        width: 20,
        position: 'absolute',
        left: 15,
        top: 12
    },
    icon: {
        height: 30,
        width: 20,
        position: 'absolute',
        right: 15,
        top: 7
    },
    button: {
        width: '100%',
        borderColor: 'gray',
        backgroundColor: 'transparent',
        borderWidth: 2,
        borderRadius: 19,
        padding: 7,

    },
    forgot: {
        paddingHorizontal: 20,
        fontFamily: 'sans-serif-medium',
        fontSize: 15,
        color: 'blue'
    }
});
