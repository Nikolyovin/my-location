import { Dimensions, StyleSheet, Text, View } from 'react-native'
import React, { FC } from 'react'
import ButtonClose from './ButtonClose'
import { PanGestureHandler, PanGestureHandlerGestureEvent } from 'react-native-gesture-handler'
import Animated, { useAnimatedGestureHandler, useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated'
import { FontAwesome5 } from '@expo/vector-icons'

interface IProps{
    coordinates: number[]
    description: string
}

const Card: FC<IProps> = ({ coordinates, description }) => {
    //need for swipe
    const {width: SCREEN_WIDTH} = Dimensions.get('window')
    const TRANSATE_X_THRESHOLD = SCREEN_WIDTH* .3
    const translatesX = useSharedValue(0)

    const panGesture = useAnimatedGestureHandler<PanGestureHandlerGestureEvent>({
        onActive: (event) => {
            translatesX.value = event.translationX                 //сколько прокручивать будем
        },
        onEnd: () => {
            translatesX.value = withTiming(0)                                 //чтобы после окончания свайпа, объект возвращался обратно withTiming нужен для анимации
        }
    })

    const rStyle = useAnimatedStyle(() => ({
        transform: [{
            translateX: translatesX.value
        }]
    }))

    return (
        <>
            <PanGestureHandler onGestureEvent = { panGesture } >                      {/*need for swipe  */}
                <Animated.View style={[ styles.cardWrap, rStyle ]}>                               {/* need for swipe */}
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
                </Animated.View>
            </PanGestureHandler>
            <View style = { styles.iconContainer}>
                <FontAwesome5 
                    name = { 'trash-alt' } 
                    size = { 70*0.4 }
                    color = { 'red' }
                />
            </View>
        </>
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
    },
    iconContainer: {
        height: 70,
        width: 70,
        position: 'absolute',
        right: '10%',
        alignItems: 'center'
    }
})