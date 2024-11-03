import { View, Text, StyleSheet, Image } from "react-native";
const styles = StyleSheet.create({
  name: {
    fontWeight: "700",
  },
  view: {
    backgroundColor: "#ffffff",
  },
  rowView: {
    flexDirection: "row",
  },
  icon: {
    width: 50,
    height: 50,
  },
  language: {
    color: "#fffff",
    backgroundColor: "blue",
    fontSize: 16,
  },
  blueBackground: {
    backgroundColor: "0366d6",
    alignSelf: 'flex-start',
    borderRadius: 3,
    padding: 5
  },
  language: {
    color: "white"
  }
});
const RepositoryItem = ({ item }) => (
  <View style={styles.view}>
    <View style={styles.rowView}>
      <Image source={{ uri: item.ownerAvatarUrl }} style={styles.icon} />
      <View>
        <Text style={styles.name}>{item.fullName}</Text>
        <Text>{item.description}</Text>
        <View style={styles.blueBackground}>
          <Text style={styles.language}>{item.language}</Text>
        </View>
      </View>
    </View>
    <Text>Stars: {item.stargazersCount}</Text>
    <Text>Forks: {item.forksCount}</Text>
    <Text>Rating: {item.ratingAverage}</Text>
  </View>
);

export default RepositoryItem;
