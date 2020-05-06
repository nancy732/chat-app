import React from 'react'
import {
    StyleSheet, Text, View, SafeAreaView, FlatList,
    Image
} from 'react-native';

import Images from '../assets/index'
function Item({ name, time, status, image }) {
    if (image) {
        return (
            <View style={{ ...styles.container, height: 200, marginLeft: status ? 200 : 10, backgroundColor: status ? '#ddddff' : '#228B22' }}>
                <Image style={{ height: 150, width: 120, margin: 7 }} source={image} />
                <Text style={styles.message}>{name}</Text>
                <Text style={styles.time}>{time}</Text>
                <Image style={styles.image} source={Images.tick} />
            </View>
        )
    }
    return (
        <View style={{ ...styles.container, flexDirection: 'row', marginLeft: status ? 200 : 10, backgroundColor: status ? '#ddddff' : '#228B22' }}>
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
                        image={item.image}
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
    },
    message: {
        paddingHorizontal: 10
    },
    image: {
        height: 10,
        width: 10,
        position: 'absolute',
        bottom: 9,
        right: 17
    },
    time: {
        fontSize: 10,
        position: "absolute",
        bottom: 7,
        right: 30
    }
})