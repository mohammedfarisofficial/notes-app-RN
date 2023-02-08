import 'react-native-gesture-handler';
import {View, Text} from 'react-native';
import React, {useState, useEffect} from 'react';
import Home from './screens/Home';
import Welcome from './screens/Welcome';
import Note from './screens/Note';
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import NoteProvider from './context/NoteProvider';

const Stack = createStackNavigator();

const App = () => {
  const [user, setUser] = useState({});
  const [isFirstTime, setIsFirstTime] = useState(false);

  const findUser = async () => {
    const result = await AsyncStorage.getItem('user');
    if (result === null) return setIsFirstTime(true);

    setUser(JSON.parse(result));
    setIsFirstTime(false);
  };
  useEffect(() => {
    // AsyncStorage.clear();
    findUser();
  }, []);

  const renderNoteScreen = props => <Home {...props} user={user} />;
  if (isFirstTime) return <Welcome onFinish={findUser} />;
  return (
    <NavigationContainer>
      <NoteProvider>
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
          }}>
          <Stack.Screen name="Home">{renderNoteScreen}</Stack.Screen>
          <Stack.Screen name="Note" component={Note} />
        </Stack.Navigator>
      </NoteProvider>
    </NavigationContainer>
  );
};

export default App;
