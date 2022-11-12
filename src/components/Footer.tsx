import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react';
import * as Location from 'expo-location';
import { useActions } from '../hooks/action';

const Footer = () => {
    const { iShowModal } = useActions()

    const onShowModal = () => {
        iShowModal(true)
    }

    return (
        <View style={styles.buttonWrap}>
            <TouchableOpacity style={styles.buttonAdd} onPress={onShowModal}>
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
        backgroundColor: '#00c68f',
        width: '100%',
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 15
    },
    buttonAddText: {
        color: 'white',
    }
})