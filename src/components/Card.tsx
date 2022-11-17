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
    const TRANSATE_X_THRESHOLD = -SCREEN_WIDTH* .3
    const translatesX = useSharedValue(0)
    const itemHeight = useSharedValue(70)
    const marginVertical = useSharedValue(10) //чтобы margin убирался при удалении
    const opacity = useSharedValue(1)  //чтобы после удаление иконки удалялись

    const panGesture = useAnimatedGestureHandler<PanGestureHandlerGestureEvent>({
        onActive: (event) => {
            translatesX.value = event.translationX                 //сколько прокручивать будем
        },
        onEnd: () => {
            const shouldBeDismissed = translatesX.value < TRANSATE_X_THRESHOLD
            if (shouldBeDismissed ) {
                translatesX.value = withTiming(-SCREEN_WIDTH) // действие будет отмененно
                itemHeight.value = withTiming(0)
                marginVertical.value = withTiming(0) 
                opacity.value = withTiming(0) 
            } else {
                translatesX.value = withTiming(0)                                 //чтобы после окончания свайпа, объект возвращался обратно withTiming нужен для анимации
            } 
        }
    })

    //it additional style for animation 
    const rStyle = useAnimatedStyle(() => ({
        transform: [{
            translateX: translatesX.value
        }]
    }))

    const rIconContainerStyle = useAnimatedStyle(() => {                //чтобы иконка появлялась плавно при свайпе
        const opacity = withTiming(translatesX.value < TRANSATE_X_THRESHOLD ? 1 : 0)
        return { opacity }
    })

    const rTaskConteinerStyle = useAnimatedStyle(() => {           //чтобы исчезала !! но это не точно
        return {
            height: itemHeight.value,
            marginVertical: marginVertical.value,
            opacity: opacity.value
        }
    })

    return (
        <Animated.View style = {[ styles.cardContainer, rTaskConteinerStyle ]}>
            <Animated.View style = { [ styles.iconContainer, rIconContainerStyle ] }>           // Animated чтобы иконка появлялась плавно при свайпе
                <FontAwesome5 
                    name = { 'trash-alt' } 
                    size = { 70*0.4 }
                    color = { 'red' }
                />
            </Animated.View>
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
            
        </Animated.View>
    )
}

export default Card

const styles = StyleSheet.create({
    cardContainer:{
        width: '100%',
        alignItems: 'center',
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