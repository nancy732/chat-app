
import React, { useState, useEffect } from 'react';
import { StyleSheet, KeyboardAvoidingView, TouchableOpacity, Keyboard, TouchableWithoutFeedback, Text, View, Image, TextInput } from 'react-native';
import Images from '../assets/index'
import Message from '../components/Message'
import database from '@react-native-firebase/database';
import ImagePicker from 'react-native-image-picker'
import { imagePickerOptions, uploadFileToFireBase, createStorageReferenceToFile } from '../utils/index'
import storage from '@react-native-firebase/storage';

const Chat = ({ route, navigation }) => {

    const [message, setText] = useState('')
    const [send, setSend] = useState(false)
    const [Messages, setMessages] = useState([])
    const { name } = route.params
    const { sender } = route.params
    const [num, setNum] = useState()
    const [Height, setHeight] = useState("85%")
    const [imageURI, setImageURI] = useState(null);

    useEffect(() => {
        database()
            .ref(`/${sender}/${name}`)
            .once('value')
            .then(snapshot => {
                if (snapshot.val() != null) {
                    setNum(snapshot.val().length)
                }
                else {
                    setNum('1')
                }
            });
    }, [message])

    useEffect(() => {
        database()
            .ref(`/${sender}/${name}`)
            .once('value')
            .then(snapshot => {
                if (snapshot.val() !== null) {
                    snapshot.val().map(value => {
                        if (value != null) {
                            Messages.push(value)
                            setSend(true)
                        }
                    })
                }
            })
    }, [])


    const uploadFile = () => {
        ImagePicker.launchImageLibrary(imagePickerOptions, response => {
            if (response.didCancel) {
                console.log('Post canceled');
            } else if (response.error) {
                console.log('An error occurred: ', response.error);
            } else {
                setImageURI({ uri: response.uri });
                console.log(createStorageReferenceToFile(response));
                Promise.resolve(uploadFileToFireBase(response));

            }
        }
        );
    };
    const handleSubmit = e => {
        if (message !== '') {
            database()
                .ref(`/${sender}/${name}/${num}`)
                .set({
                    id: num,
                    message: message,
                    status: "send",
                    time: new Date().toLocaleTimeString()
                })
                .then(() => console.log('Data updated.'));

            database()
                .ref(`/${name}/${sender}/${num}`)
                .set({
                    id: num,
                    message: message,
                    status: "received",
                    time: new Date().toLocaleTimeString()
                })
                .then(() => console.log('Data updated.'));
            Messages.push({
                id: num,
                message: message,
                status: "send",
                time: new Date().toLocaleTimeString()
            })
            setText('')
        }
    }
    return (
        <KeyboardAvoidingView
            style={styles.container}
        >
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <View style={styles.inner}>
                    <View style={styles.header}>
                        <Image style={styles.profileIcon} source={Images.person} />
                        <Text style={styles.contactName}>{name}</Text>
                    </View>
                    <View style={{ height: Height }}>
                        <Text></Text>
                        <Message message={Messages} />
                    </View>
                    <View style={{ position: 'relative', bottom: 0, flexDirection: "row", backgroundColor: 'white' }}>
                        <TextInput
                            placeholder="Enter Text"
                            name="chat"
                            value={message}
                            onFocus={() => {
                                setHeight("45%")
                            }}
                            onBlur={() => {
                                setHeight("85%")
                            }}
                            onChangeText={text => {
                                setSend(false)
                                setText(text)
                            }}
                            style={{ marginLeft: 30, backgroundColor: 'white', width: '80%', paddingLeft: 10 }}
                        />
                        <Text onPress={uploadFile} style={styles.Text}>+</Text>
                        <TouchableOpacity
                            style={{ position: 'absolute', bottom: 10, right: 8 }}
                            onPress={handleSubmit}>
                            <Image style={styles.send} source={Images.send} />
                        </TouchableOpacity>

                        {/* <TouchableOpacity onPress={() => setShow(!show)}>
                            <Image style={styles.send} source={Images.emoji} />
                        </TouchableOpacity>
                        <EmojiBoard showBoard={show} onClick={onClick} /> */}
                    </View>
                </View>
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    inner: {
        justifyContent: 'space-around'
    },
    header: {
        backgroundColor: 'blue',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        zIndex: 20,
        paddingTop: 10
    },
    profileIcon: {
        height: 30,
        width: 30,
        marginVertical: 10,
        marginLeft: 15,
        padding: 20,
        borderColor: 'gray',
        borderWidth: 1,
        borderRadius: 20,
        backgroundColor: 'white'
    },
    contactName: {
        color: 'white',
        fontSize: 25,
        margin: 12,
    },
    send: {
        width: 30,
        height: 30,
    },
    Text: {
        color: 'blue',
        fontSize: 30,
        position: 'absolute',
        bottom: 8,
        left: 15
    }
});

export default Chat;

