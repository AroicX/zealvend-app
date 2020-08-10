import React, {useState, useEffect} from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  TextInput,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import Button from '../../components/Button';
import Entypo from 'react-native-vector-icons/Entypo';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';

import {Actions} from 'react-native-router-flux';

//TODO: Import Api call from ../../api/actions
import {REGISTER} from '../../api/actions';

const {width, height} = Dimensions.get('window');

export default function Register() {
  const [loading, setloading] = useState(false);
  const [iconName, seticonName] = useState('eye');
  const [Fullname, setFullname] = useState(null);
  const [Email, setEmail] = useState(null);
  const [Number, setNumber] = useState(null);
  const [Referral, setReferral] = useState(null);
  const [Password, setPassword] = useState(null);
  const [showPassword, setShowPassword] = useState(true);
  const [Webhook, setWebhook] = useState(null);

  const [Success, setSuccess] = useState(null);
  const [Error, setError] = useState(null);

  const register = async () => {
    setloading(true);
    setError(null);
    setSuccess(null);
    let user = {
      email: Email,
      number: Number,
      refer: Referral,
      fullname: Fullname,
      password: Password,
      webhook_url: Webhook,
    };

    // console.log(user);
    // return false;

    const callback = async (response) => {
      setloading(false);

      if (response.status === 'ok') {
        setSuccess('Regsitration Successful....');

        setTimeout(() => {
          Actions.push('login');
        }, 1000);
      }

      if (response.error) {
        if (response.error.errors.email) {
          let msg = response.error.errors.email;
          setError(msg);
        }

        if (response.error.errors.number) {
          let msg = response.error.errors.number;
          setError(msg);
        }
      }
    };

    const onError = (err) => {
      setError('Server Error');
    };

    REGISTER(user, callback, onError);
  };

  const onIconPress = () => {
    let iconName = showPassword ? 'eye-with-line' : 'eye';
    seticonName(iconName);

    setShowPassword(!showPassword);
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
      <Text style={styles.header}>Create Account</Text>
      <ScrollView>
        <View style={{flex: 1, marginTop: Error || Success ? 30 : 30}}>
          <ErrorMessage />
          <ScucessMessage />

          <View style={styles.inputgroup}>
            <Text style={styles.label}>Email</Text>
            <TextInput
              style={styles.input}
              underlineColorAndroid="transparent"
              placeholder="Email"
              placeholderTextColor="#979797"
              autoCapitalize="none"
              value={Email}
              onChangeText={(value) => setEmail(value)}></TextInput>
          </View>

          <View style={styles.inputgroup}>
            <Text style={styles.label}>Phone Number</Text>
            <TextInput
              style={styles.input}
              underlineColorAndroid="transparent"
              placeholder="080 000 0000"
              placeholderTextColor="#979797"
              autoCapitalize="none"
              value={Number}
              onChangeText={(value) => setNumber(value)}></TextInput>
          </View>

          <View style={styles.inputgroup}>
            <Text style={styles.label}>Referral</Text>
            <TextInput
              style={styles.input}
              underlineColorAndroid="transparent"
              placeholder="080 000 0000"
              placeholderTextColor="#979797"
              autoCapitalize="none"
              value={Referral}
              onChangeText={(value) => setReferral(value)}></TextInput>
          </View>

          <View style={styles.inputgroup}>
            <Text style={styles.label}>FullName</Text>
            <TextInput
              style={styles.input}
              underlineColorAndroid="transparent"
              placeholder="John Doe"
              placeholderTextColor="#979797"
              autoCapitalize="none"
              value={Fullname}
              onChangeText={(value) => setFullname(value)}></TextInput>
          </View>

          <View style={styles.inputgroup}>
            <Text style={styles.label}>Password</Text>

            <View style={{flexDirection: 'row'}}>
              <TextInput
                style={[styles.input, {flex: 2}]}
                underlineColorAndroid="transparent"
                placeholder="****************"
                placeholderTextColor="#979797"
                autoCapitalize="none"
                onChangeText={(value) => setPassword(value)}
                value={Password}
                password={true}
                secureTextEntry={showPassword}></TextInput>

              <TouchableOpacity
                style={{alignSelf: 'flex-end', margin: 5, marginTop: 15}}
                onPress={onIconPress}>
                <Entypo name={iconName} size={24} color="black" />
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.inputgroup}>
            <Text style={styles.label}>Webhook</Text>
            <TextInput
              style={styles.input}
              underlineColorAndroid="transparent"
              placeholder="optional"
              placeholderTextColor="#979797"
              autoCapitalize="none"
              value={Webhook}
              onChangeText={(value) => setWebhook(value)}></TextInput>
          </View>

          <View
            style={{
              width: 350,
              alignSelf: 'center',
              justifyContent: 'center',
              marginTop: -20,
            }}>
            <Button
              name="Create Account"
              button={{borderRadius: 3}}
              loading={loading}
              func={register}
            />
          </View>
          <View
            style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
            <Text style={{fontSize: 12, color: '#999', marginTop: 10}}>
              Already have an account?
            </Text>
            <Text
              style={{fontSize: 18, color: '#30336b', marginTop: 10}}
              onPress={() => Actions.login()}>
              Login
            </Text>
          </View>
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
    alignSelf: 'center',
    fontSize: 36,
  },
  inputgroup: {
    marginLeft: 10,
    marginRight: 10,
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
    borderBottomWidth: 1,
    borderBottomColor: '#999',
    padding: 10,
  },
});
