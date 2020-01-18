import React from 'react'
import { StyleSheet, View, Text } from 'react-native'

const About = () => (
    <View style={styles.container}>
        <Text>This is ABOUT</Text>
    </View>
)
export default About

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});