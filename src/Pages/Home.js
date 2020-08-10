import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Dimensions,
  ScrollView,
  TouchableOpacity,
  RefreshControl,
  Picker,
  ToastAndroid,
  ActivityIndicator,
} from 'react-native';

import NavigationTab from '../components/NavigationTab';
import AsyncStorage from '@react-native-community/async-storage';

import Entypo from 'react-native-vector-icons/Entypo';
import AntDesign from 'react-native-vector-icons/AntDesign';

import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {Actions} from 'react-native-router-flux';
import moment from 'moment';

import {
  GET_DASHBOARD,
  GET_BUNDLE,
  VEND,
  FUND,
  GET_PROFILE,
} from '../api/actions';
import Button from '../components/Button';

const widthScreen = Dimensions.get('window').width;
const heightScreen = Dimensions.get('window').height;
const today = moment().format('YYYY/MM/DD');

export default function App() {
  const [isLoading, setisLoading] = useState(true);
  const [loading, setloading] = useState(false);

  const [MiniLoader, setMiniLoader] = useState(false);
  const [Token, setToken] = useState(null);
  const [Dashboard, setDashboard] = useState(null);
  const [selectedValue, setSelectedValue] = useState(null);
  const [selectedBundle, setSelectedBundle] = useState(null);
  const [bundle, setbundle] = useState(null);
  const [Number, setNumber] = useState(null);
  const [detail, setdetail] = useState(null);
  const [Profile, setProfile] = useState(null);

  const [Success, setSuccess] = useState(null);
  const [Error, setError] = useState(null);

  const signOut = async () => {
    try {
      await AsyncStorage.clear();

      Actions.push('login');
    } catch (err) {
      console.log(err);
    }
  };

  const load = async () => {
    try {
      let data = await AsyncStorage.getItem('@user');
      if (data) {
        let parsedData = JSON.parse(data);

        setTimeout(() => {
          dashboard(parsedData.token);
        }, 100);
      } else {
        Actions.push('login');
      }
    } catch (err) {
      console.log(err);
    }
  };

  const dashboard = (data) => {
    const callback = (res) => {
      setTimeout(() => {
        setDashboard(res.analysis);
        setProfile(res.analysis.user);
        setisLoading(false);
      }, 100);
    };

    const onError = (err) => {
      console.log(err);
    };

    GET_DASHBOARD(today, data, callback, onError);
  };

  useEffect(() => {
    load();
  }, []);

  const getBundle = (data) => {
    setSelectedValue(data);

    const callback = (res) => {
      setbundle(res.data);
    };

    const onError = (err) => {
      console.log(err);
    };

    GET_BUNDLE(Token, data, callback, onError);
  };

  const userBundle = (data) => {
    console.log(data);
    setSelectedBundle(data);
  };

  const buy = () => {
    if (selectedValue === null) {
      setloading(false);
      ToastAndroid.show('Please Select Network', ToastAndroid.SHORT);
      return false;
    }
    if (selectedBundle === null) {
      setloading(false);
      ToastAndroid.show('Please Select Bundle', ToastAndroid.SHORT);
      return false;
    }
    if (Number === null) {
      setloading(false);
      ToastAndroid.show('Please Select Number', ToastAndroid.SHORT);
      return false;
    }

    setMiniLoader(true);

    const callback = (response) => {
      if (response.status === 'success') {
        setMiniLoader(false);
        setSuccess('Transaction Successful');
      }
    };

    const onError = (err) => {
      console.log(err);
    };

    VEND(selectedValue, selectedBundle, Number, Token, callback, onError);
  };

  const fund = () => {
    if (selectedValue === null) {
      setMiniLoader(false);

      ToastAndroid.show('Please Select Network', ToastAndroid.SHORT);
      return false;
    }
    if (selectedBundle === null) {
      setMiniLoader(false);

      ToastAndroid.show('Please Select Bundle', ToastAndroid.SHORT);
      return false;
    }
    if (Number === null) {
      setMiniLoader(false);

      ToastAndroid.show('Please Select Number', ToastAndroid.SHORT);
      return false;
    }

    setMiniLoader(true);

    const callback = (response) => {
      console.log(response);
      if (response.error) {
        if (response.error.errors.number) {
          setMiniLoader(false);

          let msg = response.error.errors.number;
          setError(msg);
        }
        if (response.error.errors.bundle) {
          setMiniLoader(false);

          let msg = response.error.errors.bundle;
          setError(msg);
        }
        if (response.error.errors.network) {
          setMiniLoader(false);

          let msg = response.error.errors.network;
          setError(msg);
        }
      }

      if (response.status === 'success') {
        setMiniLoader(false);
        setSuccess(response.message);
        setdetail(response);
      }
    };

    const onError = (err) => {
      console.log(err);
    };

    FUND(selectedValue, selectedBundle, Number, Token, callback, onError);
  };

  const [refreshing, setRefreshing] = React.useState(false);

  const wait = (timeout) => {
    return new Promise((resolve) => {
      setTimeout(resolve, timeout);
    });
  };

  const confirm = () => {
    setdetail(null);
    setSuccess('Transaction Processing...');
  };

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    setdetail(null);

    wait(2000).then(() => setRefreshing(false));
  }, []);

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
      <View style={styles.topBar}>
        <View>
          <Text style={{fontSize: 24, fontWeight: 'bold'}}>
            {Profile ? ` Hi, ${Profile.fullname}` : 'Loading...'}
          </Text>
          <Text style={{fontSize: 14, color: '#999', fontWeight: 'bold'}}>
            {' '}
            {Profile ? `N ${Profile.balance}` : 'Loading...'}
          </Text>
        </View>

        <TouchableOpacity style={{marginTop: 10}} onPress={signOut}>
          <Entypo name="lock-open" size={24} color="black" />
        </TouchableOpacity>
      </View>

      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }>
        <View
          style={{
            // height: heightScreen,
            flexDirection: 'column',
            alignItems: 'center',
          }}>
          <View>
            {/*ge*/}

            <View style={[styles.walletCard, {backgroundColor: '#2980b9'}]}>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                }}>
                <Text style={{color: '#fff', fontSize: 14}}>
                  Bundle(MB) -{' '}
                  <Text
                    style={{color: '#fff', fontSize: 24, fontWeight: 'bold'}}>
                    {' '}
                    {isLoading
                      ? 'Loading....'
                      : Dashboard['Total']['Bundle(MB)']}
                  </Text>
                </Text>
                <TouchableOpacity
                  style={styles.all}
                  onPress={() => Actions.analysis()}>
                  <Text
                    style={{
                      color: '#333',
                      fontSize: 16,
                      textTransform: 'uppercase',
                    }}>
                    View All
                  </Text>
                </TouchableOpacity>
              </View>

              <View
                style={{
                  width: 150,
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  marginTop: 10,
                }}>
                <Text style={{fontSize: 12, color: '#fff'}}>Transactions</Text>
                <Text style={{fontSize: 12, color: '#fff', fontWeight: 'bold'}}>
                  {isLoading
                    ? 'Loading....'
                    : Dashboard['Total']['Transactions']}
                </Text>
              </View>
              <View
                style={{
                  width: 150,
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  marginTop: 10,
                }}>
                <Text style={{fontSize: 12, color: '#fff'}}>Successful</Text>
                <Text style={{fontSize: 12, color: '#fff', fontWeight: 'bold'}}>
                  {isLoading ? 'Loading....' : Dashboard['Total']['Successful']}
                </Text>
              </View>
              <View
                style={{
                  width: 150,
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  marginTop: 10,
                }}>
                <Text style={{fontSize: 12, color: '#fff'}}>Reversed</Text>
                <Text style={{fontSize: 12, color: '#fff', fontWeight: 'bold'}}>
                  {isLoading ? 'Loading....' : Dashboard['Total']['Reversed']}
                </Text>
              </View>
              <View
                style={{
                  width: 150,
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  marginTop: 10,
                }}>
                <Text style={{fontSize: 12, color: '#fff'}}>Processing</Text>
                <Text style={{fontSize: 12, color: '#fff', fontWeight: 'bold'}}>
                  {isLoading ? 'Loading....' : Dashboard['Total']['Processing']}
                </Text>
              </View>
            </View>

            {/* the */}
          </View>
        </View>

        <ErrorMessage />
        <ScucessMessage />

        {detail ? (
          <View style={styles.details}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                margin: 5,
              }}>
              <Text style={{fontWeight: 'bold'}}>Account Name: </Text>
              <Text>{detail.account_name}</Text>
            </View>

            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                margin: 5,
              }}>
              <Text style={{fontWeight: 'bold'}}>Account Number: </Text>
              <Text>{detail.account_number}</Text>
            </View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                margin: 5,
              }}>
              <Text style={{fontWeight: 'bold'}}>Amount: </Text>
              <Text>{detail.amount}</Text>
            </View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                margin: 5,
              }}>
              <Text style={{fontWeight: 'bold'}}>Bank: </Text>
              <Text>{detail.bank_name}</Text>
            </View>

            <Button name="Confirm" func={confirm} />
          </View>
        ) : (
          <></>
        )}

        {MiniLoader ? (
          <ActivityIndicator
            size="small"
            color="#333"
            style={{marginTop: 50}}
          />
        ) : (
          <View style={{padding: 30}}>
            <Text style={{fontSize: 18, fontWeight: 'bold', marginLeft: 10}}>
              Quick Vend
            </Text>

            <View style={[styles.inputgroup, {marginTop: 20, marginBottom: 5}]}>
              <Picker
                selectedValue={selectedValue}
                style={{height: 50, width: widthScreen - 80}}
                onValueChange={(itemValue, itemIndex) => getBundle(itemValue)}>
                <Picker.Item label="Select Network" />
                <Picker.Item label="MTN" value="mtn" />
                <Picker.Item label="AIRTEL" value="airtel" />
                <Picker.Item label="ETISALAT" value="etisalat" />
                <Picker.Item label="GLO" value="glo" />
              </Picker>
            </View>
            <View style={[styles.inputgroup, {marginTop: 0, marginBottom: 5}]}>
              <Picker
                selectedValue={selectedBundle}
                style={{height: 50, width: widthScreen - 80}}
                onValueChange={(value, itemIndex) => userBundle(value)}>
                <Picker.Item label="Select Bundle" value="0" />
                {bundle
                  ? bundle.map((item, i) => {
                      return (
                        <Picker.Item
                          label={`${item.bundle} - ₦ ${item.price} (${item.validity})`}
                          value={item.bundle}
                          key={i + 1}
                        />
                      );
                    })
                  : null}
              </Picker>
            </View>

            <View style={styles.inputgroup}>
              <Text style={styles.label}>Phone Number</Text>
              <TextInput
                style={styles.input}
                keyboardAppearance="dark"
                keyboardType="number-pad"
                underlineColorAndroid="transparent"
                placeholder="080 123 5678"
                placeholderTextColor="#979797"
                autoCapitalize="none"
                minLength={11}
                maxLength={11}
                onChangeText={(value) => setNumber(value)}></TextInput>
            </View>

            <View
              style={{marginLeft: 20, marginTop: -20, flexDirection: 'row'}}>
              <Button
                name="By Wallet"
                button={{
                  backgroundColor: '#27ae60',
                  width: 150,
                  margin: 2,
                  borderRadius: 5,
                }}
                func={buy}
                // loading={loading}
              />

              {/* {slectedPayment === 'fund' ? } */}

              <Button
                name="By Transfer"
                button={{
                  backgroundColor: '#2980b9',
                  width: 150,
                  margin: 2,
                  borderRadius: 5,
                }}
                func={fund}
              />
            </View>
          </View>
        )}
      </ScrollView>
      <NavigationTab activeTab="dashboard" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 30,
    backgroundColor: '#fff',
  },
  all: {
    width: 'auto',
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 5,
    position: 'absolute',
    top: 50,
    right: 30,
  },
  topBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 20,
  },
  walletCard: {
    width: widthScreen - 40,
    height: heightScreen - (widthScreen + 210),
    padding: 20,
    borderRadius: 10,
    margin: 10,
  },
  details: {
    padding: 50,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.18,
    shadowRadius: 1.0,

    elevation: 1,
  },
  inputgroup: {
    marginLeft: 10,
    marginRight: 10,
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
  error: {
    width: widthScreen - 50,
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
    width: widthScreen - 50,
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
