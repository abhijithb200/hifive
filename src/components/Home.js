import React,{useState,useEffect} from 'react'
import { StyleSheet, FlatList, View ,TouchableOpacity} from 'react-native'
import Frientlist from './Friendlist'
import firestore  from '@react-native-firebase/firestore';
import {useSelector} from 'react-redux'

export default function Home({navigation}) {
    const user_number = useSelector(state => state.user.user)
    const [friend,setfriends] = useState()
    useEffect(() => {
       firestore().collection('users').doc(user_number).collection('friend').onSnapshot(snapshot=>{
        setfriends(snapshot.docs?.map(doc=>{
            return(
                {
                    name:doc.data().contactname,
                    number:doc.id
                }
            )
        }))    
       })
       
    }, [])
    const navigatehandler=(name,num)=>{
        firestore().collection('users').doc(user_number).set({
            onscreen:num
        })
        navigation.navigate('Chat',{name:name,number:num})
    }
    return (
        <View style={{backgroundColor:'black',height:'100%'}}>
            <FlatList 
            data={friend}
            renderItem={({item})=>{
                return(
                <TouchableOpacity onPress={()=>navigatehandler(item.name,item.number)}>
                    <Frientlist name={item.name} add={false}/>
                </TouchableOpacity>
                )
            }}
            keyExtractor = {item => item.number}
            />
          
            
        </View>
    )
}

const styles = StyleSheet.create({})
