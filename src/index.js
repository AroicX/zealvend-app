import React, {useState} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';

export default function App(params) {
  const [Loading, setLoading] = useState(false);

  const save = async () => {
    try {
      await AsyncStorage.setItem('user', 'my name is AroicX');
    } catch (err) {
      console.log(err);
    }
  };
  const load = async () => {
    try {
      let data = await AsyncStorage.getItem('user');
      console.log(data);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <View style={styles.container}>
      <Text>Mercury App</Text>
      <TouchableOpacity style={styles.button} onPress={save}>
        <Text style={{fontSize: 16, color: '#fff'}}>SAVE</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={load}>
        <Text style={{fontSize: 16, color: '#fff'}}>Load</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    display: 'flex',
    width: 100,
    backgroundColor: '#e67e22',
    padding: 10,
    margin: 5,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 2,
  },
});
