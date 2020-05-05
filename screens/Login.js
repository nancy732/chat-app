import React, { useState, useCallback, useRef, useEffect, useMemo } from 'react';
import { StyleSheet, View, Text, Image, TextInput, Animated, Keyboard, Modal, KeyboardAvoidingView, TouchableHighlight } from 'react-native';
// import { Auth } from '../Config/Config'
import auth from '@react-native-firebase/auth';
import Images from '../assets/index'
export default function Login({ navigation }) {

    const [PhoneNumber, setPhoneNumber] = useState()
    const [confirm, setConfirm] = useState(null)
    const [code, setCode] = useState('');
    const [modalVisible, setModalVisible] = useState(false);
    const [resendModal, setVisible] = useState(true)
    const [sendingOTP, setSendingOTP] = useState(false);
    const [timeLeft, setTimeLeft] = useState(30);
    const [verifyingOTP, setVerifyingOTP] = useState(false);
    const [result, setResult] = useState('')
    const [imageHeight, setHeight] = useState(250)
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

    const validatePhoneNumber = (phoneNumber) => {
        var regexp = /^((\+){1}91){1}[1-9]{1}[0-9]{9}$/
        return regexp.test(phoneNumber)
    }

    const handleSubmit = useCallback(
        async phoneNumber => {
            if (validatePhoneNumber(phoneNumber) == '') {
                setResult('Enter valid Phone Number')
            }
            else {
                const confirmation = await auth().signInWithPhoneNumber(phoneNumber);
                startTimer();
                setConfirm(confirmation);
            }
        },
        [startTimer],
    );

    async function confirmCode() {
        if (code == '') {
            setModalVisible(true)
        }
        else {
            try {
                await confirm.confirm(code)
                if (modalVisible == false) {
                    setVisible(false)
                    navigation.navigate('Signup')
                }
            } catch (error) {
                setModalVisible(true);
            }
        }
    }

    useEffect(() => {
        keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', _keyboardDidShow);
        keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', _keyboardDidHide);
    })


    _keyboardDidShow = () => {
        setHeight(150)
    }

    _keyboardDidHide = () => {
        setHeight(250)
    }
    if (!confirm) {
        return (
            <KeyboardAvoidingView
                behavior='height'
                style={styles.container}
            >

                <View style={styles.imageContainer}>
                    <Image style={{ height: imageHeight, width: imageHeight }} source={Images.login} />
                </View>
                <View style={styles.textContainer}>
                    <Text style={styles.text}>Get start with Phone Number</Text>
                    <Text>Please confirm country code and</Text>
                    <Text>enter your Phone Number</Text>
                    <View style={result ? styles.error : styles.inputNumber}>
                        <Image style={styles.flag} source={Images.india} />
                        <Text style={{ marginTop: 15, marginLeft: 10 }}>+91</Text>
                        <TextInput style={{ width: 120, paddingLeft: 10 }} onChangeText={text => {
                            setResult('')
                            setPhoneNumber(text)
                        }} />
                        <Text style={styles.submit} onPress={() => {
                            handleSubmit('+91' + PhoneNumber)
                            setSendingOTP(true);
                        }}>
                            <Image style={{ height: 30, width: 30 }} source={Images.tick} />
                        </Text>
                    </View>
                    <Text style={styles.result}>{result}</Text>
                </View>
            </KeyboardAvoidingView>
        )
    }
    return (
        <KeyboardAvoidingView
            behavior='height'
            style={styles.container}
        >
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
            >
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <Text style={{ textAlign: 'center' }}>Alert</Text>
                        <Text style={styles.modalText}>ENTER VALID OTP</Text>

                        <TouchableHighlight
                            style={{ ...styles.openButton, backgroundColor: "#2196F3" }}
                            onPress={() => { setModalVisible(false) }}
                        >
                            <Text style={styles.textStyle}>Ok</Text>
                        </TouchableHighlight>
                    </View>
                </View>
            </Modal>
            {timeLeft >= 1 ?
                <Text style={styles.timer}>{timeLeft}</Text> :

                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={true && resendModal}
                >
                    <View style={styles.centeredView}>
                        <View style={styles.modalView}>
                            <Text style={{ textAlign: 'center' }}>Alert</Text>
                            <Text style={styles.modalText}>OTP Expired</Text>

                            <TouchableHighlight
                                style={{ ...styles.openButton, backgroundColor: "#2196F3" }}
                                onPress={() => {
                                    handleSubmit('+91' + PhoneNumber);
                                    setTimeLeft(30);
                                }}
                            >
                                <Text style={styles.textStyle}>Resend OTP</Text>
                            </TouchableHighlight>
                        </View>
                    </View>
                </Modal>
            }
            <View style={styles.imageContainer}>
                <Image style={{ height: imageHeight, width: imageHeight }} source={Images.login} />
            </View>

            <View style={styles.textContainer}>
                <Text style={styles.text}>Verify Your Number</Text>
                <Text>Please enter verification code sent to</Text>
                <Text>your number</Text>

                <Text style={styles.otpsubmit} onPress={() => {
                    setVerifyingOTP(true);
                    confirmCode()
                }}>
                    <Image style={{ height: 30, width: 30 }} source={Images.tick} />
                </Text>

                <TextInput style={styles.inputOTP} onChangeText={text => { setCode(text) }} />

                <Text
                    style={styles.changeNumber}
                    onPress={() => {
                        setConfirm();
                        setSendingOTP(false);
                        setTimeLeft(30);
                        setPhoneNumber('');
                        setVerifyingOTP(false);
                        setCode();
                    }}
                >CHANGE YOUR MOBILE NUMBER</Text>
            </View>
        </KeyboardAvoidingView>
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
        paddingTop: 40,
        alignItems: "center",
        justifyContent: "center"
    },
    textContainer: {
        flex: 2,
        paddingTop: 20,
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
    inputOTP: {
        borderBottomColor: '#DDDDDD',
        borderBottomWidth: 1,
        width: 100,
        textAlign: 'center'
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
    otpsubmit: {
        position: 'absolute',
        top: 100,
        right: 70,
        height: 40,
        width: 40
    },
    result: {
        fontSize: 15,
        color: 'red'
    },
    modalView: {
        margin: 20,
        marginTop: 230,
        backgroundColor: "white",
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 20,
        padding: 35,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 3
    },
    openButton: {
        backgroundColor: "#F194FF",
        borderRadius: 20,
        padding: 10,
        width: 150,
        elevation: 2,
    },
    textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center"
    },
    modalText: {
        fontSize: 15,
        marginBottom: 10,
        textAlign: 'center'
    },
    timer: {
        position: 'absolute',
        top: 35,
        left: 15,
        fontWeight: 'bold',
        fontSize: 25
    },
    changeNumber: {
        marginTop: 15
    }
})
