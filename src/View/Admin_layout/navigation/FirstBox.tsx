import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const FirstBox = () => {
  return (
    <View style={styles.container}>
      <Text>FirstBox</Text>
    </View>
  )
}

export default FirstBox

const styles = StyleSheet.create({
    container:{
        width:300,
        height:300,
        backgroundColor:'blue'
    }
})