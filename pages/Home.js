import React from 'react'
import { StyleSheet, View, Text, Button } from 'react-native';
import { Actions } from 'react-native-router-flux';

const Home = () => {
   const goToAbout = () => {
      Actions.about()
   }
   const goToGame = () => {
      Actions.game()
   }
   return (
      <View style={styles.container}>
         <Text>100 mots pour apprendre l'italien</Text>
         <View style={styles.btnContainer}>
            <Button 
                title="Jouer"
                onPress={goToGame}
            />
            <Button 
                title="À propos"
                onPress={goToAbout}
            />
        </View>
      </View>
   )
}
export default Home

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    position: "relative"
  },
  btnContainer: {
      flexDirection: "row",
  }
});
