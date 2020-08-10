import React, { useEffect } from "react";
import { View, StyleSheet } from "react-native";
import { Actions } from "react-native-router-flux";
import AsyncStorage from "@react-native-community/async-storage";
export default function Blank() {
  const load = async () => {
    try {
      let data = await AsyncStorage.getItem("@user");
      if (data) {
        Actions.push("home");
      } else {
        Actions.push("login");
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    load();
  }, []);
  return <View style={styles.container}></View>;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 30,
    alignItems: "center",
    justifyContent: "center",
  },
});
