import { StyleSheet, Text, View } from "react-native"
import React, { useState } from "react"
import moment from "moment"
import { Calendar, CalendarList, Agenda } from "react-native-calendars"

const CalendarScreen = () => {
  const today = moment().format("YYYY-MM-DD")
  const [selectedDate, setSelectedDate] = useState(today)
  return (
    <View style={{ flex: 1, backgroundColor: "white" }}>
      <Calendar
        onDayPress={(day) => {
          console.log("selected day", day)
        }}
      />
    </View>
  )
}

export default CalendarScreen

const styles = StyleSheet.create({})
