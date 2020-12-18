import React,{useState,useEffect} from 'react'
import { StyleSheet, FlatList, View ,TouchableOpacity, Button,Modal,Alert,Text,Image} from 'react-native'
import Frientlist from './Friendlist'
import firestore  from '@react-native-firebase/firestore';
import {useSelector} from 'react-redux'

export default function Home({navigation}) {
    const [modalVisible, setModalVisible] = useState(false);
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
             <Modal
        animationType="slide"
        statusBarTranslucent={true}
        visible={modalVisible}
        onRequestClose={() => {
        setModalVisible(false)
          Alert.alert("Modal has been closed.");
          
        }}
      >
          <View style={{backgroundColor:'#E5E5E5',height:'100%',flex:1,justifyContent:'center',alignItems:'center'}}>
              <Text style={{color:'black',fontSize:60,fontWeight:'bold',paddingBottom:30}}>High Fived!</Text>
              <Image source={require('./../../assets/hifive.png')} style={{width:240,height:230}}/> 
          </View>
      </Modal>
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
          
            <Button title='hi' onPress={()=>setModalVisible(true)}/>
        </View>
    )
}

const styles = StyleSheet.create({})
