import { StyleSheet, Text, View } from 'react-native'
import React, { FC } from 'react'
import Cards from './Cards'
import ModalAdd from './ModalAdd'

const main: FC = () => {
  return (
    <View style={styles.main}>
      <Cards />
      <ModalAdd/>
    </View>
  )
}

export default main

const styles = StyleSheet.create({
  main: {
    flex: 1,
    width: '100%'
  }
})