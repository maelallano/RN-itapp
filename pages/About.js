import React from 'react'
import { StyleSheet, View, Text } from 'react-native'

const About = () => (
    <View style={styles.container}>
        <Text style={styles.text}>
          Saviez-vous qu’il existe une liste de 100 mots qui sont utilisés dans 50% des conversations de la plupart des langues ?
          Cette application vous propose d'apprendre ces 100 mots en italien.
        </Text>
    </View>
)
export default About

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fcfcfc',
    padding: 20
  },
  text: {
    fontSize: 18,
    lineHeight: 27
  }
});