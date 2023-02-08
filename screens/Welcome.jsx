import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import React, {useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {COLOR, TextSize} from '../constants';

const Welcome = ({onFinish}) => {
  const [name, setName] = useState('');

  const handleSubmit = async () => {
    const user = {name: name};
    await AsyncStorage.setItem('user', JSON.stringify(user));
    if (onFinish) onFinish();
  };
  return (
    <KeyboardAvoidingView
      style={{flex: 1}}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <View style={{flex: 1, backgroundColor: COLOR.primary}}>
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <View style={{justifyContent: 'center', alignItems: 'center'}}>
            <Text
              style={{...TextSize.h1, color: COLOR.white, marginBottom: 15}}>
              Daily Notes
            </Text>
            <Text
              style={{...TextSize.h2, color: COLOR.lightGrey, marginBottom: 8}}>
              Take notes,reminders,set target.
            </Text>
            <Text style={{...TextSize.h2, color: COLOR.lightGrey}}>
              collect resources, and secure privacy
            </Text>
          </View>
          <TextInput
            placeholder="Enter your nick name.."
            onChangeText={text => setName(text)}
            style={{
              width: 300,
              height: 50,
              backgroundColor: COLOR.secondary,
              borderRadius: 20,
              marginVertical: 20,
              paddingLeft: 20,
              ...TextSize.h2,
              color: COLOR.white,
            }}
          />
          <TouchableOpacity
            onPress={handleSubmit}
            style={{
              width: 120,
              height: 50,
              backgroundColor: COLOR.ligthViolet,
              borderRadius: 50,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text
              style={{
                ...TextSize.h3,
                color: name.trim().length > 3 ? COLOR.white : COLOR.lightGrey,
              }}>
              Ok
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

export default Welcome;
