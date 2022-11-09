import { StyleSheet, Text, View } from 'react-native'
import React, { FC } from 'react'

const Card: FC = () => {
    return (
        <View style={styles.cardWrap}>
            <View style={styles.rightWrap}>
                <Text style={styles.textRight}>Ширина: 56.687697</Text>
                <Text style={styles.textRight}>Долгота: 56.687697</Text>
            </View>
            <View style={styles.leftWrap}>
                {/* <Text style={styles.description}>Описание:</Text> */}
                <Text style={styles.description}>схрон рязанок</Text>
            </View>
        </View>
    )
}

export default Card

const styles = StyleSheet.create({
    cardWrap: {
        backgroundColor: '#ffffff',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingVertical: 10,
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

    }
})