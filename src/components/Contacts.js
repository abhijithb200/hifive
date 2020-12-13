import React,{useEffect,useState} from 'react'
import { StyleSheet, Text, View ,FlatList,Button} from 'react-native'
import * as Cont from 'expo-contacts'

import Frientlist from './Friendlist'
import firestore  from '@react-native-firebase/firestore';


export default function Contacts({route}) {
  const [localContacts,setLocalContacts] = useState([]);
  const [realusers,setRealusers] = useState([]);
  const [displayusers,setDisplayusers] = useState(null);
  
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

  }

    return (
        <View style={{backgroundColor:'black',height:'100%'}}>
          <Button title="click" onPress={()=>getrealusers()}/>
          {
            displayusers!= null &&  <FlatList
            
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
