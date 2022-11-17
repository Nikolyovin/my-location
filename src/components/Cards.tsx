import { StyleSheet, Text, View } from 'react-native'
import React, { FC } from 'react'
import Card from './Card'
import { useAppSelector } from '../hooks/redux'
import { ScrollView } from 'react-native-gesture-handler'

const Cards: FC = () => {
    const { locations } = useAppSelector(state => state.app)
    console.log('locations', locations);

    return (
        <ScrollView style={styles.cardsWrap}>
            {/* <FlatList
                style={styles.cardsList}
                keyExtractor={item => item.description}
                data={locations}
                renderItem={({ item }) =>
                    <Card
                        coordinates={item.coordinates}
                        description={item.description}
                    />

                }
            /> */}
            {locations.map(item => <Card coordinates={item.coordinates} description={item.description} ></Card>)}


        </ScrollView>
    )
}

export default Cards

const styles = StyleSheet.create({
    cardsWrap: {
        paddingTop: 15,
        width: '100%',
        // alignItems: 'center'
    },
    cardsList: {

    }
})