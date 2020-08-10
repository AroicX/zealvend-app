import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TextInput,
  TouchableOpacity,
} from "react-native";

const { width, height } = Dimensions.get("window");

export default function Token() {
  return (
    <View style={styles.container}>
      <View style={{ alignSelf: "center", marginTop: 60 }}>
        <Text
          style={{
            fontSize: 28,
            color: "#333",
            fontWeight: "bold",
            margin: 30,
          }}
        >
          Hi, Joseph
        </Text>
      </View>
      <View style={styles.hr}></View>
      <View style={styles.tokenBody}>
        <Text style={styles.textlabel}>
          Enter the token sent to your registered email{" "}
        </Text>
        <View style={styles.styledBox}></View>
        <TextInput
          style={styles.input}
          keyboardAppearance="dark"
          keyboardType="numeric"
          underlineColorAndroid="transparent"
          maxLength={6}
          placeholder="9 6 1 7 9 0"
          placeholderTextColor="#979797"
          autoCapitalize="none"
        />

        <TouchableOpacity style={{ alignItems: "center" }}>
          <Text
            style={{
              fontSize: 16,
              color: "#1eb6c2",
              textDecorationLine: "underline",
            }}
          >
            Verify my account
          </Text>
        </TouchableOpacity>
        <View
          style={{ flexDirection: "row", justifyContent: "center", margin: 20 }}
        >
          <Text>Didn't get a token?</Text>
          <TouchableOpacity style={{ alignItems: "center" }}>
            <Text
              style={{
                // fontSize: 16,
                color: "#1eb6c2",
                textDecorationLine: "underline",
              }}
            >
              Click here to resend
            </Text>
          </TouchableOpacity>
        </View>
        <View
          style={{ flexDirection: "row", justifyContent: "center", margin: 1 }}
        >
          <Text>Not Joseph?</Text>
          <TouchableOpacity style={{ alignItems: "center" }}>
            <Text
              style={{
                // fontSize: 16,
                color: "#1eb6c2",
                textDecorationLine: "underline",
              }}
            >
              Login
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 30,
    justifyContent: "center",
  },
  hr: {
    width,
    height: 1,
    backgroundColor: "#999",
    padding: 0.5,
    margin: 10,
  },
  tokenBody: {
    alignSelf: "center",
    height: 400,
    padding: 10,
  },
  textlabel: {
    position: "absolute",
    top: 40,
    left: 35,
    backgroundColor: "#fff",
    width: width - 150,
    fontSize: 18,
    fontWeight: "900",
    textAlign: "center",
    zIndex: 1,
  },
  styledBox: {
    position: "relative",
    top: 50,
    width: width - 100,
    borderWidth: 1,
    borderColor: "#333",
    borderRadius: 3,
    backgroundColor: "#fff",
    padding: 40,
  },
  input: {
    width: width - 150,
    margin: 25,
    height: 50,
    backgroundColor: "#fff",
    fontWeight: "600",
    color: "#333",
    borderWidth: 1,
    borderColor: "#333",
    borderRadius: 3,
    padding: 10,
    fontSize: 20,
    textAlign: "center",
  },
});
