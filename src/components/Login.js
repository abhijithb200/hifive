import React, { useState } from 'react';
import { Button, TextInput,StyleSheet,View,Text} from 'react-native';
import auth from '@react-native-firebase/auth';

export default function Login() {
  // If null, no SMS has been sent
  const [confirm, setConfirm] = useState(null);
  const [phonenum,setPhonenum] = useState(null);
  const [code, setCode] = useState('');
  const [errmsg,setErrmsg] = useState('');
  
  // Handle the button press
  async function signInWithPhoneNumber(phoneNumber) {
    if(phoneNumber != null){
      const confirmation = await auth().signInWithPhoneNumber(phoneNumber);
      setConfirm(confirmation);
    }else{
      setErrmsg("Please type the number")
    }
    
  }

  async function confirmCode() {
    try {
      await confirm.confirm(code).then(e=>console.log(e))
    } catch (error) {
      console.log(error);
    }
  }

  if (!confirm) {
    return (
      <View style={{...styles.buttonstyle}}>
        <Text style={{fontSize:30,marginBottom:80,fontWeight:'bold',color:'white'}}>HIGHFIVE</Text>
       
        <Text style={{textAlign:'left',color:'white'}}>Enter your phone number</Text>
        <View style={{flexDirection:'row',alignItems:'center',marginBottom:10}}>
          <Text style={{color:'white'}}>+91</Text>
          <TextInput keyboardType='numeric' style={{borderBottomWidth:1,width:200,borderBottomColor:'white',color:'white'}} value={phonenum} onChangeText={text => setPhonenum(text)}/>
        </View>
        <Text style={{padding:10}}>{errmsg}</Text>
         <Button 
        title="Sign In"
        onPress={() => signInWithPhoneNumber(phonenum)}
        color='#cc6098'
        style={{paddingTop:40}}
      />
        
       
      </View>
     
    );
  }

  return (
    <>
      <TextInput value={code} onChangeText={text => setCode(text)} />
      <Button title="Confirm Code" onPress={() => confirmCode()} />
    </>
  );
}
const styles = StyleSheet.create({
  buttonstyle:{flex:1,
      alignItems:'center',
      justifyContent:'center',
    backgroundColor:'#a8326f'}
})