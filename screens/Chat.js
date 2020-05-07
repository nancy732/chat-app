
import React, { useState, useEffect } from 'react';
import { StyleSheet, KeyboardAvoidingView, TouchableOpacity, Keyboard, TouchableWithoutFeedback, Text, View, Image, TextInput } from 'react-native';
import Images from '../assets/index'
import Message from '../components/Message'
import database from '@react-native-firebase/database';
import ImagePicker from 'react-native-image-picker'
import { imagePickerOptions, uploadFileToFireBase, uploadProgress } from '../utils/index'
const Chat = ({ route, navigation }) => {

    const [message, setText] = useState('')
    const [send, setSend] = useState(false)
    const [Messages, setMessages] = useState([])
    const { name } = route.params
    const receiver = route.params.uid
    const { sender } = route.params
    const { senderName } = route.params
    const [num, setNum] = useState()
    const [Height, setHeight] = useState({
        flexHeight: 8,
        bottom: 15,
        top: 15
    })
    const [upload, setUpload] = useState({
        loading: false,
        progress: 0,
    });
    const [show, setShow] = useState(false)
    const [imageURI, setImageURI] = useState(null);
    const [justify, setJustify] = useState('center')


    useEffect(() => {
        database()
            .ref(`/${sender}/${receiver}`)
            .once('value')
            .then(snapshot => {
                if (snapshot.val() != null) {
                    setNum(snapshot.val().length)
                }
            });
    }, [message])

    useEffect(() => {
        database()
            .ref(`/${sender}/${receiver}`)
            .once('value')
            .then(snapshot => {
                if (snapshot.val() !== null) {
                    snapshot.val().map((value, index) => {
                        console.log(index)
                        if (value != null && index != 1) {
                            Messages.push(value)
                            setSend(true)
                        }
                    })
                }
            })
    }, [])
    useEffect(() => {
        database()
            .ref(`/${sender}/${receiver}/1`)
            .set({
                name: name,
                uid: receiver,
            })
            .then(() => console.log('Data updated.'));

        database()
            .ref(`/${receiver}/${sender}/1`)
            .set({
                name: senderName,
                uid: sender
            })
            .then(() => console.log('Data updated.'));
    }, [])

    useEffect(() => {
        keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', _keyboardDidShow);
        keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', _keyboardDidHide);

        return function cleanUp() {
            keyboardDidHideListener.remove()
            keyboardDidShowListener.remove()
        }
    })


    _keyboardDidShow = () => {
        setJustify('flex-end')
        setHeight({
            ...Height,
            flexHeight: 4,
            bottom: 25,
            top: 22,
        })
    }

    _keyboardDidHide = () => {
        setJustify('center')
        setHeight({
            ...Height,
            flexHeight: 8,
            bottom: 15,
            top: 15
        })
    }
    const handleSubmit = e => {
        if (message !== '' || imageURI !== null) {
            database()
                .ref(`/${sender}/${receiver}/${num}`)
                .set({
                    id: num,
                    message: message,
                    image: imageURI,
                    status: "send",
                    time: new Date().toLocaleTimeString()
                })
                .then(() => console.log('Data updated.'));

            database()
                .ref(`/${receiver}/${sender}/${num}`)
                .set({
                    id: num,
                    message: message,
                    image: imageURI,
                    status: "received",
                    time: new Date().toLocaleTimeString()
                })
                .then(() => console.log('Data updated.'));
            Messages.push({
                id: num,
                message: message,
                image: imageURI,
                status: "send",
                time: new Date().toLocaleTimeString()
            })
            setText('')
            setImageURI(null)
            setShow(false)
        }
    }
    const monitorFileUpload = uploadTask => {

        uploadTask.on('state_changed', snapshot => {
            const progress = uploadProgress(
                snapshot.bytesTransferred / snapshot.totalBytes
            );
            setShow(true)
            switch (snapshot.state) {
                case 'running':
                    setImageURI(null);
                    setUpload({ loading: true, progress });

                    break;
                case 'success':
                    snapshot.ref.getDownloadURL().then(downloadURL => {
                        setImageURI({ uri: downloadURL });
                        setUpload({ loading: false });
                    });
                    break;
                default:
                    break;
            }
        });
    };
    const uploadFile = () => {
        ImagePicker.launchImageLibrary(imagePickerOptions, response => {
            if (response.didCancel) {
                console.log('Post canceled');
            } else if (response.error) {
                console.log('An error occurred: ', response.error);
            } else {
                // setImageURI({ uri: response.uri });
                // console.log(createStorageReferenceToFile(response));
                // Promise.resolve(uploadFileToFireBase(response));

                const uploadTask = uploadFileToFireBase(response);
                monitorFileUpload(uploadTask);

            }
        }
        );
    };

    if (show) {
        return (
            <>

                <View style={{ flex: 1, justifyContent: justify }}>
                    <Text onPress={() => { setShow(false) }} style={{ position: 'absolute', top: 20, right: 20, fontSize: 20 }}>X</Text>
                    <Image source={imageURI} style={{ height: 300, width: "100%" }} />
                </View>
                <View style={{ position: 'relative', bottom: 0, flexDirection: "row", backgroundColor: 'white' }}>
                    <TextInput
                        placeholder="Enter Text"
                        name="chat"
                        value={message}

                        onChangeText={text => {
                            setSend(false)
                            setText(text)
                        }}
                        style={{ marginLeft: 10, backgroundColor: 'white', width: '80%', paddingLeft: 10 }}
                    />
                    <TouchableOpacity
                        style={{ position: 'absolute', bottom: 10, right: 8 }}
                        onPress={handleSubmit}>
                        <Image style={styles.send} source={Images.send} />
                    </TouchableOpacity>
                </View>
            </>
        )
    }
    return (
        <KeyboardAvoidingView
            behavior="height"
            style={styles.container}
        >
            <View
                style={styles.header}
            >
                <Image style={{ ...styles.profileIcon, marginTop: Height.bottom }} source={Images.person} />
                <Text style={{ ...styles.contactName, marginTop: Height.top }}>{name}</Text>

            </View>
            <View
                onPress={Keyboard.dismiss}
                style={{ flex: Height.flexHeight }}
            >
                <Message message={Messages} />
            </View>
            <View style={{ flex: 1, flexDirection: 'row' }}>
                <TextInput
                    placeholder="Enter Text"
                    name="chat"
                    value={message}

                    onChangeText={text => {
                        setSend(false)
                        setText(text)
                    }}
                    style={{ marginLeft: 40, backgroundColor: 'white', width: '80%', paddingLeft: 10 }}
                />
                <Text onPress={uploadFile} style={styles.Text}>+</Text>
                <TouchableOpacity
                    style={{ position: 'absolute', bottom: 25, right: 2 }}
                    onPress={handleSubmit}>
                    <Image style={styles.send} source={Images.send} />
                </TouchableOpacity>
            </View>
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
        flex: 1,
        backgroundColor: "blue",
        flexDirection: 'row',
        justifyContent: 'flex-start',
    },
    profileIcon: {
        height: 40,
        width: 40,
        marginLeft: 15,
        borderColor: 'gray',
        borderWidth: 1,
        borderRadius: 20,
        backgroundColor: 'white'
    },
    contactName: {
        color: 'white',
        fontSize: 25,
        margin: 15,
    },
    send: {
        width: 30,
        height: 30,
    },
    Text: {
        color: 'blue',
        fontSize: 30,
        position: 'absolute',
        bottom: 18,
        left: 12
    }
});

export default Chat;

