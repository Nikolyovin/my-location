import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { FC, useState } from 'react';
import { useActions } from '../hooks/action';
import { useAppSelector } from '../hooks/redux';
import { REACT_APP_SERVICE_ID, REACT_APP_TEMPLATE_ID, REACT_APP_USER_ID } from "@env"
import emailjs from "emailjs-com"
import { ILokations } from '../models/models';

const Footer: FC = () => {
    const { iShowModal, setLocations, isShowLoading, isShowNotification, isShowNotificationError } = useActions()
    const { locations, isLoading } = useAppSelector(state => state.app)

    const onShowModal: () => void = () => {
        iShowModal(true)
    }

    const removeAll: () => void = () => {
        setLocations([])
    }

    const templateParams = {
        body: locations.map(item => `Широта: ${ item.coordinates[0] } Долгота: ${ item.coordinates[1] } Описание: ${ item.description }`),
        user_email: 'pulya0763@gmail.com',
    }

    const sendEmail: () => void = () => {
        isShowLoading(true)
        
        emailjs.send(
          REACT_APP_SERVICE_ID,
          REACT_APP_TEMPLATE_ID,
          templateParams,
          REACT_APP_USER_ID,
        ).then(
          result => { if (result.status === 200) isShowNotification(true) } ,
          error => isShowNotificationError(true) && isShowNotification(true)
          ,
        )
        isShowLoading(false)
    }

    return (
        <View style = { styles.buttonWrap }>
            <TouchableOpacity style = { styles.button } onPress = { sendEmail }>
                <Text style = { styles.buttonAddText }>Отправить на почту</Text>
            </TouchableOpacity>
            <TouchableOpacity style = { styles.buttonAdd } onPress = { onShowModal }>
                <Text style = { styles.buttonAddText }>+</Text>
            </TouchableOpacity>
            <TouchableOpacity style = { styles.button } onPress = { removeAll }>
                <Text style = { styles.buttonAddText }>Удалить всё</Text>
            </TouchableOpacity>
        </View>
    )
}

export default Footer

const styles = StyleSheet.create({
    buttonWrap: {
        flexDirection: 'row',
        justifyContent: 'space-between',
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