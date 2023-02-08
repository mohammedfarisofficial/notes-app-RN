import {
  View,
  Text,
  Dimensions,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import {COLOR, TextSize} from '../constants';
import {useNavigation} from '@react-navigation/native';
import useDateFormat from '../hooks/useDateFormat';

const Card = ({note}) => {
  const width = Dimensions.get('window').width;
  const formatedDate = useDateFormat(note.time);
  const navigation = useNavigation();
  let height;
  if (note.desc.length < 100) {
    height = 140;
  } else if (note.desc.length < 125) {
    height = 180;
  } else if (note.desc.length < 190) {
    height = 230;
  } else {
    height = 250;
  }
  return (
    <TouchableOpacity onPress={() => navigation.navigate('Note', {note: note})}>
      <View
        style={[
          {
            backgroundColor: COLOR.secondary,
            margin: 2,
            width: width / 2 - 30,
            height: height,
            borderRadius: 20,
            marginBottom: 25,
            overflow: 'hidden',
          },
        ]}>
        <View
          style={{
            width: '100%',
            justifyContent: 'center',
            paddingVertical: 15,
            paddingHorizontal: 10,
          }}>
          <Text style={{...TextSize.h5, color: COLOR.white}} numberOfLines={1}>
            {note.title}
          </Text>
        </View>
        <View
          style={{
            width: '100%',
            height: 20,
            flex: 1,
            paddingHorizontal: 10,
          }}>
          <Text
            style={{...TextSize.h2, color: COLOR.lightGrey, lineHeight: 25}}
            numberOfLines={15}>
            {note.desc}
          </Text>
        </View>
        <View
          style={{
            width: '100%',
            paddingVertical: 15,
          }}>
          <Text style={{paddingLeft: 10, color: COLOR.lightGrey1}}>
            {formatedDate}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default Card;

const styles = StyleSheet.create({
  whiteBox: {
    borderWidth: 0.5,
    borderColor: '#686868',
  },
});
