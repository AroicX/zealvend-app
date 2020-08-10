import React, {useState, useEffect} from 'react';
import {View, ActivityIndicator, StyleSheet} from 'react-native';
import Routes from './src/Route.js';
import {Actions} from 'react-native-router-flux';
import AsyncStorage from '@react-native-community/async-storage';

export default function App() {
  const [IsLoggedIn, setIsLoggedIn] = useState(false);

  const load = async () => {
    try {
      // await AsyncStorage.clear();
      let data = await AsyncStorage.getItem('@user');
      if (data) {
        console.log(JSON.parse(data));

        setTimeout(() => {
          setIsLoggedIn(true);
          Actions.push('blank');
        }, 1000);
      } else {
        setTimeout(() => {
          setIsLoggedIn(true);
          Actions.push('login');
        }, 1000);
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    load();
  }, []);

  return (
    <>
      {IsLoggedIn ? (
        <Routes />
      ) : (
        <View style={styles.conatiner}>
          {/* <Text>Loading</Text> */}
          <View style={{width: 400}}>
            <ActivityIndicator size="small" color="#6659FB" />
          </View>
        </View>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  conatiner: {
    flex: 1,
    paddingTop: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
