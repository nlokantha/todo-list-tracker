import { Dimensions, Image, StyleSheet, Text, View } from "react-native"
import React, { useEffect, useState } from "react"
import axios from "axios"
import { LineChart } from "react-native-chart-kit"
import { AntDesign } from "@expo/vector-icons"

const ProfileScreen = () => {
  const [completedTodos, setCompletedTodos] = useState(0)
  const [pendingTodos, setPendingTodos] = useState(0)

  const fetchTodosData = async () => {
    try {
      const response = await axios.get(
        "http://192.168.2.70:3000/todos/getCount"
      )

      setCompletedTodos(response.data.totalCompletedTodos)
      setPendingTodos(response.data.totalPendingTodos)
    } catch (e) {
      console.log(e)
    }
  }
  useEffect(() => {
    fetchTodosData()
  }, [])
  console.log(completedTodos)
  console.log(pendingTodos)
  return (
    <View style={{ padding: 10, flex: 1, backgroundColor: "white" }}>
      <View style={{ flexDirection: "row", gap: "10" }}>
        <Image
          source={require("../../../assets/images/person.png")}
          style={styles.image}
        />
        <View style={{ flex: 1 }}>
          <Text style={{ fontSize: 16, fontWeight: "600" }}>
            Keep Plans For 15 Days
          </Text>
          <Text>Select Categories</Text>
        </View>
        <AntDesign name="ellipsis1" size={24} color="black" />
      </View>
      <View style={{ marginVertical: 12 }}>
        <Text>Task Overview</Text>
        <View style={styles.boxContainer}>
          <View style={styles.box}>
            <Text style={styles.titleHeader}>{pendingTodos}</Text>
            <Text>Pending Todos</Text>
          </View>
          <View style={styles.box}>
            <Text style={styles.titleHeader}>{completedTodos}</Text>
            <Text>Completed Todos</Text>
          </View>
        </View>
      </View>
      <View style={{ alignItems: "center" }}>
        <LineChart
          data={{
            labels: ["pendingTodos", "completedTodos"],
            datasets: [
              {
                data: [pendingTodos, completedTodos],
              },
            ],
          }}
          width={300} // from react-native
          height={220}
          // yAxisLabel="$"
          // yAxisSuffix="k"
          yAxisInterval={1} // optional, defaults to 1
          chartConfig={{
            backgroundColor: "#e26a00",
            backgroundGradientFrom: "#fb8c00",
            backgroundGradientTo: "#ffa726",
            decimalPlaces: 2, // optional, defaults to 2dp
            color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
            labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
            style: {
              borderRadius: 16,
            },
            propsForDots: {
              r: "6",
              strokeWidth: "2",
              stroke: "#ffa726",
            },
          }}
          bezier
          style={{
            marginVertical: 8,
            borderRadius: 16,
          }}
        />
      </View>
    </View>
  )
}

export default ProfileScreen

const styles = StyleSheet.create({
  image: {
    width: 60,
    height: 60,
    resizeMode: "contains",
    borderRadius: 25,
  },
  boxContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 8,
    gap: 6,
  },
  box: {
    flex: 1,
    backgroundColor: "#89CFF0",
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
  },
  titleHeader: {
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },
})
