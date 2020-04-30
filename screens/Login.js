import React, { useState, useCallback, useRef, useEffect } from 'react';
import { StyleSheet, View, Text, Image, TextInput } from 'react-native';
import { Auth } from '../Config/Config'
import Images from '../assets/index'
export default function Login() {

    const [PhoneNumber, setPhoneNumber] = useState()
    const [confirm, setConfirm] = useState(null)
    const [code, setCode] = useState('');

    const [sendingOTP, setSendingOTP] = useState(false);
    const [timeLeft, setTimeLeft] = useState(30);
    const [verifyingOTP, setVerifyingOTP] = useState(false);
    const intervalRef = useRef(null);
    const startTimer = useCallback(() => {
        intervalRef.current = setInterval(() => {
            setTimeLeft(data =>
                data > -1 ? data - 1 : clearInterval(intervalRef.current),
            );
        }, 1000);
    }, []);
    useEffect(() => {
        return () => {
            clearInterval(intervalRef.current);
        };
    }, []);
    var appVerifier = window.recaptchaVerifier;

    const handleSubmit = useCallback(
        async phoneNumber => {
            const confirmation = await Auth.signInWithPhoneNumber(phoneNumber);
            startTimer();
            console.log(confirmation)
            setConfirm(confirmation);
        },
        [startTimer],
    );

    async function confirmCode() {
        try {
            await confirm.confirm(code);
        } catch (error) {
            console.log('Invalid code.');
        }
    }

    if (!confirm) {
        return (
            <View style={styles.container}>

                <View style={styles.imageContainer}>
                    <Image style={styles.image} source={Images.login} />
                </View>
                <View style={styles.textContainer}>
                    <Text style={styles.text}>Get start with Phone Number</Text>
                    <Text>Please confirm country code and</Text>
                    <Text>enter your Phone Number</Text>
                    <View style={styles.inputNumber}>
                        <Image style={styles.flag} source={Images.india} />
                        <Text style={{ marginTop: 15, marginLeft: 10 }}>+91</Text>
                        <TextInput style={{ width: 150 }} onChangeText={text => { setPhoneNumber(text) }} />
                        <Text style={styles.submit} onPress={() => {
                            handleSubmit('+91' + PhoneNumber)
                            setSendingOTP(true);
                        }}>
                            <Image style={{ height: 30, width: 30 }} source={Images.tick} />
                        </Text>
                    </View>
                </View>
            </View>
        )
    }
    return (
        <View style={styles.container}>

            <View style={styles.imageContainer}>
                <Image style={styles.image} source={Images.login} />
            </View>

            <View style={styles.textContainer}>
                <Text style={styles.text}>Verify Your Number</Text>
                <Text>Please enter verification code sent to</Text>
                <Text>your number</Text>
                <View style={styles.inputNumber}>
                    <TextInput style={{ width: 150 }} onChangeText={text => { setCode(text) }} />
                    <Text style={styles.submit} onPress={() => {
                        setVerifyingOTP(true);
                        confirmCode()
                    }}>
                        <Image style={{ height: 30, width: 30 }} source={Images.tick} />
                    </Text>
                </View>
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
    flag: {
        height: 25,
        width: 30,
        marginTop: 10
    },
    submit: {
        height: 40,
        width: 40
    }
})
