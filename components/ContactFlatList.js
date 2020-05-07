import React from 'react';
import {
    SafeAreaView,
    TouchableOpacity,
    FlatList,
    StyleSheet,
    Text,
    Image
} from 'react-native';
import Images from '../assets/index'

function Item({ name, uid, sender, senderName, navigation }) {
    return (
        <TouchableOpacity
            style={styles.item}
            onPress={() => navigation.navigate('Chat', { name: name, uid: uid, sender: sender, senderName: senderName })}
        >
            <Image style={styles.itemView} source={Images.person} />
            <Text style={styles.title}>{name}</Text>
        </TouchableOpacity>
    );
}

export default function ContactFlatList({ sender, senderName, Users, navigation }) {
    console.log(Users)
    return (
        <SafeAreaView style={styles.container}>
            <FlatList
                data={Users}
                renderItem={({ item }) => (
                    <Item
                        name={item.name}
                        uid={item.uid}
                        sender={sender}
                        senderName={senderName}
                        navigation={navigation}
                    />
                )}
                keyExtractor={(item, index) => index}
            />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    item: {
        flex: 1,
        flexDirection: 'row',
        marginHorizontal: 10,
        marginTop: 15,
    },
    title: {
        fontSize: 20,
        width: '85%',
        marginTop: 5,
        marginHorizontal: 10,
        borderBottomColor: 'gray',
        borderBottomWidth: 1
    },
    itemView: {
        height: 40,
        width: 40,
        padding: 20,
        borderColor: 'gray',
        borderWidth: 1,
        borderRadius: 20,
    }
});
