/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
 Button
} from 'react-native';

import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import firestore from '@react-native-firebase/firestore';

const App = () => {
  const add=()=>{
    firestore().collection('Users').doc('test').set({})
  }
  return (
    <>
    <Text>hey</Text>
    <Button title="Click" onPress={add()}/>

    </>
  );
};


export default App;
