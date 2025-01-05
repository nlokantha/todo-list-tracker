import { Image, Pressable, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useState } from "react";
import Ionicons from "@expo/vector-icons/Ionicons";

const HomeScreen = () => {
  const todos = [];
  const [modalVisible,setModalVisible] = useState(false)
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Pressable style={styles.pressable}>
          <Text style={styles.pressable_text}>All</Text>
        </Pressable>
        <Pressable style={styles.pressable}>
          <Text style={styles.pressable_text}>Work</Text>
        </Pressable>
        <Pressable style={[styles.pressable, { marginRight: "auto" }]}>
          <Text style={styles.pressable_text}>Personal</Text>
        </Pressable>
        <Pressable>
          <Ionicons name="add-circle" size={32} color="#007fff" />
        </Pressable>
      </View>
      <ScrollView style={{flex:1,backgroundColor:"white"}}>
        <View style={{padding:10}}>
          {
            todos?.length > 0 ? (
              <View></View>
            ):(
              <View style={{justifyContent:"center",alignItems:"center",flex:1,marginTop:130,marginHorizontal:"auto"}}>
                <Image source={require("../../../assets/images/post-it.png")} style={styles.image}/>
                <Text>No Task Today ! Add a new Task...</Text>
                <TouchableOpacity style={{padding:10,backgroundColor:"lightblue",marginTop:20,borderRadius:10,paddingHorizontal:30}}>
                  <Text style={{color:"red"}}>Add New Task !</Text>
                </TouchableOpacity>
              </View>
            )
          }
        </View>
      </ScrollView>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    flex: 1,
  },
  header:{
    margin: 10,
    gap: 12,
    flexDirection: "row",
    alignItems: "center",
  },
  pressable: {
    backgroundColor: "#7CB9E8",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 25,
  },
  pressable_text: {
    color: "white",
    textAlign: "center",
  },
  image:{
    width:200,
    height:200,
    resizeMode:"contain"
  }
});
