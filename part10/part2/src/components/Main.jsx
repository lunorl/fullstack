import Constants from 'expo-constants'
import {Text, StyleSheet, View } from 'react-native'
import RepositoryList from './RepositoryList'
import { Router, Routes, Navigate, Route } from 'react-router-native'
import AppBar from './AppBar'
import SignIn from './SignIn'

const styles = StyleSheet.create({
  background: {
    backgroundColor: '#e1e5e8',
    flex: 1
  }
})
const Main = () => {
  return (
    <View style={styles.background}>
      <AppBar />
      <View style={styles.background}>
      <Routes>
        <Route path="/" element={<RepositoryList />} />
        <Route path="*" element={<Navigate to="/" replace />} />
        <Route path="/sign-in" element={<SignIn />} />
      </Routes>
      </View>
    </View>
  )
}

export default Main