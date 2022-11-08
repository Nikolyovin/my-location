import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react';
import * as Location from 'expo-location';

const Footer = () => {
    const [location, setLocation] = useState(null);
    const [errorMsg, setErrorMsg] = useState(null);
    console.log('location:', location);
    console.log('errorMsg:', errorMsg);

    const onPress = () => {
        (async () => {
      
            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                setErrorMsg('Permission to access location was denied');
                return
            }
      
            let location = await Location.getCurrentPositionAsync({});
            setLocation(location)
        })()

        setLocation([])
    }

    let text = 'Waiting..'
        if (errorMsg) {
          text = errorMsg;
        } else if (location) {
          text = JSON.stringify(location)
        }

    return (
        <View  style = { styles.buttonWrap }>
            <TouchableOpacity style={styles.buttonAdd} onPress = { onPress } >
                <Text style={styles.buttonAddText}>Получить координаты</Text>
            </TouchableOpacity>
        </View>
    )
}

export default Footer

const styles = StyleSheet.create({
    footer: {
        paddingBottom: 30
    },
    buttonWrap: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        paddingHorizontal: 15,
    },
    buttonAdd: {
        backgroundColor: '#00a8b8',
        width: '100%',
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 20
    },
    buttonAddText: {
        color: 'white',
    }
})