import {
  Text,
  SafeAreaView,
  ScrollView,
  Image,
  TouchableOpacity,
  Alert,
} from 'react-native';
import React, {useState} from 'react';
import {COLOR, TextSize} from '../constants';
import {edit, back, trash} from '../constants/Images';
import useDateFormat from '../hooks/useDateFormat';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNotes} from '../context/NoteProvider';
import AddNote from '../componets/AddNote';

const Note = ({navigation, route}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [note, setNote] = useState(route.params.note);
  const formatedDate = useDateFormat(note.time);
  const {setNotes} = useNotes();

  const deleteNote = async () => {
    const allNotes = await AsyncStorage.getItem('notes');
    let notes = [];
    if (allNotes !== null) {
      notes = JSON.parse(allNotes);
    }
    const newNotes = notes.filter(item => item.id !== note.id);
    setNotes(newNotes);
    await AsyncStorage.setItem('notes', JSON.stringify(newNotes));
    navigation.goBack();
  };

  function deleteAlert() {
    return Alert.alert(
      'Are You Sure!',
      'This action will delete your note permanently!',
      [
        {
          text: 'Delete',
          onPress: deleteNote,
        },
        {
          text: 'No Thanks',
          onPress: () => {},
        },
      ],
      {
        cancelable: true,
      },
    );
  }

  const openEditModal = () => {
    setIsEdit(true);
    setIsVisible(true);
  };

  const handleUpdate = async (title, desc, time) => {
    const result = await AsyncStorage.getItem('notes');
    let notes = [];
    if (result !== null) notes = JSON.parse(result);
    const newNotes = notes.filter(item => {
      if (item.id === note.id) {
        item.title = title;
        item.desc = desc;
        item.isUpdated = true;
        item.time = time;

        setNote(item);
      }
      return item;
    });
    setNotes(newNotes);
    await AsyncStorage.setItem('notes', JSON.stringify(newNotes));
  };
  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: COLOR.primary,
      }}>
      {/* back btn */}
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        style={{height: '6%'}}>
        <Image
          source={back}
          style={{width: 20, height: 20, marginLeft: 14, marginVertical: 10}}
        />
      </TouchableOpacity>
      <ScrollView
        style={{
          backgroundColor: COLOR.primary,
          flex: 1,
          paddingBottom: 20,
          paddingHorizontal: 14,
        }}>
        <TouchableOpacity
          style={{alignItems: 'flex-end', height: 40}}
          onPress={deleteAlert}>
          <Image
            source={trash}
            style={{height: 20, width: 25}}
            resizeMode="contain"
          />
        </TouchableOpacity>
        <Text
          style={{
            textAlign: 'right',
            color: COLOR.lightGrey,
          }}>
          {note.isUpdated
            ? `Updated At ${formatedDate}`
            : `Created At ${formatedDate}`}
        </Text>
        <Text style={{color: COLOR.white, ...TextSize.h1, marginVertical: 10}}>
          {note.title}
        </Text>
        <Text
          style={{
            color: COLOR.lightGrey,
            ...TextSize.h4,
            lineHeight: 28,
          }}>
          {note.desc}
        </Text>
      </ScrollView>
      <TouchableOpacity
        onPress={openEditModal}
        style={{
          position: 'absolute',
          backgroundColor: COLOR.ligthViolet,
          width: 70,
          height: 70,
          zIndex: 2,
          bottom: 50,
          right: 20,
          borderRadius: 50,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Image
          source={edit}
          style={{width: 27, height: 27}}
          resizeMode="contain"
        />
      </TouchableOpacity>
      <AddNote
        visible={isVisible}
        setIsVisible={setIsVisible}
        onSubmit={handleUpdate}
        isEdit={isEdit}
        note={note}
      />
    </SafeAreaView>
  );
};

export default Note;
