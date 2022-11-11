import {Modal, StyleSheet, View, Text, TouchableOpacity, TextInput,} from 'react-native'
import ButtonClose from './ButtonClose'
import React, { FC, useState } from 'react'
import * as Location from 'expo-location';

const ModalAdd: FC = () => {
  const [coordinates, setСoordinates] = useState<number[] | null>(null)
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  console.log('coordinates:', coordinates);

  const onButtonGetLocation = () => {
      (async () => {

          let { status } = await Location.requestForegroundPermissionsAsync();
          if (status !== 'granted') {
              setErrorMsg('Permission to access location was denied');
              return
          }

          let location = await Location.getCurrentPositionAsync({});
          const coordinates = [location.coords.latitude, location.coords.longitude]
          setСoordinates(coordinates)
      })()

  }

  const onButtonPoint = () => {

  }

  let text = 'Waiting..'
  if (errorMsg) {
      text = errorMsg;
  } else if (coordinates) {
      text = JSON.stringify(coordinates)
  }

  return (
    <View style = { styles.centeredView } >
      <Modal
        animationType="fade"
        transparent={true}
        visible={true}
        // onShow={onShow}
      >
        <View style = { styles.centeredView } >
          <View style={styles.modalView}>
          <Text style = { styles.textInput }>Создание контрольной точки:</Text>
            {/* <ModalError /> */}
            {
              !coordinates &&  
                <TouchableOpacity style = { styles.buttonGetLocation } onPress = { onButtonGetLocation }>
                  <Text style = { styles.textButton }>Получить координаты</Text>
                </TouchableOpacity>
            }
            {  
              coordinates &&
              <>
                <Text style = { styles.text }>Широта: { coordinates[ 0 ] }</Text>
                <Text style = { styles.text }>Долгота: { coordinates[ 1 ] }</Text>
              </>
            }
            <Text style = { styles.textInput }>Описание:</Text>
            <TextInput style = { styles.input }
              multiline={true}
              numberOfLines={3}
            />
            <TouchableOpacity style = { styles.buttonPoint } onPress = { onButtonPoint }>
              <Text style = { styles.textButton }>Добавить</Text>
            </TouchableOpacity>
            <View style={styles.buttonClose} >
              <ButtonClose  />
            </View>
          </View>
        </View>
      </Modal>   
    </View>
  )
}

export default ModalAdd

const styles = StyleSheet.create({
  centeredView: {
    position: 'absolute',
    width: '100%',
    justifyContent: "center",
    alignItems: "center",
    marginTop: '55%',
    paddingHorizontal: 15,
  },
  modalView: {
    width: '100%',
    height: 280,
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    paddingHorizontal: 15,
    paddingVertical: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  buttonGetLocation: {
    backgroundColor: "#473cff",
    padding: 9.5,
    borderRadius: 15,

  },
  textButton:{
    color: 'white'
  },
  text: {

  },
  textInput: {
    marginTop: 35,
  },
  input:{
    paddingHorizontal: 10,
    width: '100%',
    borderWidth: 2,
    borderColor: '#00a8b8',
    borderRadius: 10,
    justifyContent: 'center',
  },
  buttonPoint:{
    backgroundColor: "#473cff",
    padding: 9.5,
    borderRadius: 15,
  },
  buttonClose: {
    width: 20,
    position: 'absolute',
    right: 15,
    top: 5
  },
})