import { StatusBar } from 'expo-status-bar';
import { Pressable, StyleSheet, Text, View, Alert } from 'react-native';
import Main from './src/components/Main'
const HelloWorld = props => {
  return <Text>Hello world!</Text>
}

const PressableText = props => {
  return (
    <Pressable
      onPress={() => Alert.alert('You pressed the text!')}
  >
      <Text>You can press me</Text>
  </Pressable>
  )
}
export default function App() {
  return (
    <Main />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
