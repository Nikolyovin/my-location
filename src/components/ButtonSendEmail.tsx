import { StyleSheet, Text, View } from 'react-native'
import React, { FC, useRef } from 'react'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { FontAwesome5 } from '@expo/vector-icons'
import emailjs from "emailjs-com"
import { REACT_APP_SERVICE_ID, REACT_APP_TEMPLATE_ID, REACT_APP_USER_ID } from "@env"

interface IProps {
  coordinates: number[]
  description: string
}

const ButtonSendEmail: FC<IProps> = ({ coordinates, description }) => {
  const form = useRef()

  const templateParams = {
    coordinates: `Широта: ${coordinates[0]} Долгота: ${coordinates[1]}`,
    user_email: 'pulya0763@gmail.com',
    description: description
  };

  const sendEmail = () => {
    console.log(form.current);
    // e.preventDefault()

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
    <>
      <TouchableOpacity onPress={sendEmail}>
        <FontAwesome5
          name={'envelope-square'}
          size={40}
          color={'#00c68f'}
        />
      </TouchableOpacity>
      <View>
        {/* <form style={styles.form} ref={form}>
          <label>Name</label>
          <input defaultValue={`Широта: ${coordinates[0]} Долгота: ${coordinates[1]}`} type='text' name='coordinates' required />
          <label>Email</label>
          <input defaultValue='pulya0763@gmail.com' type='email' name='user_email' required />
          <label>Message</label>
          <textarea defaultValue={description} name='description' required />
          <label>Name</label>
          <input type='submit' value='Send' required />
        </form> */}
      </View>
    </>
  )
}

export default ButtonSendEmail

const styles = StyleSheet.create({
  form: {
    display: 'none'
  }
})