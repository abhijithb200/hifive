
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
import store from './src/state/app/store'
import Login from './src/components/Login'
import auth from '@react-native-firebase/auth';
import {Provider,useDispatch} from 'react-redux';
import {setUser} from './src/state/feature/userSlice'

const Stack = createStackNavigator();
const Tabs = createMaterialTopTabNavigator();

const RootHome = ()=>{

  return(
    
    <>
    <View style={{padding:5,backgroundColor:"#4B4B4B"}}>
      
    <Text style={{color:'lightgrey',fontSize:40,textAlign:'center',letterSpacing:8}}>high five</Text>
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
 function AppWrapper() {
  const dispatch = useDispatch();
  const [user,setUuser] = useState(false)
  useEffect(() => {
    auth().onAuthStateChanged(auth=>{
    if(auth.phoneNumber != null){
      // 
      dispatch(setUser('8606944241'))
      setUuser(true)
    }
    })
  }, [])
  return (
      
 
      <NavigationContainer>
        <Stack.Navigator headerMode='none'>
          {!user?<Stack.Screen name='Login' component={Login}/>:  <><Stack.Screen name='Home' component={RootHome}/>
        <Stack.Screen name='Chat' component={Chat}/></>}
      
        </Stack.Navigator>
        
      </NavigationContainer>
    

  );
}

export default function App(){
  
  return(
    <Provider store={store}>
    <AppWrapper/>
    </Provider>
  )
}