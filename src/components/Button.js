import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';

export default function Button(props) {
  // const [loading, setloading] = useState(false);

  return (
    <View style={[styles.buttonHouse, props.css]}>
      <TouchableOpacity
        style={[styles.button, props.button]}
        onPress={props.func}
        disabled={props.loading}>
        {props.loading ? (
          <ActivityIndicator size="small" color="#fff" />
        ) : (
          <Text style={[styles.buttonText, props.buttonText]}>
            {props.name}
          </Text>
        )}
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  buttonHouse: {
    marginTop: 50,
  },
  button: {
    alignItems: 'center',
    backgroundColor: '#2980b9',
    padding: 15,
  },
  buttonText: {
    color: '#fff',
  },
});
