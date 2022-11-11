import { Modal, StyleSheet, View, AsyncStorage, Alert, Text, TouchableOpacity, TextInput } from 'react-native'
import ButtonClose from '../../assets/close.png'
import React, { FC } from 'react'

const ModalAdd: FC = () => {
  return (
    <View style = { styles.centeredView } >
      <Modal
        animationType="fade"
        transparent={true}
        visible={true}
        // onShow={onShow}
      >
        <View style={styles.modalView}>
            {/* <ModalError /> */}
            <Text> modal</Text>
            
            <View style={styles.buttonClose} >
              <ButtonClose  />
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
    marginTop: '60%',
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
  buttonClose: {
    width: 20,
    position: 'absolute',
    right: 15,
    top: 5
  },
})