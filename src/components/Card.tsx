import { AsyncStorage, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { FC, useEffect } from 'react'
import { FontAwesome5 } from '@expo/vector-icons'
import { useActions } from '../hooks/action'

interface IProps {
    coordinates: number[]
    description: string
    id: string
}

const Card: FC<IProps> = ({ coordinates, description, id }) => {
    const { removeLocation } = useActions()
    // const { locations } = useAppSelector(state => state.app)
    const onRemove: () => void = () => {
        removeLocation(id)
    }

    return (
        <View style={styles.cardContainer}>
            <View style={styles.cardWrap}>
                <View style={styles.rightWrap}>
                    <Text style={styles.coordinates}>Широта: {coordinates[0]}</Text>
                    <Text style={styles.coordinates}>Долгота: {coordinates[1]}</Text>
                </View>
                <Text style={styles.description}>{description}</Text>
            </View>
            <View style={styles.iconWrap}>
                <TouchableOpacity onPress={onRemove}>
                    <FontAwesome5
                        name={'trash-alt'}
                        size={25}
                        color={'red'}
                    />
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default Card

const styles = StyleSheet.create({
    cardContainer: {
        alignItems: 'center',
        alignSelf: 'center',
        width: '90%',
    },
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
        borderRadius: 15,
    },
    rightWrap: {
        marginRight: 15
        // flex: 1,
    },
    coordinates: {
        fontSize: 16,
        fontWeight: 'bold'
    },
    description: {
        fontSize: 16,
        flex: 1,
        color: '#757575',
        fontWeight: 'bold'
        // fontFamily: "Cochin"
    },
    iconWrap: {
        position: 'absolute',
        right: 10,
        top: 10,
    }
})