import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react';
// import * as Location from 'expo-location';
import { useActions } from '../hooks/action';

const Footer = () => {
    const { iShowModal } = useActions()

    const onShowModal = () => {
        iShowModal(true)
    }

    return (
        <View style={styles.buttonWrap}>
            <TouchableOpacity style={styles.button} onPress={onShowModal}>
                <Text style={styles.buttonAddText}>Отправить на почту</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.buttonAdd} onPress={onShowModal}>
                <Text style={styles.buttonAddText}>+</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={onShowModal}>
                <Text style={styles.buttonAddText}>Удалить всё</Text>
            </TouchableOpacity>
        </View>
    )
}

export default Footer

const styles = StyleSheet.create({
    buttonWrap: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        // alignItems: 'flex-start',
        paddingHorizontal: 25,
        paddingBottom: 30
    },
    button: {
        // backgroundColor: '#00c68f',
        backgroundColor: 'red',
        // width: '100%',
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 15
    },
    buttonAdd: {
        backgroundColor: '#00c68f',
        width: 50,
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 50
    },
    buttonAddText: {
        color: 'white',
    }
})