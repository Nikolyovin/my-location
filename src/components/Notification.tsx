import { Modal, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { FC } from 'react'
import { useAppSelector } from '../hooks/redux'
import { useActions } from '../hooks/action'
import { FontAwesome5 } from '@expo/vector-icons'
import NotificationSuccess from './NotificationSuccess'
import NotificationError from './NotificationError'

const Notification: FC = () => {
    const { isNotification } = useAppSelector(state => state.app)
    const { isShowNotification } = useActions()

    return (
        <View style={styles.centeredView} >
            <Modal
                animationType="fade"
                transparent={true}
                visible={isNotification}
                // visible={true}
            >
                <View style={styles.centeredView} >
                    <View style={styles.modalView}>
                        <NotificationSuccess/>
                        {/* <NotificationError/> */}
                        <TouchableOpacity style = { styles.button } onPress = { () => isShowNotification(false) }>
                            <Text style = { styles.textButton }>ОК</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        </View>
    )
}

export default Notification

const styles = StyleSheet.create({
    centeredView: {
        position: 'absolute',
        width: '100%',
        justifyContent: "center",
        alignItems: "center",
        marginTop: '55%',
        // left: '10%',
        // paddingHorizontal: 15,
    },
    modalView: {
        width: '70%',
        maxHeight: 250,
        margin: 20,
        padding: 20,
        backgroundColor: "white",
        borderRadius: 20,
        paddingHorizontal: 15,
        textAlign: "center",
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
    },
    button:{
        backgroundColor: "#00c68f",
        marginTop: 10,
        padding: 9.5,
        borderRadius: 15,
        marginRight: 5,
    },
    textButton: {
        color: 'white'
    }
})