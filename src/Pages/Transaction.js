import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  StatusBar,
  ScrollView,
  FlatList,
  TouchableOpacity,
  ToastAndroid,
  TextInput,
} from 'react-native';
import NavigationTab from '../components/NavigationTab';
import {
  GET_TRANSACTIONS,
  GET_TRANSACTIONS_BY_PAGE,
  GET_TRANSACTIONS_BY_SEARCH,
} from '../api/actions';
import AsyncStorage from '@react-native-community/async-storage';

import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const {width, height} = Dimensions.get('window');

export default function Transactions() {
  const [isLoading, setisLoading] = useState(true);
  const [Token, setToken] = useState(null);
  const [current, setcurrent] = useState(0);
  const [pageCount, setpageCount] = useState(0);
  const [Transaction, setTransaction] = useState(null);

  const [search, setSearch] = useState(null);
  const [isSearch, setisSearch] = useState(false);

  const load = async () => {
    try {
      let data = await AsyncStorage.getItem('@user');
      if (data) {
        let parsedData = JSON.parse(data);
        setTimeout(() => {
          setToken(parsedData.token);
          trans(parsedData.token);
        }, 100);
      } else {
        Actions.push('login');
      }
    } catch (err) {
      console.log(err);
    }
  };

  const trans = (data) => {
    const callback = (res) => {
      setTimeout(() => {
        setcurrent(res.current_page);
        setpageCount(res.total);
        setTransaction(res.data);
        setisLoading(false);
      }, 1);
    };

    const onError = (err) => {
      console.log(err);
    };

    GET_TRANSACTIONS(data, callback, onError);
  };

  useEffect(() => {
    load();
    setisSearch(false);
  }, []);

  const handleLoadMore = () => {
    setisLoading(true);

    if (search != null) {
      return false;
    }

    let page = current + 1;
    if (pageCount >= page) {
      const callback = (res) => {
        let trans = [...Transaction, ...res.data];

        setTransaction(trans);
        setcurrent(res.current_page);
        setpageCount(res.total);
        setisLoading(false);
      };

      const onError = (err) => {
        console.log(err);
      };

      GET_TRANSACTIONS_BY_PAGE(page, Token, callback, onError);
    }
  };

  const searchTransactions = () => {
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
      if (res.data) {
        setTransaction(null);
        setisSearch(false);
        let trans = [...res.data];

        setTransaction(trans);
      }
    };

    const onError = (err) => {
      console.log(err);
    };

    GET_TRANSACTIONS_BY_SEARCH(query, Token, callback, onError);
  };

  const Response = ({item}) => {
    return (
      <ScrollView style={styles.transactions}>
        <View style={styles.transactionTable}>
          <View style={styles.th}>
            <Text>Ref </Text>
            <Text>{item.referrence}</Text>
          </View>
          <View style={styles.th}>
            <Text>Bundle </Text>
            <Text>{item.bundle}</Text>
          </View>

          <View style={styles.th}>
            <Text>Number </Text>
            <Text>{item.number}</Text>
          </View>
          <View style={styles.th}>
            <Text>Price </Text>
            <Text>{item.price}</Text>
          </View>
          <View style={styles.th}>
            <Text>Date </Text>
            <Text>{item.created_at}</Text>
          </View>
          <View style={styles.tr}>
            <Text>Message </Text>
            <Text>{item.message}</Text>
          </View>

          <Text style={styles.status}>Success</Text>
        </View>
      </ScrollView>
    );
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      <View style={styles.header}>
        <Text style={styles.headerText}>Transactions</Text>

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
          <TouchableOpacity style={styles.search} onPress={searchTransactions}>
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

      {/*transactions*/}

      <FlatList
        data={Transaction}
        renderItem={Response}
        keyExtractor={(item) => item.id.toString()}
        onEndReached={handleLoadMore}
        onEndReachedThreshold={10}
      />

      {/*transactions*/}

      {/*transactions*/}

      <NavigationTab activeTab="transactions" />
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
  transactions: {
    width: width - 40,

    margin: 20,
  },
  transactionTable: {
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
  },
  tr: {
    paddingTop: 20,
    paddingBottom: 20,
  },
  status: {
    position: 'absolute',
    bottom: 10,
    right: 10,
    width: 80,
    padding: 10,
    backgroundColor: '#27ae60',
    color: '#fff',
    borderRadius: 5,
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
