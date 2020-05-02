
import React, { useState, useEffect } from 'react';
import { StyleSheet, KeyboardAvoidingView, Keyboard, TouchableWithoutFeedback, Platform, Text, View, Image, TextInput } from 'react-native';
// import SafeAreaView, { SafeAreaProvider } from 'react-native-safe-area-view';
import Images from '../assets/index'
import Message from '../components/Message'
import database from '@react-native-firebase/database';

// import { db } from '../Config/Config'
const Chat = ({ route, navigation }) => {
    const [message, setText] = useState('')
    const [send, setSend] = useState(false)
    const [Messages, setMessages] = useState([])
    const { name } = route.params
    const { sender } = route.params.sender
    const [num, setNum] = useState()
    const [Height, setHeight] = useState(500)


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
    console.log(Height)
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
                        <Message message={Messages} />
                    </View>
                    <View style={{ position: 'relative', bottom: 0, flexDirection: "row" }}>
                        <TextInput
                            placeholder="Enter Text"
                            name="chat"
                            value={message}
                            onFocus={() => {
                                setHeight(200)
                            }}
                            onBlur={() => {
                                setHeight(500)
                            }}
                            onChangeText={text => {
                                setSend(false)
                                setText(text)
                            }}
                            style={{ backgroundColor: 'white', width: '90%' }}
                        />
                        <Text onPress={handleSubmit}>
                            <Image style={styles.send} source={Images.send} />
                        </Text>
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
    textInput: {
        height: 40,
        borderColor: "#000000",
        borderBottomWidth: 1,
        marginBottom: 36
    },
    btnContainer: {
        backgroundColor: "white"
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
    }
});

export default Chat;


// import React, { useState, useEffect } from 'react';
// import { StyleSheet, KeyboardAvoidingView, Keyboard, TouchableWithoutFeedback, Platform, Text, View, Image, TextInput } from 'react-native';
// // import SafeAreaView, { SafeAreaProvider } from 'react-native-safe-area-view';
// import Images from '../assets/index'
// import Message from '../components/Message'
// import database from '@react-native-firebase/database';

// // import { db } from '../Config/Config'
// const Chat = ({ route, navigation }) => {
//     const [message, setText] = useState('')
//     const [send, setSend] = useState(false)
//     const [Messages, setMessages] = useState([])
//     const { name } = route.params
//     const { sender } = route.params.sender
//     const [num, setNum] = useState()

//     console.log(sender, name)
//     useEffect(() => {
//         database()
//             .ref(`/${sender}/${name}`)
//             .once('value')
//             .then(snapshot => {
//                 if (snapshot.val() != null) {
//                     setNum(snapshot.val().length)
//                 }
//                 else {
//                     setNum('1')
//                 }
//             });
//     }, [message])

//     useEffect(() => {
//         database()
//             .ref(`/${sender}/${name}`)
//             .once('value')
//             .then(snapshot => {
//                 if (snapshot.val() !== null) {
//                     snapshot.val().map(value => {
//                         if (value != null) {
//                             Messages.push(value)
//                             setSend(true)
//                         }
//                     })
//                 }
//             })
//     }, [])

//     const handleSubmit = e => {
//         if (message !== '') {
//             database()
//                 .ref(`/${sender}/${name}/${num}`)
//                 .set({
//                     id: num,
//                     message: message,
//                     status: "send",
//                     time: new Date().toLocaleTimeString()
//                 })
//                 .then(() => console.log('Data updated.'));

//             database()
//                 .ref(`/${name}/${sender}/${num}`)
//                 .set({
//                     id: num,
//                     message: message,
//                     status: "received",
//                     time: new Date().toLocaleTimeString()
//                 })
//                 .then(() => console.log('Data updated.'));
//             Messages.push({
//                 id: num,
//                 message: message,
//                 status: "send",
//                 time: new Date().toLocaleTimeString()
//             })
//             setText('')
//         }
//     }
//     return (
//         <>
//             <KeyboardAvoidingView
//                 style={styles.container}
//             // behavior={Platform.OS == "ios" ? "padding" : "height"}
//             >
//                 <View style={styles.header}>
//                     <Image style={styles.profileIcon} source={Images.person} />
//                     <Text style={styles.contactName}>{name}</Text>
//                 </View>
//                 <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
//                     <View style={styles.inner}>

//                         <View style={styles.chatBody}>
//                             <Message message={Messages} />
//                         </View>
//                         <View style={styles.input}>
//                             <TextInput
//                                 placeholder="Enter Text"
//                                 name="chat"
//                                 value={message}

//                                 onChangeText={text => {
//                                     setSend(false)
//                                     setText(text)
//                                 }}
//                                 style={{ backgroundColor: 'white', width: '90%' }}
//                             />
//                             <Text style={{ position: 'absolute', bottom: 15, right: 10, height: 35, widt: 35 }} onPress={handleSubmit}>
//                                 <Image style={styles.send} source={Images.send} />
//                             </Text>
//                         </View>
//                     </View>
//                 </TouchableWithoutFeedback>
//             </KeyboardAvoidingView>
//         </>
//     );
// };

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//     },
//     profileIcon:
//     {
//         height: 30,
//         width: 30,
//         marginVertical: 10,
//         marginLeft: 15,
//         padding: 20,
//         borderColor: 'gray',
//         borderWidth: 1,
//         borderRadius: 20,
//         backgroundColor: 'white'
//     },
//     header: {
//         backgroundColor: 'blue',
//         flexDirection: 'row',
//         alignContent: 'center',
//         height: 60
//     },
//     chatBody: {
//         flex: 1
//     },
//     contactName: {
//         color: 'white',
//         fontSize: 25,
//         margin: 12,
//     },
//     input: {
//         flexDirection: 'row',
//         borderTopColor: 'gray',
//         borderTopWidth: 1,
//         paddingHorizontal: 10,
//         height: 60,
//     },
//     send: {
//         width: 30,
//         height: 30,
//     },
//     inner: {
//         flex: 1,
//     }
// });

// export default Chat;
