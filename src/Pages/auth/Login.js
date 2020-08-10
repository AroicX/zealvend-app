import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  ScrollView,
  View,
  TextInput,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import Button from '../../components/Button';
import {Actions} from 'react-native-router-flux';

import Entypo from 'react-native-vector-icons/Entypo';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import AsyncStorage from '@react-native-community/async-storage';
import {LOG_USER_IN} from '../../api/actions';
const {width, height} = Dimensions.get('window');

export default function App() {
  const [loading, setloading] = useState(false);
  const [iconName, seticonName] = useState('eye');
  const [showPassword, setShowPassword] = useState(true);
  const [Email, setEmail] = useState(null);
  const [Password, setPassword] = useState(null);

  const [Success, setSuccess] = useState(null);
  const [Error, setError] = useState(null);

  const load = async () => {
    try {
      let data = await AsyncStorage.getItem('@user');
      if (data) {
        console.log(JSON.parse(data));

        Actions.push('home');
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const onSubmit = async () => {
    setloading(true);

    if (Email === null) {
      setError('Please Enter Email Address');
      setloading(false);

      return false;
    }
    if (Password === null) {
      setError('Please Enter Password');
      setloading(false);

      return false;
    }

    const callback = (user) => {
      // console.log(user);
      // return false;
      if (user.error) {
        setError('Invail Credentials');
        return false;
      }

      setloading(false);
      save(user);
      Actions.push('home');
    };

    const onError = (err) => {
      setloading(false);

      console.log(err);
    };

    LOG_USER_IN(Email, Password, callback, onError);
  };

  const onIconPress = () => {
    let iconName = showPassword ? 'eye-with-line' : 'eye';
    seticonName(iconName);

    setShowPassword(!showPassword);
  };

  const save = async (data) => {
    try {
      let dataToSave = JSON.stringify(data);
      await AsyncStorage.setItem('@user', dataToSave);
    } catch (err) {
      console.log(err);
    }
  };

  const ErrorMessage = () => {
    return (
      <>
        {Error ? (
          <TouchableOpacity style={styles.error} onPress={() => setError(null)}>
            <MaterialIcons name="error" size={24} color="white" />
            <Text style={styles.errorText}>{Error}</Text>
          </TouchableOpacity>
        ) : null}
      </>
    );
  };
  const ScucessMessage = () => {
    return (
      <>
        {Success ? (
          <TouchableOpacity
            style={styles.success}
            onPress={() => setSuccess(null)}>
            <AntDesign name="checkcircle" size={24} color="white" />
            <Text style={styles.successText}>{Success}</Text>
          </TouchableOpacity>
        ) : null}
      </>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Hello Welcome Back</Text>
      <ScrollView style={{flex: 1, marginTop: 30}}>
        <ErrorMessage />
        <ScucessMessage />
        <View style={styles.inputgroup}>
          <Text style={styles.label}>Email</Text>
          <TextInput
            style={styles.input}
            underlineColorAndroid="transparent"
            placeholder="app@zealvend.com"
            placeholderTextColor="#979797"
            autoCapitalize="none"
            value={Email}
            onChangeText={(value) => setEmail(value)}></TextInput>
        </View>

        <View style={styles.inputgroup}>
          <Text style={styles.label}>Password</Text>
          <TextInput
            style={styles.input}
            underlineColorAndroid="transparent"
            placeholder="**********"
            placeholderTextColor="#979797"
            autoCapitalize="none"
            onChangeText={(value) => setPassword(value)}
            value={Password}
            password={true}
            secureTextEntry={showPassword}
          />

          {/* <TouchableOpacity
            style={{alignSelf: 'flex-end', margin: 5}}
            onPress={onIconPress}>
            <Entypo name={iconName} size={24} color="black" />
          </TouchableOpacity> */}
        </View>

        <View
          style={{width: 350, alignSelf: 'center', justifyContent: 'center'}}>
          <Button
            name="Login"
            button={{borderRadius: 3}}
            func={onSubmit}
            loading={loading}
          />
          <Text
            style={{
              fontSize: 12,
              color: '#333',
              alignSelf: 'flex-end',
              marginTop: 20,
            }}>
            Forget password ?
          </Text>
        </View>
        <View
          style={{
            marginTop: 30,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <TouchableOpacity onPress={() => Actions.register()}>
            <Text style={{fontSize: 18, color: '#333'}}>Create Account</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 80,
    backgroundColor: '#fff',
  },
  header: {
    width: 300,
    margin: 30,
    marginTop: 50,
    fontSize: 36,
    color: '#999',
  },
  inputgroup: {
    marginLeft: 10,
    marginRight: 10,
    padding: 10,
  },
  label: {
    marginLeft: 15,
    fontSize: 12,
    color: '#4F4F4F',
    fontWeight: 'bold',
    letterSpacing: -0.24,
  },
  input: {
    margin: 5,
    height: 50,
    backgroundColor: '#fff',
    fontWeight: '100',
    color: '#979797',
    // borderColor: "#999",
    borderBottomWidth: 1,
    borderBottomColor: '#999',
    padding: 10,
  },
  error: {
    width: width - 50,
    backgroundColor: '#e74c3c',
    flexDirection: 'row',
    color: '#fff',
    margin: 2,
    marginLeft: 30,
    padding: 15,
    fontSize: 12,
    fontWeight: 'bold',
    letterSpacing: -0.24,
  },
  errorText: {
    marginTop: 5,
    marginLeft: 5,
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
    letterSpacing: -0.24,
  },
  success: {
    width: width - 50,
    backgroundColor: '#27ae60',
    flexDirection: 'row',
    color: '#fff',
    margin: 2,
    marginLeft: 30,
    padding: 15,
    fontSize: 12,
    fontWeight: 'bold',
    letterSpacing: -0.24,
  },
  successText: {
    marginTop: 5,
    marginLeft: 5,
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
    letterSpacing: -0.24,
  },
});
