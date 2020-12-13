
import React from 'react';
import { StatusBar, Text, TextBase, View } from 'react-native';
import Home from './src/components/Home'
import {createStackNavigator} from '@react-navigation/stack'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { NavigationContainer } from '@react-navigation/native';
import Contacts from './src/components/Contacts';
import Chat from './src/components/Chat';



const Stack = createStackNavigator();
const Tabs = createMaterialTopTabNavigator();

const RootHome = ()=>{
  return(
    <Tabs.Navigator style={{marginTop:StatusBar.currentHeight,}}  tabBarOptions={{
      activeTintColor: 'white',
      labelStyle: { fontSize: 15,fontWeight:'bold' },
      inactiveTintColor: 'gray',
      style: { backgroundColor: '#4B4B4B' },
      showIcon:true,
      
    }} >
      <Tabs.Screen name="Friends" component={Home}/>
      <Tabs.Screen name="Contacts" component={Contacts}/>
    </Tabs.Navigator>
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

