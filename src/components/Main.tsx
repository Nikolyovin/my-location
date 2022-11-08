import { StyleSheet, Text, View } from 'react-native'
import React, { FC } from 'react'

const main: FC = () => {
  return (
    <View style={styles.main}>
      <Text>main</Text>
    </View>
  )
}

export default main

const styles = StyleSheet.create({
  main: {
    flex: 1
  }
})