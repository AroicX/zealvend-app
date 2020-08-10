import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from 'react-native';

import {Actions} from 'react-native-router-flux';
import Icon from 'react-native-vector-icons/FontAwesome5';
import AntDesign from 'react-native-vector-icons/AntDesign';
// import Feather from 'react-native-vector-icons/Feather';

const {width} = Dimensions.get('window');

export default function Navigation(props) {
  const {activeTab} = props;
  return (
    <View style={styles.bottom}>
      <TouchableOpacity style={styles.link} onPress={() => Actions.home()}>
        <AntDesign
          name="home"
          size={24}
          color={activeTab === 'dashboard' ? '#2980b9' : '#777'}
        />
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.link}
        onPress={() => Actions.transaction()}>
        <Icon
          name="list-alt"
          size={24}
          color={activeTab === 'transactions' ? '#2980b9' : '#777'}
        />
      </TouchableOpacity>
      <TouchableOpacity style={styles.link} onPress={() => Actions.wallet()}>
        <AntDesign
          name="wallet"
          size={24}
          color={activeTab === 'wallet' ? '#2980b9' : '#777'}
        />
      </TouchableOpacity>

      <TouchableOpacity style={styles.link} onPress={() => Actions.profile()}>
        <Icon
          name="user"
          size={24}
          color={activeTab === 'profile' ? '#2980b9' : '#777'}
        />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 30,
  },
  bottom: {
    backgroundColor: '#fff',
    position: 'absolute',
    bottom: -2,
    width,
    height: 64,
    flexDirection: 'row',
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    padding: 20,
    borderWidth: 1,
    borderTopColor: '#DBDBDB',
  },
  link: {
    width: 120,
    height: 64,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
