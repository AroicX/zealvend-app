import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  StatusBar,
  ScrollView,
  TextInput,
} from 'react-native';
import NavigationTab from '../components/NavigationTab';
import Button from '../components/Button';
import {GET_PROFILE} from '../api/actions';
import AsyncStorage from '@react-native-community/async-storage';

const {width, height} = Dimensions.get('window');

export default function Profile() {
  const [Token, setToken] = useState(null);

  const [Profile, setProfile] = useState(null);

  const load = async () => {
    try {
      let data = await AsyncStorage.getItem('@user');
      if (data) {
        let parsedData = JSON.parse(data);

        setTimeout(() => {
          setToken(parsedData.token);
          profile(parsedData.token);
        }, 100);
      } else {
        Actions.push('login');
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const profile = (data) => {
    const callback = (res) => {
      setProfile(res.user);
    };

    const onError = (err) => {
      console.log(err);
    };

    GET_PROFILE(data, callback, onError);
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      <View style={styles.header}>
        <Text style={styles.headerText}>Profile</Text>
      </View>

      <ScrollView style={styles.profile}>
        {/*profile*/}

        <View style={styles.inputgroup}>
          <Text style={styles.label}>Name</Text>
          <TextInput
            style={styles.input}
            underlineColorAndroid="transparent"
            placeholder={Profile ? Profile.fullname : ''}
            placeholderTextColor="#979797"
            autoCapitalize="none"></TextInput>
        </View>

        <View style={styles.inputgroup}>
          <Text style={styles.label}>Email Address</Text>
          <TextInput
            style={styles.input}
            underlineColorAndroid="transparent"
            placeholder={Profile ? Profile.email : ''}
            placeholderTextColor="#979797"
            autoCapitalize="none"></TextInput>
        </View>

        <View style={styles.inputgroup}>
          <Text style={styles.label}>Phone Number</Text>
          <TextInput
            style={styles.input}
            underlineColorAndroid="transparent"
            placeholder={Profile ? Profile.number : ''}
            placeholderTextColor="#979797"
            autoCapitalize="none"></TextInput>
        </View>

        <View style={styles.inputgroup}>
          <Text style={styles.label}>Webhook</Text>
          <TextInput
            style={styles.input}
            underlineColorAndroid="transparent"
            placeholder={Profile ? Profile.webhook_url : ''}
            placeholderTextColor="#979797"
            autoCapitalize="none"></TextInput>
        </View>

        <View style={styles.inputgroup}>
          <Text style={styles.label}>Package</Text>
          <TextInput
            style={styles.input}
            underlineColorAndroid="transparent"
            placeholder={Profile ? Profile.package : ''}
            placeholderTextColor="#979797"
            autoCapitalize="none"></TextInput>
        </View>

        <Text style={[styles.headerText, {margin: 30, marginLeft: 0}]}>
          Change Password
        </Text>

        <View style={styles.inputgroup}>
          <Text style={styles.label}>Old Password</Text>
          <TextInput
            style={styles.input}
            underlineColorAndroid="transparent"
            placeholder="******"
            placeholderTextColor="#979797"
            autoCapitalize="none"></TextInput>
        </View>

        <View style={styles.inputgroup}>
          <Text style={styles.label}>New Password</Text>
          <TextInput
            style={styles.input}
            underlineColorAndroid="transparent"
            placeholder="******"
            placeholderTextColor="#979797"
            autoCapitalize="none"></TextInput>
        </View>

        <View style={styles.inputgroup}>
          <Text style={styles.label}>Confrim Password</Text>
          <TextInput
            style={styles.input}
            underlineColorAndroid="transparent"
            placeholder="******"
            placeholderTextColor="#979797"
            autoCapitalize="none"></TextInput>
        </View>

        <Button
          name="Change Password"
          loading={false}
          func={() => alert('saved')}
        />

        {/*profile*/}
      </ScrollView>

      <NavigationTab activeTab="profile" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    // backgroundColor: 'teal',
    height: 80,
    padding: 20,
  },
  headerText: {
    fontSize: 25,
    color: '#333',
    fontWeight: 'bold',
  },
  headerSpan: {
    marginTop: 15,
    fontSize: 14,
    color: '#333',
    fontWeight: 'bold',
  },

  label: {
    margin: 5,

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
    borderWidth: 1,
    borderColor: '#999',
    padding: 10,
  },
  profile: {
    padding: 20,
  },
});
