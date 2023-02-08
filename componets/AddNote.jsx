import {
  View,
  Text,
  Modal,
  TouchableOpacity,
  Keyboard,
  Dimensions,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import {COLOR} from '../constants';
import GestureRecognizer from 'react-native-swipe-gestures';
import {TextInput} from 'react-native-gesture-handler';
import {TextSize} from '../constants';

const AddNote = ({visible, setIsVisible, onSubmit, note, isEdit}) => {
  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');

  const height = Dimensions.get('window').height;

  useEffect(() => {
    if (isEdit) {
      setTitle(note.title);
      setDesc(note.desc);
    }
  }, [isEdit]);

  const handleSubmit = () => {
    if (!title.trim() && !desc.trim()) {
      setIsVisible(false);
    }
    if (isEdit) {
      onSubmit(title, desc, Date.now());
    } else {
      onSubmit(title, desc);
      setTitle('');
      setDesc('');
    }

    setIsVisible(false);
  };
  const handleModalClose = () => {
    Keyboard.dismiss();
  };
  function swipeDown() {
    Keyboard.dismiss();
    if (!isEdit) {
      setTitle('');
      setDesc('');
    }
    setIsVisible(false);
  }
  return (
    <>
      <GestureRecognizer style={{flex: 1}} onSwipeDown={swipeDown}>
        <Modal transparent={true} visible={visible} animationType="slide">
          <View
            style={{
              flex: 1,
              justifyContent: 'flex-end',
            }}>
            <View
              style={{
                backgroundColor: COLOR.secondary,
                height: '80%',
                borderTopLeftRadius: 30,
                borderTopRightRadius: 50,
                paddingTop: 50,
                alignItems: 'center',
              }}>
              <TouchableOpacity
                onPress={handleSubmit}
                style={{
                  position: 'absolute',
                  bottom: 40,
                  width: 130,
                  height: 50,
                  backgroundColor: 'red',
                  borderRadius: 50,
                  justifyContent: 'center',
                  alignItems: 'center',
                  backgroundColor: COLOR.ligthViolet,
                }}>
                <Text
                  style={{
                    ...TextSize.h5,
                    color: COLOR.white,
                    zIndex: 99,
                  }}>
                  Save Note
                </Text>
              </TouchableOpacity>
              <TextInput
                value={title}
                style={{
                  ...TextSize.h1,
                  width: '100%',
                  height: 60,
                  paddingHorizontal: 20,
                  color: COLOR.white,
                }}
                autoFocus
                placeholder="Enter Title"
                onChangeText={text => setTitle(text)}
                placeholderTextColor={COLOR.lightGrey}
              />
              <TouchableOpacity
                style={{
                  width: '100%',
                }}
                onPress={handleModalClose}>
                <TextInput
                  value={desc}
                  placeholderTextColor={COLOR.lightGrey}
                  style={{
                    ...TextSize.h4,
                    paddingHorizontal: 20,
                    color: COLOR.white,
                    height: height / 1.9,
                  }}
                  placeholder="Your note.."
                  multiline={true}
                  onChangeText={text => setDesc(text)}
                />
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </GestureRecognizer>
    </>
  );
};

export default AddNote;
