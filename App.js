
import React,{useState,useEffect} from 'react';
import { StatusBar, Text, TextBase, View } from 'react-native';
import Home from './src/components/Home'
import {createStackNavigator} from '@react-navigation/stack'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { NavigationContainer } from '@react-navigation/native';
import Contacts from './src/components/Contacts';
import Chat from './src/components/Chat';
import firestore  from '@react-native-firebase/firestore';
import user_number from './assets/user_number'


const Stack = createStackNavigator();
const Tabs = createMaterialTopTabNavigator();

const RootHome = ()=>{

  return(
    
    <>
    <View style={{padding:5,backgroundColor:"#4B4B4B"}}>
      
    <Text style={{color:'lightgrey',fontSize:40,textAlign:'center',letterSpacing:8}}>hifive</Text>
    </View>
    
    <Tabs.Navigator style={{}}  tabBarOptions={{
      activeTintColor: 'white',
      labelStyle: { fontSize: 15,fontWeight:'bold' },
      inactiveTintColor: 'gray',
      style: { backgroundColor: '#4B4B4B' },
      showIcon:true,
      
    }} >
      <Tabs.Screen name="Friends" component={Home} />
      <Tabs.Screen name="Contacts" component={Contacts} />
    </Tabs.Navigator>
    </>
  )
}
export default function App() {
  
  return (
      
   
      <NavigationContainer>
        <Stack.Navigator headerMode='none'>
        <Stack.Screen name='Home' component={RootHome}/>
        <Stack.Screen name='Chat' component={Chat}/>
        </Stack.Navigator>
        
      </NavigationContainer>
    

  );
}

