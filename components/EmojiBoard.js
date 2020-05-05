import React, { useState } from 'react'
import { StatusBar, TouchableOpacity, Text } from 'react-native'

import EmojiBoard from 'react-native-emoji-board'

export default function EmojiBoardComponent() {
    const [show, setShow] = useState(false);
    const onClick = emoji => {
        console.log(emoji);
    };

    return (
        <>
            <StatusBar barStyle="dark-content" />
            <TouchableOpacity onPress={() => setShow(!show)}>
                <Text>click here</Text>
            </TouchableOpacity>
            <EmojiBoard showBoard={show} onClick={onClick} />
        </>
    );
};