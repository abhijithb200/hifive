import React, { useState } from 'react';
import { Button, TextInput,StyleSheet,View,Text,Image,ActivityIndicator} from 'react-native';
import auth from '@react-native-firebase/auth';
import { TouchableOpacity } from 'react-native-gesture-handler';

export default function Login() {
  // If null, no SMS has been sent
  const [confirm, setConfirm] = useState(null);
  const [phonenum,setPhonenum] = useState(null);
  const [code, setCode] = useState('');
  const [errmsg,setErrmsg] = useState('');
  const [clicked,setClicked] = useState(false);
  
  // Handle the button press
  async function signInWithPhoneNumber(phoneNumber) {
    
    if(phoneNumber != null){
      setClicked(true)
      const confirmation = await auth().signInWithPhoneNumber('+91'+phoneNumber).catch(err=>setClicked(false))
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
      setClicked(false)
    }
  }

  if (!confirm) {
    return (
      <View style={{...styles.buttonstyle}}>
      <Image source={require('./../../assets/logiinlogo.png')} style={{width:300,height:120}}/>       
        <Text style={{textAlign:'left',color:'black',marginTop:30}}>Enter your phone number</Text>
        <View style={{flexDirection:'row',alignItems:'center',marginBottom:10}}>
          <Text style={{color:'black'}}>+91</Text>
          <TextInput keyboardType='numeric' style={{borderBottomWidth:1,width:200,borderBottomColor:'black',color:'black'}} value={phonenum} onChangeText={text => setPhonenum(text)}/>
        </View>
        <Text style={{padding:10,color:'red'}}>{errmsg}</Text>
        
      <TouchableOpacity onPress={() => signInWithPhoneNumber(phonenum)}>
        <View style={{backgroundColor:'#F5395B',width:200,height:50,elevation:1}}>
          {
            !clicked? <Text style={{color:'white',fontWeight:'bold',fontSize:25,textAlign:'center',marginTop:4}}>Sign in</Text> : <> 
            <View style={{marginTop:4}}>
            <ActivityIndicator size="large"  color='white'/>
            </View>
            </>
          }
       
        </View>
      
      </TouchableOpacity>
        
       
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
    backgroundColor:'#F7F7F7'}
})