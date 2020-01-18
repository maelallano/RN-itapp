import React from 'react'
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native'
import { Actions } from 'react-native-router-flux'

const Home = () => {
   const goToAbout = () => {
      Actions.about()
   }
   const goToGame = () => {
      Actions.game()
   }
   return (
      <View style={styles.container}>
         <Text style={styles.title}>100 mots pour apprendre l'italien</Text>
         <View style={styles.btnContainer}>
            <TouchableOpacity onPress={goToGame} style={styles.btn}>
               <Text style={styles.text}>Jouer</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={goToAbout} style={styles.btn}>
               <Text style={styles.text}>À propos</Text>
            </TouchableOpacity>
        </View>
      </View>
   )
}
export default Home

const styles = StyleSheet.create({
   container: {
      flex: 1,
      backgroundColor: '#fcfcfc',
      alignItems: 'center',
      justifyContent: 'center',
      position: "relative"
   },
   title: {
      fontSize: 20,
      fontWeight: "bold",
      position: "absolute",
      top: "20%"
   },
   btnContainer: {
      flexDirection: "row"
   },
   btn: {
      backgroundColor: "#DDDDDD",
      padding: 10,
      width: 100,
      alignItems: "center",
      borderRadius: 4,
      margin: 20
   },
   text: {
      fontSize: 16
   }
})
