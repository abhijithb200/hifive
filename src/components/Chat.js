import React, { useState ,useEffect,useRef} from 'react'
import { StyleSheet, Text, View ,ActivityIndicator,Image,BackHandler} from 'react-native'
import { AntDesign } from '@expo/vector-icons';
import {useSelector} from 'react-redux'
import Proximity from 'react-native-proximity';
import firestore  from '@react-native-firebase/firestore';
import axios from 'axios';
import Pusher from 'pusher-js/react-native';
import { FlatList } from 'react-native-gesture-handler';

export default function Chat({navigation,route}) {
     const user_number = useSelector(state => state.user.user)
    const [screennum,setScreennum] = useState();
    const [counter,setCounter] = useState(3);
    
    const [chat,setChat] = useState([]);
    
    const [friendProximity,setfriendProximity] = useState(false);
    const hasProximity = useRef(false);
    const addchat = useRef(false);
    const status = useRef()

    useEffect(() => {
        var pusher = new Pusher('a2145bfefb52497e7fcf', {
            cluster: 'ap2'
          });
          
          var channel = pusher.subscribe('hifive');
          //change parameter to user_number for production
          channel.bind(route.params.number, function(data) {
           setfriendProximity(data.hifivestatus);
          });
         
          return ()=>{
        channel.unbind()
        }
        
    }, [])

    useEffect(() => {
            firestore().collection('users').doc(route.params.number).onSnapshot(snapshot=>{
                setScreennum(snapshot.data().onscreen)
            })
            BackHandler.addEventListener('hardwareBackPress', goooBack);
            return ()=>{
                BackHandler.removeEventListener('hardwareBackPress', goooBack);
            }
    }, [])

    useEffect(() => {
        if(hasProximity.current){
            axios.get(`http://192.168.1.5:9000/hifi/${route.params.number}`).then(data=>{
                console.log(data.data)
            }).catch(err=>console.log(err))
        }
     
    }, [hasProximity.current])
    
        useEffect(() => {
            firestore().collection('users').doc(user_number).collection('friend').doc(route.params.number).collection('message').orderBy('timestamp','desc').onSnapshot(snapshot=>{
                setChat(snapshot.docs.map(doc=>{
                    
                    return([doc.data()]
                        
                    )
                }))
            })
           
        }, [])
    useEffect(() => {
        if(addchat.current == true){
            console.log('hey')
            firestore().collection('users').doc(user_number).collection('friend').doc(route.params.number).collection('message').add({
                status:true,
                timestamp:firestore.FieldValue.serverTimestamp()
            })
        }
    }, [addchat.current])
    const countdown=()=>{
        if( hasProximity.current && friendProximity){
            addchat.current = true;
        }
        const callback =({proximity})=>{
         if(proximity){
             hasProximity.current=true;
         }   
        }
 
        setTimeout(()=>{
            setCounter(counter =>counter-1)
        },2000);
        
        if(counter>0){
            return(
                <View style={{backgroundColor:'white',width:'60%',height:'35%',borderRadius:200}}>
                    <Text numberOfLines={5}  style={{fontSize:40, color:'black',textAlign:'center',marginBottom:'auto',marginTop:'auto'}}>
                            Hifive in <Text style={{fontSize:90}}>{counter}</Text>s
                    </Text>
                </View>
            )
        }else if(counter <=1 && counter > -4){
            
             Proximity.addListener(callback);
       
            return(
                <View>
                    <Text style={{color:'white'}}>{hasProximity.current? 'true':'false'}</Text>

                </View>
            )
            
        }else if(counter <= -5 && hasProximity.current){
            Proximity.removeListener(callback);
            return(
                <View>
                    {
                        // friendProximity == hasProximity.current ? <Text style={{color:'white'}}>SUSSESSFULLY HIFIVED</Text> :<Text style={{color:'white'}}>Someone missed the timing</Text> 
                        //  !friendProximity || counter > -9 ? <ActivityIndicator color='white'/> : friendProximity == hasProximity.current? <><View><Text style={{color:'white'}}>Successfully hifived</Text>  </View></>: <Text style={{color:'white'}}>Friend forget to hifi</Text>                
                        friendProximity ? <Text style={{color:'white'}}>Successfully hifived</Text>  : counter > -9 ? <ActivityIndicator color='white'/> : <Text style={{color:'white'}}>Friend forget to hifi</Text>     
                   }
                </View>
            )
        }else if(!hasProximity.current){
            return(
                <View>
                    <Text style={{color:'white'}}>faalse</Text>

                </View>
            )
            
        }
     
    }
    const goooBack=()=>{
        
        firestore().collection('users').doc(user_number).update({'onscreen':null})
    }
    const gooBack=()=>{
        navigation.goBack();
        firestore().collection('users').doc(user_number).update({'onscreen':null})
    }
    const renderchat=()=>{
        
        return(
            <View>
                <FlatList
                data={chat}
                renderItem={({item})=>{
                    
                    return(
                        <View>
                            <Text style={{color:'white'}} >{item[0].timestamp.seconds}</Text>
                            <Text style={{color:'white'}}>ih</Text>
                        </View>
                    )
                }}/>
            </View>
        )
    }
    return (
        <View style={{backgroundColor:'black',height:'100%',
        overflow:"scroll"}}> 
            <View style={{flexDirection:'row',alignItems:'center',padding:10,backgroundColor:'#6C6666'}}>
            <AntDesign name="back" size={24} color="white" onPress={()=>gooBack()}/>
            <Image source={require('../../assets/face.webp')} style={{width:60,height:60,borderRadius:100,marginLeft:20}}/>
            <View>
            <Text style={{color:'white',marginLeft:10,fontWeight:'bold',fontSize:20}}>{route.params.name}</Text>
            <View style={{flexDirection:"row",alignItems:'center'}}>
            <Text style={{color:'white',marginLeft:10}}>{screennum===user_number ? status.current='onscreen':status.current=null}</Text>
            </View>
            </View>
            <View style={{marginLeft:'auto',paddingRight:10}}>
            {
               status.current!='onscreen' && <AntDesign name="plus" size={30} color="white" />
            }
            </View>
           
            </View>
            <View style={{flex:1,alignItems:'center',justifyContent:'center'}}>
           {
               status.current=='onscreen'? countdown()  : renderchat() 
                
           }

            
            </View>

        </View>
    )
}
//: <AntDesign name="pluscircleo" size={30} color="white" />
const styles = StyleSheet.create({})
