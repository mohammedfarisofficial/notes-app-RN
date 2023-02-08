import {
  View,
  SafeAreaView,
  Dimensions,
  ScrollView,
  Text,
  Image,
  TouchableOpacity,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import Card from '../componets/Card';
import {COLOR, data, TextSize} from '../constants';
import {TextInput} from 'react-native-gesture-handler';
import {Search} from '../constants/Images';
import AddNote from '../componets/AddNote';
import {addNote} from '../constants/Images';

import {useNotes} from '../context/NoteProvider.js';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Home = ({navigation, user}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [resultNotFound, setResultNotFound] = useState(false);
  const [greet, setGreet] = useState('');

  let width = Dimensions.get('window').width;
  const {notes, setNotes, findNotes} = useNotes();

  const handleOnSubmit = async (title, desc) => {
    const note = {id: Date.now(), title, desc, time: Date.now()};
    const updatedNotes = [...notes, note];
    setNotes(updatedNotes);
    await AsyncStorage.setItem('notes', JSON.stringify(updatedNotes));
  };

  const handleSearchInput = async text => {
    setSearchQuery(text);
    if (!text.trim()) {
      setSearchQuery('');
      setResultNotFound(false);
      return await findNotes();
    }
    const filteredNotes = notes.filter(note => {
      if (note.title.toLowerCase().includes(text.toLowerCase())) return note;
    });
    if (filteredNotes.length) {
      setNotes([...filteredNotes]);
    } else {
      setResultNotFound(true);
    }
  };
  const findGreeting = () => {
    const hrs = new Date().getHours();
    if (hrs === 0 || hrs < 12) return setGreet('Morning');
    if (hrs === 1 || hrs < 17) return setGreet('Afternoon');
    setGreet('Evening');
  };
  useEffect(() => {
    findGreeting();
  }, []);

  return (
    <SafeAreaView
      style={{
        flex: 1,
        alignItems: 'center',

        backgroundColor: COLOR.primary,
      }}>
      <ScrollView
        style={{width: width, paddingHorizontal: 10}}
        showsVerticalScrollIndicator={false}>
        {/* top  */}
        <View style={{height: 150, width: '100%'}}>
          <Text style={{color: COLOR.white, fontSize: 18, fontWeight: '500'}}>
            <Text style={{opacity: 0.8}}>Good {greet}</Text>, {user.name}
          </Text>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <TextInput
              placeholder="Search note..."
              onChangeText={handleSearchInput}
              value={searchQuery}
              style={{
                flex: 1,
                height: 50,
                backgroundColor: COLOR.secondary,
                borderRadius: 20,
                marginVertical: 20,
                paddingLeft: 20,
                ...TextSize.h2,
                color: COLOR.white,
              }}
            />
            <TouchableOpacity>
              <Image
                style={{
                  width: 20,
                  height: 20,
                  marginLeft: 20,
                  opacity: 0.8,
                }}
                source={Search}
                resizeMode="contain"
              />
            </TouchableOpacity>
          </View>
          <Text style={{...TextSize.h4, color: COLOR.white}}>Notes</Text>
        </View>
        {/* /render items  */}

        {resultNotFound ? (
          <Text>Not found</Text>
        ) : (
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
            }}>
            {notes.length === 0 ? (
              <Text>No notes</Text>
            ) : (
              <>
                <View style={{paddingRight: 5}}>
                  {notes
                    .filter((item, index) => index % 2 === 0)
                    .map((note, index) => (
                      <Card note={note} key={index} />
                    ))}
                </View>
                <View style={{paddingLeft: 5}}>
                  {notes
                    .filter((item, index) => index % 2 !== 0)
                    .map((note, index) => (
                      <Card note={note} key={index} />
                    ))}
                </View>
              </>
            )}
          </View>
        )}
      </ScrollView>
      {/* add note btn  */}
      <TouchableOpacity
        onPress={() => setIsVisible(true)}
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
          source={addNote}
          style={{width: 27, height: 27}}
          resizeMode="contain"
        />
      </TouchableOpacity>
      {/* add note modal  */}
      <AddNote
        visible={isVisible}
        setIsVisible={setIsVisible}
        onSubmit={handleOnSubmit}
        isEdit={false}
      />
    </SafeAreaView>
  );
};

export default Home;
