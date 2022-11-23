import { StyleSheet, View } from 'react-native'
import React from 'react'
import { FontAwesome5 } from '@expo/vector-icons'

const IsLoading = () => {
  return (
    <View style = { styles.wrapper }>
      <FontAwesome5
        name = { 'spinner-third' }
        size = { 40 }
        color = { '00c68f' }
      />
    </View>
  )
}

export default IsLoading

const styles = StyleSheet.create({
    wrapper: {
        alignItems: 'center',
        justifyContent: 'center'
    }
})