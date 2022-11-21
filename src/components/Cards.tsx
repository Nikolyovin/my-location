import { StyleSheet, Text, View } from 'react-native'
import React, { FC, useRef } from 'react'
import Card from './Card'
import { useAppSelector } from '../hooks/redux'
import { ScrollView } from 'react-native-gesture-handler'

const Cards: FC = () => {
    const { locations } = useAppSelector(state => state.app)
    console.log('locations', locations);

    const scrollRef = useRef(null)                        //needed to resolve the conflict with reanimated and ScrollView

    return (
        <ScrollView ref={scrollRef} style={styles.cardsWrap}>

            {locations.map(item => (
                <Card
                    key={item.id}
                    id={item.id}
                    simultaneousHandlers={scrollRef}
                    coordinates={item.coordinates}
                    description={item.description}
                />)
            )}


        </ScrollView>
    )
}

export default Cards

const styles = StyleSheet.create({
    cardsWrap: {
        flex: 1,
        paddingTop: 15,
        width: '100%',
        // alignItems: 'center'
    },
    cardsList: {

    }
})