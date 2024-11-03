import { View, Text, StyleSheet, Image } from "react-native";
const styles = StyleSheet.create({
  name: {
    fontWeight: "700",
  },
  view: {
    backgroundColor: "#ffffff"
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
    backgroundColor: "#0366d6",
    alignSelf: 'flex-start',
    borderRadius: 3,
    padding: 5
  },
  language: {
    color: "white"
  },
  doubleText: {
    flexDirection: 'column',
    paddingHorizontal: 15
  },
  number: {
    fontWeight: 'bold',
    textAlign: 'center'
  },
  data: {
    flexDirection: 'row'
  }
});
function thousandItem(number){
  if (number / 1000 < 1) return number
  return (number / 1000).toFixed(1) + 'k'
}
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
      <View style={styles.data}>
      <View style={styles.doubleText}>
    <Text style={styles.number}>{thousandItem(item.stargazersCount)}</Text>
    <Text>Stars</Text>
    </View>
    <View style={styles.doubleText}>
    <Text style={styles.number}>{thousandItem(item.forksCount)}</Text>
    <Text>Forks</Text>
    </View>
    <View style={styles.doubleText}>
    <Text style={styles.number}>{thousandItem(item.reviewCount)}</Text>
    <Text>Reviews</Text>
    </View>
    <View style={styles.doubleText}>
    <Text style={styles.number}>{thousandItem(item.ratingAverage)}</Text>
    <Text>Rating</Text>
    </View>
  </View>
  </View>
);

export default RepositoryItem;
