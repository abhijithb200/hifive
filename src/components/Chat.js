import React, { useState ,useEffect,useRef} from 'react'
import { StyleSheet, Text, View ,StatusBar,Image,BackHandler} from 'react-native'
import { AntDesign } from '@expo/vector-icons';
import user_number from '../../assets/user_number'

import firestore  from '@react-native-firebase/firestore';


export default function Chat({navigation,route}) {
    const [screennum,setScreennum] = useState();
    const [counter,setCounter] = useState(3);
    const [hasProximity,setHasProximity] = useState(false);

    const status = useRef()
    useEffect(() => {
            firestore().collection('users').doc(route.params.number).onSnapshot(snapshot=>{
                setScreennum(snapshot.data().onscreen)
            })
            BackHandler.addEventListener('hardwareBackPress', goooBack);
            return ()=>{
                BackHandler.removeEventListener('hardwareBackPress', goooBack);
            }
            
    }, [])
    // const callback =({proximity})=>setHasProximity(!!proximity)
    const countdown=()=>{
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
        }else if(counter < 0 && counter > -4){
            
            // Proximity.addListener(callback);
            return(
                <View>
                    <Text style={{color:'white'}}>{hasProximity? 'true':'false'}</Text>
                
                </View>
            )
            
        }else if(counter < -5){
        //    Proximity.removeListener(callback);
        }
      
    }
    const goooBack=()=>{
        
        firestore().collection('users').doc(user_number).update({'onscreen':null})
    }
    const gooBack=()=>{
        navigation.goBack();
        firestore().collection('users').doc(user_number).update({'onscreen':null})
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
            </View>
            <View style={{flex:1,alignItems:'center',justifyContent:'center'}}>
           {
               status.current=='onscreen'? countdown() : <AntDesign name="pluscircleo" size={100} color="white" />
           }
            
            </View>

        </View>
    )
}

const styles = StyleSheet.create({})
