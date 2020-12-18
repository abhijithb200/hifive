import React,{useEffect,useState} from 'react'
import { StyleSheet, Text, View ,FlatList,TouchableOpacity} from 'react-native'
import * as Cont from 'expo-contacts'
import {useSelector} from 'react-redux'
import Frientlist from './Friendlist'
import firestore  from '@react-native-firebase/firestore';
import { AntDesign } from '@expo/vector-icons'; 

export default function Contacts({route}) {
  const [localContacts,setLocalContacts] = useState([]);
  const [realusers,setRealusers] = useState([]);
  const [displayusers,setDisplayusers] = useState(null);

  const [buttoncli,setButtoncli] = useState(0);
  const [load,setLoad] = useState(false);
  const user_number = useSelector(state => state.user.user)
  
  const [friend,setfriends] = useState()

     useEffect(() => {
    (async () => {
      const { status } = await Cont.requestPermissionsAsync();
      if (status === 'granted') {
        const { data } = await Cont.getContactsAsync();

        if (data.length > 0) {
          const contact = data;
          var contactarr = [];
          contact.map(con=>{
            if(con.phoneNumbers != null){
              var numb = con.phoneNumbers[0].number;
              var num = numb.replace(/ /g,'');
              var nu = num.replace(/-/g,'');
              if(nu.length>10){
                var n = nu.slice(nu.length - 10);
              }else{
                var n = nu
              }
              contactarr.push({
                name:con.name,
                number:n
              })
            }
            
          })
          setLocalContacts(contactarr)
        }
      }
    })();
  
  }, []);
  const getrealusers= ()=>{
    setButtoncli(buttoncli+1)
    if(buttoncli>=1){
      var realusersarr = [];
  firestore().collection('users').onSnapshot(snapshot=>{
    snapshot.docs.map(doc=>{
      realusersarr.push(doc.id)
      
    })
  })
  setRealusers(realusersarr)
  var displayusersarr = [];
    localContacts.map(con=>{
      realusers.map(rel=>{
        if(rel===con.number){
          displayusersarr.push({
            name:con.name,
            number:con.number
          })
        }
      })
    })
  
     setDisplayusers(displayusersarr)
     
    } if(buttoncli>1){
      setLoad(true)
    }
    
  }

    return (
     
        <View style={{backgroundColor:'black',height:'100%'}}>
           {!load ?
              <TouchableOpacity onPress={()=>getrealusers() } style={{flex:1,justifyContent:'center',alignItems:'center'}}>
            <View>
            <AntDesign name="reload1" size={46} color="white" />   
            </View>
            
          </TouchableOpacity> : null
      }
         
          {
            displayusers &&  <FlatList
            
            data={displayusers}
            renderItem={({item})=>{
              return(
                <View>
                  <Frientlist name={item.name} number={item.number} add={true}/>
                  </View>
              )
            }}
            keyExtractor = {item => item.id}
            />
          }
           

        </View>
    )
}

const styles = StyleSheet.create({})
