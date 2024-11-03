import Constants from 'expo-constants'
import {Text, StyleSheet, View } from 'react-native'
import RepositoryList from './RepositoryList'
import AppBar from './AppBar'

const Main = () => {
  return (
    <View >
      <AppBar />
      <RepositoryList />
    </View>
  )
}

export default Main