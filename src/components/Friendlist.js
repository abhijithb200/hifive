import React,{useState} from 'react'
import { StyleSheet, Text, View,Image ,StatusBar} from 'react-native'
 import { AntDesign } from '@expo/vector-icons';
import firestore  from '@react-native-firebase/firestore';

export default function Frientlist({name,add,number}) {
    const [adds,setAdd] = useState(add);
    
    const addFriends=()=>{
        // FIRST ADD THE VALUE TO THE DATABASE
        firestore().collection('users').doc('8606944241').collection('friend').doc(number).set({
           contactname:name
        }).then(set=>{
            setAdd(false)
        }).catch(err=>{
            console.log('error')
        })
    }
    return (
        <View style={{borderBottomWidth:1,display:'flex',flexDirection:'row',borderBottomColor:'#6C6666',alignItems:'center'}}>
            <View style={{margin:10}}>
            <Image source={require('../../assets/face.webp')} style={{width:60,height:60,borderRadius:100}}/>
            </View>
            <View style={{flexDirection:'row',justifyContent:'space-between',flex:1}}>
                <View>
                <Text style={{color:'white',fontWeight:"bold",fontSize:19}}>{name}</Text>
                </View>
                
                <View>
                {
                    adds && <AntDesign name="adduser"  onPress={()=>addFriends()} size={24} style={{marginRight:20}} color="white" />
                }
                    </View>   
            </View>

          
        </View>
    )
}

const styles = StyleSheet.create({})
