import { StyleSheet, Text, View } from 'react-native'
import React, { FC } from 'react'
import ButtonClose from './ButtonClose'

interface IProps{
    coordinates: number[]
    description: string
}

const Card: FC<IProps> = ( { coordinates, description }) => {
    return (
        <View style={styles.cardWrap}>
            <View style={styles.rightWrap}>
                <Text style={styles.textRight}>Ширина: { coordinates[0] }</Text>
                <Text style={styles.textRight}>Долгота: { coordinates[1] }</Text>
            </View>
            <View style={styles.leftWrap}>
                {/* <Text style={styles.description}>Описание:</Text> */}
                <Text style={styles.description}>{ description }</Text>
            </View>
            <View style={styles.button} >
                <ButtonClose />
            </View>
        </View>
    )
}

export default Card

const styles = StyleSheet.create({
    cardWrap: {
        backgroundColor: '#dafaf0',
        opacity: 0.8,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 30,
        paddingVertical: 20,
        marginBottom: 10,
        width: '90%',
        borderRadius: 15,
    },
    rightWrap: {
        // flex: 1,
    },
    textRight: {

    },
    leftWrap: {

    },
    description: {

    },
    button: {
        position: 'absolute',
        right: 15,
        top: 5
    }
})