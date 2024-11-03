import { View, StyleSheet, Text } from "react-native";
import Constants from "expo-constants";

const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight,
    backgroundColor: "#24292e",
    paddingBottom: 10,
    paddingLeft: 3,
  },
  textColor: {
    color: "#e1e4e8",
    paddingTop: 15
  },
});

const AppBar = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.textColor}>Repositories</Text>
    </View>
  );
};

export default AppBar;
