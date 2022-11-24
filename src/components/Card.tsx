import { AsyncStorage, Dimensions, StyleSheet, Text, View, Alert } from 'react-native'
import React, { FC, useEffect } from 'react'
import { GestureHandlerRootView, PanGestureHandler, PanGestureHandlerGestureEvent, PanGestureHandlerProps } from 'react-native-gesture-handler'
import Animated, { useAnimatedGestureHandler, useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated'
import { FontAwesome5 } from '@expo/vector-icons'
import ButtonSendEmail from './ButtonSendEmail'
import { useActions } from '../hooks/action'
import { useAppSelector } from '../hooks/redux'

interface IProps extends Pick<PanGestureHandlerProps, 'simultaneousHandlers'> {       //наследуем в типы simultaneousHandlers для того чтобы убрать конфликт со скроллом
    coordinates: number[]
    description: string
    id: string
}

const Card: FC<IProps> = ({ coordinates, description, simultaneousHandlers, id }) => {
    const { removeLocation } = useActions()
    const { locations } = useAppSelector(state => state.app)

    // const remove: () => void = async () => {          //удаление происходит путем апдейта payments
    //     try {
    //         await AsyncStorage.setItem('locations', JSON.stringify(locations))
    //     } catch (err: any) {
    //         Alert.alert(err.message)
    //     }
    // }
    useEffect(() => {
        console.log('locations1', locations)
    }, [locations])

    //need for swipe
    const { width: SCREEN_WIDTH } = Dimensions.get('window')
    const TRANSATE_X_THRESHOLD = -SCREEN_WIDTH * .3
    const translateX = useSharedValue(0)
    const itemHeight = useSharedValue(70)
    const marginVertical = useSharedValue(10) //чтобы margin убирался при удалении
    const opacity = useSharedValue(1)  //чтобы после удаление иконки удалялись

    const panGesture = useAnimatedGestureHandler<PanGestureHandlerGestureEvent>({
        onActive: (event) => {
            translateX.value = event.translationX                 //сколько прокручивать будем
        },
        onEnd: () => {
            const shouldBeDismissed = translateX.value < TRANSATE_X_THRESHOLD
            if (shouldBeDismissed) {
                translateX.value = withTiming(-SCREEN_WIDTH) // действие будет отмененно
                itemHeight.value = withTiming(0)
                marginVertical.value = withTiming(0)
                opacity.value = withTiming(0)
                setTimeout(() => { removeLocation(id) }, 1000);  //need for animation              
            } else {
                translateX.value = withTiming(0)                                 //чтобы после окончания свайпа, объект возвращался обратно withTiming нужен для анимации
            }
            // removeLocation(id)
        },

    })

    //it additional style for animation 
    const rStyle = useAnimatedStyle(() => ({
        transform: [{
            translateX: translateX.value
        }]
    }))

    const rIconContainerStyle = useAnimatedStyle(() => {                //чтобы иконка появлялась плавно при свайпе
        const opacity = withTiming(translateX.value < TRANSATE_X_THRESHOLD ? 1 : 0)
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
        <GestureHandlerRootView>
            <Animated.View style={[styles.cardContainer, rTaskConteinerStyle]}>
                <Animated.View style={[styles.iconContainer, rIconContainerStyle]}>
                    <FontAwesome5
                        name={'trash-alt'}
                        size={40}
                        color={'red'}
                    />
                </Animated.View>
                <PanGestureHandler
                    simultaneousHandlers={simultaneousHandlers}
                    onGestureEvent={panGesture}
                    failOffsetY={[-5, 5]}
                    activeOffsetX={[-5, 5]}
                >
                    <Animated.View style={[styles.cardWrap, rStyle]}>
                        <ButtonSendEmail coordinates={coordinates} description={description} />
                        <View style={styles.rightWrap}>
                            <Text style={styles.textRight}>Широта: {coordinates[0]}</Text>
                            <Text style={styles.textRight}>Долгота: {coordinates[1]}</Text>
                        </View>
                        <View style={styles.leftWrap}>
                            <Text style={styles.description}>{description}</Text>
                        </View>
                    </Animated.View>
                </PanGestureHandler>
            </Animated.View>
        </GestureHandlerRootView>
    )
}

export default Card

const styles = StyleSheet.create({
    cardContainer: {
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
        // fontFamily: 'Arial, Helvetica, sans-serif',
        fontSize: 16
    },
    leftWrap: {

    },
    description: {
        fontSize: 16,
        // fontFamily: "Cochin"
    },
    iconContainer: {
        height: '100%',
        width: 70,
        top: '25%',
        position: 'absolute',
        right: '10%',
        alignItems: 'center'
    }
})