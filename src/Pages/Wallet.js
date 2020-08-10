import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  StatusBar,
  ScrollView,
  TouchableOpacity,
  FlatList,
  TextInput,
  ToastAndroid,
} from 'react-native';
import NavigationTab from '../components/NavigationTab';
import AsyncStorage from '@react-native-community/async-storage';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import {
  GET_WALLET,
  GET_WALLET_PAGE,
  GET_WALLET_BY_SEARCH,
} from '../api/actions';

const {width, height} = Dimensions.get('window');

export default function Wallet() {
  const [isLoading, setisLoading] = useState(true);
  const [Token, setToken] = useState(null);
  const [current, setcurrent] = useState(0);
  const [pageCount, setpageCount] = useState(0);
  const [feedWallet, setfeedWallet] = useState(null);
  const [search, setSearch] = useState(null);
  const [isSearch, setisSearch] = useState(false);

  const load = async () => {
    try {
      let data = await AsyncStorage.getItem('@user');
      if (data) {
        let parsedData = JSON.parse(data);
        setTimeout(() => {
          setToken(parsedData.token);
          wallet(parsedData.token);
        }, 100);
      } else {
        Actions.push('login');
      }
    } catch (err) {
      console.log(err);
    }
  };

  const wallet = (data) => {
    const callback = (res) => {
      setTimeout(() => {
        setcurrent(res.transactions.current_page);
        setpageCount(res.transactions.total);
        setfeedWallet(res.transactions.data);
        setisLoading(false);
      }, 1);
    };

    const onError = (err) => {
      console.log(err);
    };

    GET_WALLET(data, callback, onError);
  };

  useEffect(() => {
    load();
  }, []);

  const handleLoadMore = () => {
    let page = current + 1;
    if (pageCount >= page) {
      const callback = (res) => {
        let wallet = [...feedWallet, ...res.transactions.data];

        setfeedWallet(wallet);
        setcurrent(res.current_page);
        setpageCount(res.total);
        setisLoading(false);
      };

      const onError = (err) => {
        console.log(err);
      };

      GET_WALLET_PAGE(page, Token, callback, onError);
    }
  };

  const Response = ({item}) => {
    return (
      <ScrollView>
        <View style={styles.walletTable} key={item.id}>
          <View style={styles.th}>
            <Text>Reference </Text>
            <Text>{item.referrence}</Text>
          </View>
          <View style={styles.th}>
            <Text>Balance Before </Text>
            <Text>₦ {item.balance_before}</Text>
          </View>

          <View style={styles.th}>
            <Text>Amount </Text>
            <Text>₦ {item.amount}</Text>
          </View>
          <View style={styles.th}>
            <Text>Balance After </Text>
            <Text>₦ {item.balance_after}</Text>
          </View>
          <View style={styles.th}>
            <Text>Date </Text>
            <Text>{item.created_at}</Text>
          </View>
          <View style={styles.tr}>
            <Text>Description </Text>
          </View>

          <Text style={styles.status}>{item.description}</Text>
        </View>
      </ScrollView>
    );
  };

  const searchWallet = () => {
    let query = search;

    if (query === null) {
      setisSearch(false);
      ToastAndroid.show('Please Enter a vaild search term', ToastAndroid.SHORT);
      return false;
    }

    const callback = (res) => {
      if (res.status === 'failed') {
        ToastAndroid.show(res.message, ToastAndroid.SHORT);
      }

      if (res.status === 'success') {
        setfeedWallet(null);
        setisSearch(false);
        let wallet = [...res.transactions.data];

        setfeedWallet(wallet);
      }
    };

    const onError = (err) => {
      console.log(err);
    };

    GET_WALLET_BY_SEARCH(query, Token, callback, onError);
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      <View style={styles.header}>
        <Text style={styles.headerText}>Wallet</Text>

        {isSearch ? (
          <View style={styles.inputgroup}>
            <TextInput
              style={styles.input}
              keyboardAppearance="dark"
              underlineColorAndroid="transparent"
              placeholder="Search..."
              placeholderTextColor="#979797"
              autoCapitalize="none"
              onChangeText={(value) => setSearch(value)}></TextInput>
          </View>
        ) : (
          <></>
        )}

        {isSearch ? (
          <TouchableOpacity style={styles.search} onPress={searchWallet}>
            <MaterialCommunityIcons
              name="file-search"
              size={24}
              color="black"
            />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            style={styles.search}
            onPress={() => setisSearch(!isSearch)}>
            <FontAwesome name="search" size={24} color="black" />
          </TouchableOpacity>
        )}
      </View>

      {/*wallet*/}

      <ScrollView style={styles.wallet}>
        {/*wallet*/}

        <FlatList
          data={feedWallet}
          renderItem={Response}
          keyExtractor={(item) => item.id.toString()}
          onEndReached={handleLoadMore}
          onEndReachedThreshold={10}
        />

        {/*wallet*/}
      </ScrollView>

      {/*wallet*/}

      <NavigationTab activeTab="wallet" />
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
  wallet: {
    width: width - 40,
    height,
    // padding: 20,
    // backgroundColor: '#4132CF',
    margin: 20,
  },
  walletTable: {
    position: 'relative',
    height: 'auto',
    padding: 10,
    borderWidth: 1,
    borderColor: '#999',
    flexDirection: 'column',
    marginTop: 10,
    marginBottom: 10,
  },
  th: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 2,
    marginBottom: 2,
  },
  status: {
    position: 'absolute',
    bottom: 10,
    right: 10,
    width: 'auto',
    padding: 10,
    backgroundColor: '#27ae60',
    color: '#fff',
    borderRadius: 5,
  },
  tr: {
    marginTop: 15,
    marginBottom: 15,
  },
  search: {
    position: 'absolute',
    top: 25,
    right: 25,
  },

  inputgroup: {
    position: 'absolute',
    top: 10,
    left: 10,
  },
  input: {
    width: width - 80,
    margin: 5,
    height: 50,
    backgroundColor: '#fff',
    fontWeight: '100',
    color: '#979797',
    borderWidth: 1,
    borderColor: '#999',
    padding: 10,
  },
});
