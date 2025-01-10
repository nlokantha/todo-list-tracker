import { StyleSheet, Text, TouchableOpacity, View } from "react-native"
import React, { useEffect, useState } from "react"
import moment from "moment"
import { Calendar, CalendarList, Agenda } from "react-native-calendars"
import axios from "axios"
import { Feather, FontAwesome } from "@expo/vector-icons"

const CalendarScreen = () => {
  const today = moment().format("YYYY-MM-DD")
  const [selectedDate, setSelectedDate] = useState(today)
  const [todos, setTodos] = useState([])
  const fetchCompletedTodos = async () => {
    try {
      const response = await axios.get(
        `http://192.168.2.70:3000/todos/completed/${selectedDate}`
      )

      const completedTodos = response.data.todos || []
      setTodos(completedTodos)
    } catch (e) {
      console.log(e)
    }
  }
  const handleDayPress = (day) => {
    setSelectedDate(day.dateString)
  }
  useEffect(() => {
    fetchCompletedTodos()
  }, [selectedDate])
  console.log(todos)
  return (
    <View style={{ flex: 1, backgroundColor: "white" }}>
      <Calendar
        onDayPress={handleDayPress}
        markedDates={{
          [selectedDate]: { selected: true, selectedColor: "#7cb9e8" },
        }}
      />
      <View style={{ marginTop: 20, marginHorizontal: 10 }}>
        <Text>Completed Todos</Text>
        {todos &&
          todos.map((item, index) => (
            <TouchableOpacity key={index} style={styles.todosContainer}>
              <FontAwesome name="circle" size={18} color="grey" />
              <Text
                style={[
                  styles.todosText,
                  {
                    textDecorationLine: "line-through",
                    color: "grey",
                  },
                ]}>
                {item?.title}
              </Text>
              <Feather name="flag" size={20} color={"grey"} />
            </TouchableOpacity>
          ))}
      </View>
    </View>
  )
}

export default CalendarScreen

const styles = StyleSheet.create({
  todosContainer: {
    backgroundColor: "lightgrey",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    flexDirection: "row",
    gap: 10,
    alignItems: "center",
    marginTop: 10,
  },
  todosText: {
    fontWeight: "600",
    fontSize: 16,
    flex: 1,
  },
})
