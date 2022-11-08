import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react';
import * as Location from 'expo-location';

const Footer = () => {
    const [coordinates, setСoordinates] = useState<number[] | null>(null)
    const [errorMsg, setErrorMsg] = useState<string | null>(null);
    console.log('coordinates:', coordinates);

    const onPress = () => {
        (async () => {

            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                setErrorMsg('Permission to access location was denied');
                return
            }

            let location = await Location.getCurrentPositionAsync({});
            const coordinates = [location.coords.latitude, location.coords.longitude]
            setСoordinates(coordinates)
        })()

    }

    let text = 'Waiting..'
    if (errorMsg) {
        text = errorMsg;
    } else if (coordinates) {
        text = JSON.stringify(coordinates)
    }

    return (
        <View style={styles.buttonWrap}>
            <TouchableOpacity style={styles.buttonAdd} onPress={onPress} >
                <Text style={styles.buttonAddText}>Получить координаты</Text>
            </TouchableOpacity>
        </View>
    )
}

export default Footer

const styles = StyleSheet.create({
    buttonWrap: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        paddingHorizontal: 25,
        paddingBottom: 30
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