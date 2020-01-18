import React, { Component } from 'react'
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native'
import dictionary from "../data"

class Game extends Component {
    state = {
        timer: 60,
        score: 0,
        currStep: 0,
        isGameOver: false,
        gameDictionary: [],
        answers: [],
        isCorrect: null
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

    newAnswers = () => {
        let tempDictionary = [...this.state.gameDictionary]
        const answer = tempDictionary.splice(this.state.currStep, 1)
        tempDictionary = this.shuffle(tempDictionary)

        const answers = [
            {
                text: answer[0].translation,
                isAnswer: true
            },
            {
                text: tempDictionary[0].translation,
                isAnswer: false
            },
            {
                text: tempDictionary[1].translation,
                isAnswer: false
            },
            {
                text: tempDictionary[2].translation,
                isAnswer: false
            }
        ]

        this.setState({
            answers: this.shuffle(answers)
        })
    }

    newGame = () => {
        let gameDictionary = this.shuffle(dictionary).slice(0, 20)
        this.setState({
            timer: 60,
            score: 0,
            currStep: 0,
            isGameOver: false,
            gameDictionary,
            isCorrect: null

        }, () => {
            this.newAnswers()
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
            currStep: this.state.currStep + 1,
            isCorrect: isCorrectAnswer
        }, () => {
            if (this.state.currStep >= 20) {
                this.gameOver()
                return
            }
            setTimeout(() => {
                this.setState({
                    isCorrect: null
                })
            }, 300)
            this.newAnswers()
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
        const { timer, score, currStep, isGameOver, gameDictionary, answers, isCorrect } = this.state
        
        if (!gameDictionary.length || !answers.length) {
            return <Text>Loading ...</Text>
        }

        return (
            <View style={styles.container}>
                {!isGameOver ? (
                    <View style={isCorrect === null ? styles.container : (isCorrect ? styles.rightAnswer : styles.wrongAnswer)}>
                        <View style={styles.infoContainer}>
                            <Text style={styles.text}>Temps restant: {timer}s</Text>
                            <Text style={styles.text}>Score: {currStep === 0 ? "0" : `${score}/${currStep}`}</Text>
                        </View>
                        <View>
                            <Text style={styles.title}>{gameDictionary[currStep] && gameDictionary[currStep].text}</Text>
                            <View style={styles.answersContainer}>
                                {answers.map((answer, index) => (
                                    <TouchableOpacity
                                        key={`answer__${index}`}
                                        onPress={() => this.nextStep(answer.isAnswer)}
                                        style={styles.btn}
                                    >
                                        <Text style={styles.text}>{answer.text}</Text>
                                    </TouchableOpacity>
                                ))}
                            </View>
                        </View>
                    </View>
               ) : (
                    <View style={styles.container}>
                        <Text style={styles.text}>Fin de partie</Text>
                        <Text style={styles.text}>Ton score est de {score}/20</Text>
                        <TouchableOpacity
                            onPress={this.newGame}
                            style={styles.btn}
                        >
                            <Text style={styles.text}>Réessayer</Text>
                        </TouchableOpacity>
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
       backgroundColor: '#fcfcfc',
       alignItems: 'center',
       justifyContent: 'center',
       position: "relative"
    },
    infoContainer: {
        position: "absolute",
        top: "5%",
        left: "10%"
    },
    title: {
       fontSize: 24,
       fontWeight: "bold",
       textAlign: "center",
       marginBottom: 40
    },
    btnContainer: {
       flexDirection: "row"
    },
    answersContainer: {
        flexWrap: "wrap",
        flexDirection: "row",
        justifyContent: "center"
    },
    btn: {
       backgroundColor: "#DDDDDD",
       padding: 16,
       width: 140,
       alignItems: "center",
       borderRadius: 4,
       margin: 20
    },
    text: {
       fontSize: 18
    },
    rightAnswer: {
        flex: 1,
        backgroundColor: 'green',
        alignItems: 'center',
        justifyContent: 'center',
        position: "relative"
    },
    wrongAnswer: {
        flex: 1,
        backgroundColor: 'red',
        alignItems: 'center',
        justifyContent: 'center',
        position: "relative"
    }
})