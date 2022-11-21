import { Modal, StyleSheet, View, Text, TouchableOpacity, TextInput, ActivityIndicator, } from 'react-native'
import React, { FC, useState } from 'react'
import * as Location from 'expo-location';
import { useAppSelector } from '../hooks/redux';
import { useActions } from '../hooks/action';

const ModalAdd: FC = () => {
  const { iSModal } = useAppSelector(state => state.app)
  const { iShowModal, addLocation } = useActions()
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [description, onChangeDescription] = useState<string>('')
  console.log('description', description);
  const { locations } = useAppSelector(state => state.app)
  console.log('locations', locations);

  // for getting locations 
  const [coordinates, setСoordinates] = useState<number[] | null>(null)
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const onButtonGetLocation = () => {

    (async () => {
      setIsLoading(true)
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return
      }

      let location = await Location.getCurrentPositionAsync({});
      const coordinates = [location.coords.latitude, location.coords.longitude]
      setСoordinates(coordinates)
      setIsLoading(false)
    })()
  }

  let text = 'Waiting..'
  if (errorMsg) {
    text = errorMsg;
  } else if (coordinates) {
    text = JSON.stringify(coordinates)
  }

  const cleanModal = () => {
    iShowModal(false)
    setСoordinates(null)
    onChangeDescription('')
  }

  const onPressAdd = () => {
    const id = Date.now().toString()
    addLocation({ coordinates, description, id })
    cleanModal()
  }

  const onPressClose = () => {
    cleanModal()
  }


  return (
    <View style={styles.centeredView} >
      <Modal
        animationType="fade"
        transparent={true}
        visible={iSModal}
      // onShow={onShow}
      >
        <View style={styles.centeredView} >
          <View style={styles.modalView}>
            <Text style={styles.textInput}>Контрольная точка</Text>
            {/* <ModalError /> */}
            {
              !coordinates &&
              <TouchableOpacity style={styles.buttonGetLocation} onPress={onButtonGetLocation}>
                {!isLoading
                  ? <Text style={styles.textButton}>Получить координаты</Text>
                  : <ActivityIndicator size="small" color="white" />
                }
              </TouchableOpacity>
            }
            {
              coordinates &&
              <>
                <Text style={styles.text}>Широта: {coordinates[0]}</Text>
                <Text style={styles.text}>Долгота: {coordinates[1]}</Text>
              </>
            }
            {/* <Text style={styles.textInput}>Описание:</Text> */}
            <TextInput style={styles.input}
              onChangeText={onChangeDescription}
              numberOfLines={2}
              placeholder='Описание'
            />
            <View style={styles.footerModal}>
              <TouchableOpacity style={styles.buttonAdd} onPress={onPressAdd}>
                <Text style={styles.textButton}>Добавить</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.buttonClose} onPress={onPressClose}>
                <Text style={styles.text}>Отменить</Text>
              </TouchableOpacity>
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
    // width: '100%',
    justifyContent: "center",
    alignItems: "center",
    marginTop: '55%',
    left: '10%',
    paddingHorizontal: 15,
  },
  modalView: {
    width: '100%',
    maxHeight: 230,
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    paddingHorizontal: 15,
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
    marginTop: 10,
    backgroundColor: "#00c68f",
    padding: 9.5,
    borderRadius: 15,
    alignItems: 'center',
    minWidth: 200,
  },
  textButton: {
    color: 'white'
  },
  text: {

  },
  textInput: {
    margin: 10,
    fontSize: 22
  },
  input: {
    paddingHorizontal: 10,
    marginVertical: 10,
    width: 200,
    borderWidth: 2,
    borderColor: '#00c68f',
    borderRadius: 10,
    justifyContent: 'center',
  },
  footerModal: {
    flexDirection: 'row',
    paddingBottom: 20,
    justifyContent: 'space-between'
  },
  buttonAdd: {
    backgroundColor: "#00c68f",
    marginTop: 10,
    padding: 9.5,
    borderRadius: 15,
    marginRight: 5,
  },
  buttonClose: {
    borderColor: "#00c68f",
    borderWidth: 2,
    marginTop: 10,
    padding: 9.5,
    borderRadius: 15,
  },
  // buttonClose: {
  //   width: 20,
  //   position: 'absolute',
  //   right: 15,
  //   top: 5
  // },
})