import { StyleSheet, Text, View } from "react-native"
import React from "react"
import { useLocalSearchParams } from "expo-router"

const InfoPage = () => {
  const { todos } = useLocalSearchParams()
  const todosObject = todos ? JSON.parse(todos) : null
  console.log(todosObject?.title)
  return (
    <View>
      <Text>InfoPage</Text>
    </View>
  )
}

export default InfoPage

const styles = StyleSheet.create({})
