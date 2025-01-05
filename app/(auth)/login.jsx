import { KeyboardAvoidingView, Pressable, SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { FontAwesome6, MaterialIcons } from '@expo/vector-icons'
import { useRouter } from 'expo-router'
import axios from 'axios'
import AsyncStorage from '@react-native-async-storage/async-storage'

const LoginScreen = () => {
  const [email,setEmail] = useState("")
  const [password,setPassword] = useState("")
  const router = useRouter()
  useEffect(()=>{
    checkLoginStatus()
  },[])
  const checkLoginStatus =async ()=>{
    try{
      const token = await AsyncStorage.getItem("authToken")
      if(token){
        router.replace("/(tabs)/home")
      }
    }catch(e){
      console.log(e)

    }
  }
  const handleLogin = async ()=>{
    try{
      const user = {
        email,password
      }

      await axios.post("http://192.168.202.187:3000/auth/login",user).then((response)=>{
        console.log(response.data)
        setEmail("")
        setPassword("")

        const token = response.data.accessToken
        AsyncStorage.setItem("authToken",token)

        router.replace("/(tabs)/home")
      }).catch((error)=>{
        console.log(error)
      })


    }catch(e){
      console.log("error in handleLogin",e)
    }
  }
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>ToDo-List Tracker</Text>
      <KeyboardAvoidingView>
        <View style={{alignItems:"center"}}>
          <Text style={{marginTop:20,fontSize:16,fontWeight:"600"}}>Log in to your account</Text>
        </View>
        <View>
          <View style={{flexDirection:"row",alignItems:"center",gap:5,borderRadius:10,paddingVertical:5,backgroundColor:"#E0E0E0",marginTop:30}}>
            <MaterialIcons style={{marginLeft:10}} name='email' size={24} color="grey"/>
            <TextInput style={{color:"grey",width:250}} placeholder='enter your email' value={email} onChangeText={(text)=>setEmail(text)} />
          </View>
          <View style={{flexDirection:"row",alignItems:"center",gap:5,borderRadius:10,paddingVertical:5,backgroundColor:"#E0E0E0",marginTop:5}}>
          <FontAwesome6 style={{marginLeft:10}} name="unlock" size={24} color="grey" />
            <TextInput style={{color:"grey",width:250}} placeholder='enter your password' value={password} onChangeText={(text)=>setPassword(text)} />
          </View>
          <View style={{flexDirection:"row",justifyContent:"space-between",marginTop:7,alignContent:"center"}}>
            <Text>Keep me logged in</Text>
            <Text style={{fontWeight:"600",color:"#007fff"}}>forgot password</Text>
          </View>
          <View>
            <TouchableOpacity onPress={handleLogin} style={styles.login}>
              <Text style={styles.loginText}>Login</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.footer}>
            <Text style={{color:"grey"}}>Don't have an Account?</Text>
            <Pressable onPress={()=>router.push("/(auth)/register")}>
              <Text style={{color:"grey"}}>Sign up</Text>
            </Pressable>
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  )
}

export default LoginScreen

const styles = StyleSheet.create({
  container:{
    backgroundColor:"white",
    flex:1,
    alignItems:"center"
  },
  title:{
    fontSize:24,
    color:"#0066b2",
    fontWeight:"600",
    marginTop:80
  },
  login:{
    backgroundColor:"#6699CC",
    paddingVertical:10,
    borderRadius:10,
    marginTop:20
  },
  loginText:{
    textAlign:"center",
    color:"white",
    fontWeight:"bold",
    fontSize:16
  },
  footer:{
    flexDirection:"row",
    gap:5,
    marginTop:20,
    alignItems:"center",
    justifyContent:"center"
  }
})