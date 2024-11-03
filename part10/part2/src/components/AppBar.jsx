import { View, StyleSheet, Text, ScrollView } from "react-native";
import Constants from "expo-constants";
import { Link } from "react-router-native";

const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight,
    backgroundColor: "#24292e",
    paddingLeft: 3,
    flexDirection: 'row'
  },
  textColor: {
    color: "#e1e4e8",
    paddingTop: 15,
    paddingBottom: 10,
    paddingHorizontal: 10
  },
});

const AppBar = () => {
  return (
    <View style={styles.container}>
      <ScrollView horizontal>
      <Link to='/'><Text style={styles.textColor}>Repositories</Text></Link>
      <Link to='/sign-in'><Text style={styles.textColor}>Sign in</Text></Link>
      </ScrollView>
    </View>
  );
};

export default AppBar;
