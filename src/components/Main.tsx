import { StyleSheet, Text, View } from 'react-native'
import React, { FC } from 'react'
import Cards from './Cards'

const main: FC = () => {
  return (
    <View style={styles.main}>
      <Cards />
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