import { Alert, KeyboardAvoidingView, Pressable, SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { FontAwesome, FontAwesome6, MaterialIcons } from '@expo/vector-icons'
import { useRouter } from 'expo-router'
import axios from 'axios'

const RegisterScreen = () => {
  const [name,setName] = useState("")
  const [email,setEmail] = useState("")
  const [password,setPassword] = useState("")
  const router = useRouter()

  const handleRegister = async()=>{
    try{
      const user = {
        name:name,
        email:email,
        password:password
      }

      axios.post("http://192.168.202.187:3000/auth/register",user).then((response)=>{
        console.log(response.data.data)
        Alert.alert("Registration Successfully!")
        setName("")
        setEmail("")
        setPassword("")
      }).catch((error)=>{
        console.log(error)
        Alert.alert("Registration Failed","an error occured")
      })
    }catch(e){
      console.log(e)
    }
  }


  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>ToDo-List Tracker</Text>
      <KeyboardAvoidingView>
        <View style={{alignItems:"center"}}>
          <Text style={{marginTop:20,fontSize:16,fontWeight:"600"}}>Register to your account</Text>
        </View>
        <View>
        <View style={{flexDirection:"row",alignItems:"center",gap:5,borderRadius:10,paddingVertical:5,backgroundColor:"#E0E0E0",marginTop:30}}>
            <FontAwesome style={{marginLeft:10}} name="user" size={24} color="grey" />
            <TextInput style={{color:"grey",width:250}} placeholder='enter your name' value={name} onChangeText={(text)=>setName(text)} />
          </View>
          <View style={{flexDirection:"row",alignItems:"center",gap:5,borderRadius:10,paddingVertical:5,backgroundColor:"#E0E0E0",marginTop:5}}>
            <MaterialIcons style={{marginLeft:10}} name='email' size={24} color="grey"/>
            <TextInput style={{color:"grey",width:250}} placeholder='enter your email' value={email} onChangeText={(text)=>setEmail(text)} />
          </View>
          <View style={{flexDirection:"row",alignItems:"center",gap:5,borderRadius:10,paddingVertical:5,backgroundColor:"#E0E0E0",marginTop:5}}>
          <FontAwesome6 style={{marginLeft:10}} name="unlock" size={24} color="grey" />
            <TextInput style={{color:"grey",width:250}} placeholder='enter your password' value={password} onChangeText={(text)=>setPassword(text)} />
          </View>
        
          <View>
            <TouchableOpacity onPress={handleRegister} style={styles.login}>
              <Text style={styles.loginText}>Register</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.footer}>
            <Text style={{color:"grey"}}>Already have an Account?</Text>
            <Pressable onPress={()=>router.push("/(auth)/login")}>
              <Text style={{color:"grey"}}>Login</Text>
            </Pressable>
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  )
}

export default RegisterScreen

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