import React from 'react'
import { Tabs } from 'expo-router'
import { AntDesign, FontAwesome,MaterialCommunityIcons } from '@expo/vector-icons'

export default function _layout() {
  return (
    <Tabs>
      <Tabs.Screen name='home' options={{
        headerShown:false,
        tabBarLabel:'Home',
        tabBarLabelStyle:{color:"#7CB9E8"},
        tabBarIcon:({focused}) => focused ? (
          <FontAwesome name='tasks' color="#7CB9E8"/>
        ):(
          <FontAwesome name='tasks' color="black"/>
        )
      }}/>
      <Tabs.Screen name='calendar' options={{
        headerShown:false,
        tabBarLabel:'Calendar',
        tabBarLabelStyle:{color:"#7CB9E8"},
        tabBarIcon:({focused}) => focused ? (
          <AntDesign name='calendar' color="#7CB9E8"/>
        ):(
          <AntDesign name='calendar' color="black"/>
        )
      }}/>
      <Tabs.Screen name='profile' options={{
        headerShown:false,
        tabBarLabel:'Profile',
        tabBarLabelStyle:{color:"#7CB9E8"},
        tabBarIcon:({focused}) => focused ? (
          <MaterialCommunityIcons name="account-details" size={24} color="#7CB9E8" />
        ):(
          <MaterialCommunityIcons name="account-details" size={24} color="black" />
        )
      }}/>
    </Tabs>
  )
}