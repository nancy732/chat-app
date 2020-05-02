import React from 'react'
import {
    StyleSheet, Text, View, SafeAreaView, FlatList,
    Image
} from 'react-native';

import Images from '../assets/index'
function Item({ name, time, status }) {
    return (
        <View style={{ ...styles.container, marginLeft: status ? 200 : 10, backgroundColor: status ? '#ddddff' : '#228B22' }}>
            <Text style={styles.message}>{name}</Text>
            <Text style={styles.time}>{time}</Text>
            <Image style={styles.image} source={Images.tick} />
        </View>
    );
}

export default function Message(props) {
    console.log(props.message)
    const DATA = props.message
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <FlatList

                data={DATA}
                renderItem={({ item }) => (
                    <Item
                        name={item.message}
                        time={item.time}
                        status={item.status == "send" ? true : false}
                    />
                )}
                keyExtractor={item => item.id}
            />
        </SafeAreaView>

    )
}

const styles = StyleSheet.create({
    container: {
        padding: 8,
        width: 150,
        borderRadius: 20,
        marginVertical: 2,
        flexDirection: "row"
    },
    message: {
        paddingHorizontal: 10
    },
    image: {
        height: 10,
        width: 10,
        position: 'absolute',
        bottom: 5,
        right: 15
    },
    time: {
        fontSize: 10,
        position: "absolute",
        bottom: 5,
        right: 30
    }
})