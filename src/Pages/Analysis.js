import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  ScrollView,
  TouchableOpacity,
  RefreshControl,
} from 'react-native';
import NavigationTab from '../components/NavigationTab';
import AsyncStorage from '@react-native-community/async-storage';

import {Actions} from 'react-native-router-flux';

import {GET_DASHBOARD} from '../api/actions';

import moment from 'moment';

const widthScreen = Dimensions.get('window').width;
const heightScreen = Dimensions.get('window').height;
const today = moment().format('YYYY/MM/DD');

export default function Analysis() {
  const [isLoading, setisLoading] = useState(true);
  const [Token, setToken] = useState(null);
  const [Dashboard, setDashboard] = useState(null);

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
          setToken(parsedData.token);

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

  const [refreshing, setRefreshing] = React.useState(false);

  const wait = (timeout) => {
    return new Promise((resolve) => {
      setTimeout(resolve, timeout);
    });
  };

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);

    wait(2000).then(() => setRefreshing(false));
  }, []);

  return (
    <View style={styles.container}>
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }>
        <View
          style={{
            height: heightScreen + 100,
            flexDirection: 'column',
            alignItems: 'center',
          }}>
          <View>
            {/*ge*/}
            <View style={[styles.walletCard, {backgroundColor: '#f1c40f'}]}>
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
                    {isLoading ? 'Loading....' : Dashboard['MTN']['Bundle(MB)']}
                  </Text>
                </Text>
                <TouchableOpacity style={styles.all}>
                  <Text
                    style={{
                      color: '#333',
                      fontSize: 16,
                      textTransform: 'uppercase',
                    }}>
                    MTN
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
                  {isLoading ? 'Loading....' : Dashboard['MTN']['Transactions']}
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
                  {isLoading ? 'Loading....' : Dashboard['MTN']['Successful']}
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
                  {isLoading ? 'Loading....' : Dashboard['MTN']['Reversed']}
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
                  {isLoading ? 'Loading....' : Dashboard['MTN']['Processing']}
                </Text>
              </View>
            </View>
            {/* the */}

            {/*ge*/}
            <View style={[styles.walletCard, {backgroundColor: '#27ae60'}]}>
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
                      : Dashboard['Etisalat']['Bundle(MB)']}
                  </Text>
                </Text>
                <TouchableOpacity style={styles.all}>
                  <Text
                    style={{
                      color: '#333',
                      fontSize: 16,
                      textTransform: 'uppercase',
                    }}>
                    ETISALAT
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
                    : Dashboard['Etisalat']['Transactions']}
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
                  {isLoading
                    ? 'Loading....'
                    : Dashboard['Etisalat']['Successful']}
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
                  {isLoading
                    ? 'Loading....'
                    : Dashboard['Etisalat']['Reversed']}
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
                  {isLoading
                    ? 'Loading....'
                    : Dashboard['Etisalat']['Processing']}
                </Text>
              </View>
            </View>
            {/* the */}

            {/*ge*/}
            <View style={[styles.walletCard, {backgroundColor: '#e74c3c'}]}>
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
                      : Dashboard['AIRTEL']['Bundle(MB)']}
                  </Text>
                </Text>
                <TouchableOpacity style={styles.all}>
                  <Text
                    style={{
                      color: '#333',
                      fontSize: 16,
                      textTransform: 'uppercase',
                    }}>
                    AIRTEL
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
                    : Dashboard['AIRTEL']['Transactions']}
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
                  {isLoading
                    ? 'Loading....'
                    : Dashboard['AIRTEL']['Successful']}
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
                  {isLoading ? 'Loading....' : Dashboard['AIRTEL']['Reversed']}
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
                  {isLoading
                    ? 'Loading....'
                    : Dashboard['AIRTEL']['Processing']}
                </Text>
              </View>
            </View>
            {/* the */}
            {/*ge*/}
            <View style={[styles.walletCard, {backgroundColor: '#16a085'}]}>
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
                    {isLoading ? 'Loading....' : Dashboard['GLO']['Bundle(MB)']}
                  </Text>
                </Text>
                <TouchableOpacity style={styles.all}>
                  <Text
                    style={{
                      color: '#333',
                      fontSize: 16,
                      textTransform: 'uppercase',
                    }}>
                    GLO
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
                  {isLoading ? 'Loading....' : Dashboard['GLO']['Transactions']}
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
                  {isLoading ? 'Loading....' : Dashboard['GLO']['Successful']}
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
                  {isLoading ? 'Loading....' : Dashboard['GLO']['Reversed']}
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
                  {isLoading ? 'Loading....' : Dashboard['GLO']['Processing']}
                </Text>
              </View>
            </View>
            {/* the */}
          </View>
        </View>
      </ScrollView>
      <NavigationTab activeTab="dashboard" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 30,
    backgroundColor: '#f3f3f3',
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
    // backgroundColor: "red",
    justifyContent: 'space-between',
    padding: 20,
  },
  walletCard: {
    width: widthScreen - 40,
    height: heightScreen - (widthScreen + 230),
    padding: 20,
    // backgroundColor: '#4132CF',
    borderRadius: 10,
    margin: 10,
  },
  add: {
    width: 52,
    height: 52,
    position: 'absolute',
    bottom: -20,
    right: -10,
    backgroundColor: '#6659FB',
    borderRadius: 34,
    alignItems: 'center',
    justifyContent: 'center',
    margin: 10,
  },
  debitCard: {
    width: widthScreen - 80,
    height: heightScreen - (widthScreen + 250),
    padding: 20,
    backgroundColor: '#130f40',
    borderRadius: 10,
    margin: 10,
  },
  plans: {
    width: 100,
    height: 100,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    margin: 10,
  },
  table: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  tr: {
    margin: 20,
  },
});
