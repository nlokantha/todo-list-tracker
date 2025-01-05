import {
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import Ionicons from "@expo/vector-icons/Ionicons";
import { BottomModal,ModalContent,ModalTitle,SlideAnimation } from "react-native-modals";
import axios from "axios";
import Entypo from '@expo/vector-icons/Entypo';


const HomeScreen = () => {
  // const todos = [];
  const [todos,setTodos]= useState([])
  const [modalVisible, setModalVisible] = useState(false);
  const [todo,setTodo] = useState("")
  const [category,setCategory] = useState("All")
  const suggestions = [
    {
      id: "1",
      todo: "drink water"
    },
    {
      id: "2",
      todo: "exercise for 30 minutes"
    },
    {
      id: "3",
      todo: "read a book"
    },
    {
      id: "4",
      todo: "practice coding"
    },
    {
      id: "5",
      todo: "meditate"
    }
  ]

  useEffect(()=>{
    fetchTodos()
  },[])

  const handleAddTodo = async() =>{
    try{
      const todoData = {
        title:todo,
        category:category
      }
      axios.post("http://192.168.202.187:3000/todos/create/67795a153164bcf53c5ebbe2",todoData).then((response)=>{
        console.log(response)
      }).catch((error)=>{
        console.log(error)
      })

      setModalVisible(false)
      setTodo("")
    }catch(e){
      console.log("error",e)
    }
  }
  const fetchTodos = async() =>{
    try{
      const response = await axios.get("http://192.168.202.187:3000/auth/get/67795a153164bcf53c5ebbe2");
      console.log(response.data.todos);
      setTodos(response.data.todos)
    }catch(e){
      console.log(e)
    }
  }


  return (
    <>
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
          <Pressable onPress={()=>setModalVisible(!modalVisible)}>
            <Ionicons name="add-circle" size={32} color="#007fff" />
          </Pressable>
        </View>
        <ScrollView style={{ flex: 1, backgroundColor: "white" }}>
          <View style={{ padding: 10,flex:1 }}>
            {todos?.length > 0 ? (
              <View>
                {
                  todos && todos.map((item,index)=>(
                    <View key={index} style={styles.todosContainer}>
                      <Entypo name="circle" size={24} color="black" />
                      <Text style={styles.todosText}>{item.title}</Text>
                      </View>
                  ))
                }
              </View>
            ) : (
              <View
                style={{
                  justifyContent: "center",
                  alignItems: "center",
                  flex: 1,
                  marginTop: 130,
                  marginHorizontal: "auto",
                }}
              >
                <Image
                  source={require("../../../assets/images/post-it.png")}
                  style={styles.image}
                />
                <Text>No Task Today ! Add a new Task...</Text>
                <TouchableOpacity
                onPress={()=>setModalVisible(!modalVisible)}
                  style={{
                    padding: 10,
                    backgroundColor: "lightblue",
                    marginTop: 20,
                    borderRadius: 10,
                    paddingHorizontal: 30,
                  }}
                >
                  <Text style={{ color: "red" }}>Add New Task !</Text>
                </TouchableOpacity>
              </View>
            )}
          </View>
        </ScrollView>
      </View>
      <BottomModal
        onBackdropPress={() => setModalVisible(!modalVisible)}
        onHardwareBackPress={() => setModalVisible(!modalVisible)}
        swipeDirection={["up","down"]}
        swipeThreshold={200}
        modalTitle={<ModalTitle title="Add A Todo"/>}
        modalAnimation={
          new SlideAnimation({
            slideFrom: 'bottom', // optional
          })
        }
        visible={modalVisible}
        onTouchOutside = {()=>{setModalVisible(!modalVisible)}}
        >
          <ModalContent style={{width:"100%",height:280}}>
            <View style={styles.modalContainer}>
              <TextInput style={styles.modalInput} value={todo} onChangeText={(text)=>setTodo(text)} placeholder="Input a new task"/>
              <Ionicons onPress={handleAddTodo} name="send" size={24} color="#007FFF" />
            </View>
            <Text style={{fontWeight:"600"}}>Choose Category</Text>
            <View style={styles.category}>
              <Pressable onPress={()=>setCategory("Work")}  style={[styles.categoryItems,{backgroundColor: category === "Work" ? "black":"white"}]}>
                <Text style={{color: category !== "Work" ? "black":"white"}}>Work</Text>
              </Pressable>
              <Pressable onPress={()=>setCategory("Personal")} style={[styles.categoryItems,{backgroundColor: category === "Personal" ? "black":"white"}]}>
                <Text style={{color: category !== "Personal" ? "black":"white"}}>Personal</Text>
              </Pressable>
              <Pressable onPress={()=>setCategory("WishList")} style={[styles.categoryItems,{backgroundColor: category === "WishList" ? "black":"white"}]}>
                <Text style={{color: category !== "WishList" ? "black":"white"}}>WishList</Text>
              </Pressable>
            </View>
            <Text style={{fontWeight:"600"}}>Some Suggestions</Text>
            <View style={styles.suggestionContainer}>
              {
                suggestions.map((item,index)=>(
                  <Pressable onPress={()=>setTodo(item?.todo)} style={styles.suggestionItems} key={item.id}>
                    <Text style={{textAlign:"center"}}>{item?.todo}</Text>
                  </Pressable>
                ))
              }
            </View>
          </ModalContent>
      </BottomModal>
    </>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    flex: 1,
  },
  header: {
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
  image: {
    width: 200,
    height: 200,
    resizeMode: "contain",
  },
  modalContainer:{
    flexDirection:"row",alignItems:"center",gap:12,marginVertical:10
  },
  modalInput:{
    padding:10,borderColor:"#E0E0E0",borderWidth:1,borderRadius:5,flex:1
  },
  category:{
    flexDirection:"row",
    gap:10,
    alignItems:"center",
    marginVertical:10
  },
  categoryItems:{
    borderColor:"#E0E0E0",borderWidth:1,borderRadius:25,paddingHorizontal:10,paddingVertical:4
  },
  suggestionContainer:{
    flexDirection:"row",
    flexWrap:"wrap",
    marginVertical:10,
    alignItems:"center",
    gap:10
  },
  suggestionItems:{
    backgroundColor:"#F0F8FF",
    borderRadius:25,
    paddingHorizontal:10,
    paddingVertical:4
  },
  todosContainer:{
    backgroundColor:"lightgrey",
    paddingVertical:10,
    paddingHorizontal:20,
    borderRadius:10,
    flexDirection:"row",
    gap:10,
    alignItems:"center",
    marginBottom:10
  },
  todosText:{
    fontWeight:"600",
    fontSize:18,
    flex:1,
    textAlign:"center"

  }
});
