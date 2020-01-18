import React, { Component } from 'react'
import { StyleSheet, View, Text, Button } from 'react-native'
import dictionary from "../data"

class Game extends Component {
    state = {
        timer: 30,
        score: 0,
        currStep: 0,
        isGameOver: false,
        gameDictionary: []
    }

    componentDidMount() {
        this.newGame()
    }

    componentWillUnmount() {
        this.stop()
    }

    shuffle = arr => {
        for (let i = arr.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [arr[i], arr[j]] = [arr[j], arr[i]];
        }
        return arr;
    }

    newGame = () => {
        let gameDictionary = this.shuffle(dictionary).slice(0, 20)
        this.setState({
            gameDictionary
        })

        this.interval = setInterval(() => {
            if (this.state.timer <= 0) {
                this.gameOver()
                return
            }
            this.setState({
                timer: this.state.timer - 1
            })
        }, 1000)
    }

    nextStep = isCorrectAnswer => {
        this.setState({
            score: isCorrectAnswer ? this.state.score + 1 : this.state.score,
            currStep: this.state.currStep + 1
        }, () => {
            if (this.state.currStep >= 20) {
                this.gameOver()
            }
        })
    }

    stop = () => {
        clearInterval(this.interval)
    }

    gameOver = () => {
        this.stop()
        this.setState({
            isGameOver: true
        })
    }

    render() {
        const { timer, score, currStep, isGameOver, gameDictionary } = this.state
        
        if (!gameDictionary.length) {
            return <Text>Loading ...</Text>
        }

        return (
            <View style={styles.container}>
                {!isGameOver ? (
                    <View style={styles.container}>
                        <Text>Temps restant: {timer}s</Text>
                        <Text>Score: {currStep === 0 ? "0" : `${score}/${currStep}`}</Text>
                        <View>
                            <Text>{gameDictionary[currStep] && gameDictionary[currStep].text}</Text>
                            <View>
                                <Button
                                    title="test"
                                    onPress={() => this.nextStep(true)}
                                />
                                <Button
                                    title="test2"
                                    onPress={() => this.nextStep(false)}
                                />
                                <Button
                                    title="test3"
                                    onPress={() => this.nextStep(false)}
                                />
                                <Button
                                    title="test3"
                                    onPress={() => this.nextStep(false)}
                                />
                            </View>
                        </View>
                    </View>
               ) : (
                    <View style={styles.container}>
                        <Text>Game over</Text>
                        <Text>Ton score est de {score}/20</Text>
                    </View>
               )}
           </View>
        )
    }
}
export default Game

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    position: "relative"
  }
})
