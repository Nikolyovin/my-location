import { StyleSheet } from 'react-native'
import React, { FC } from 'react'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { FontAwesome5 } from '@expo/vector-icons'
import emailjs from "emailjs-com"
import { REACT_APP_SERVICE_ID, REACT_APP_TEMPLATE_ID, REACT_APP_USER_ID } from "@env"

interface IProps {
  coordinates: number[]
  description: string
}

const ButtonSendEmail: FC<IProps> = ({ coordinates, description }) => {

  const templateParams = {
    coordinates: `Широта: ${coordinates[0]} Долгота: ${coordinates[1]}`,
    user_email: 'pulya0763@gmail.com',
    description: description
  }

  const sendEmail = () => {
    emailjs.send(
      REACT_APP_SERVICE_ID,
      REACT_APP_TEMPLATE_ID,
      templateParams,
      REACT_APP_USER_ID,
    ).then(
      result => console.log(result.text),
      error => console.log(error.text),
    )
  }

  return (
    <TouchableOpacity  onPress = { sendEmail }>
      <FontAwesome5
        name = { 'envelope-square' }
        // name = { 'circle-envelope' }
        // name = { 'share' }
        // name = { 'paper-plane-top' }

        size = { 40 }
        color = { '#00c68f' }
      />
    </TouchableOpacity>
  )
}

export default ButtonSendEmail

const styles = StyleSheet.create({
  
})