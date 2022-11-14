import { FlatList, StyleSheet, Text, View } from 'react-native'
import React, { FC } from 'react'
import Card from './Card'
import { useAppSelector } from '../hooks/redux'

const Cards: FC = () => {
    const { locations } = useAppSelector(state => state.app )

    return (
        <View style={styles.cardsWrap}>
            <FlatList 
                style={styles.cardsList}
                keyExtractor={item => item.description}
                data={locations}
                renderItem={({ item }) =>
                    <Card
                        coordinates = { item.coordinates }
                        description = { item.description }
                    />
                }
            />


        </View>
    )
}

export default Cards

const styles = StyleSheet.create({
    cardsWrap: {
        paddingTop: 15,
        width: '100%',
        alignItems: 'center'
    },
    cardsList: {

    }
})