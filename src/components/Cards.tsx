import { StyleSheet, Text, View } from 'react-native'
import React, { FC } from 'react'
import Card from './Card'

const Cards: FC = () => {
    return (
        <View style={styles.cardsWrap}>
            <Card />
            <Card />
            <Card />
        </View>
    )
}

export default Cards

const styles = StyleSheet.create({
    cardsWrap: {
        paddingTop: 15,
        width: '100%',
        alignItems: 'center'
    }
})