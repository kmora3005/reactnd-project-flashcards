import React, { Component } from 'react'
import { View, TouchableOpacity, Text, TextInput, StyleSheet } from 'react-native'
import { connect } from 'react-redux'
import { purple, white } from '../utils/colors'
import TextButton from './TextButton'
import { guid } from '../utils/helpers'

class QuizView extends Component {
    state = {
        isAnswerMode:false,
        questionNumber:1,
        answerSuccess:0,
        currentAnswer:''
    }

    toogleMode = () => {
        this.setState({isAnswerMode:!this.state.isAnswerMode})
    }

    answerQuestionCorrectly = () => {
        const { questionNumber, answerSuccess } = this.state
        
        this.setState({isAnswerMode:false, questionNumber:questionNumber+1, answerSuccess: answerSuccess+1, currentAnswer:''})
        this.checkQuizFinished(answerSuccess+1)
    }

    answerQuestionIncorrectly = () => {
        const { questionNumber, answerSuccess } = this.state
        
        this.setState({isAnswerMode:false, questionNumber:questionNumber+1, currentAnswer:''})
        this.checkQuizFinished(answerSuccess)
    }

    checkQuizFinished = (answerSuccess) => {
        const { deck, deckKey, navigation } = this.props
        const { questionNumber } = this.state
        if (deck.cards.length <= questionNumber){
            navigation.navigate(
            'ScoreView',
            { questionAnswered: answerSuccess, deckKey }
            )
        }
    }

    questionView =()=>{
        const { deck } = this.props
        const { isAnswerMode, questionNumber, answerSuccess, currentAnswer } = this.state

        return (
        <View style={styles.center}>
            <Text>{ `${questionNumber}/${deck.cards.length}`}</Text>
            <Text>{ isAnswerMode ? `${deck.cards[questionNumber-1].answer}`:`${deck.cards[questionNumber-1].question}`}</Text>
            { !isAnswerMode ? <TextInput style={{height: 40, width: 200, borderColor: 'gray', borderWidth: 1} } value = {currentAnswer}
            onChangeText={(currentAnswer) => this.setState({currentAnswer})} />:<Text></Text>}
            <TextButton style={{padding: 10}} onPress={this.toogleMode}>
            { isAnswerMode ? 'Show question' : 'Show answer'}
            </TextButton>
            { !isAnswerMode ? <TextButton style={{padding: 10}} onPress={this.answerQuestionCorrectly}>
            Correct
            </TextButton>:<Text></Text>}
            { !isAnswerMode ? <TextButton style={{padding: 10}} onPress={this.answerQuestionIncorrectly}>
            Incorrect
            </TextButton>:<Text></Text>}
        </View>)
    }

    render() {
        const { deck } = this.props
        const { questionNumber } = this.state
        const isQuestionNumberValid=deck.cards.length>=questionNumber
        
        return (
            <View style={styles.center}>
                { isQuestionNumberValid ? this.questionView() : <Text>No more questions</Text>}
            </View>
        )
    }
}

const styles = StyleSheet.create({
    center: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 10,
        marginRight: 10,
      },
  })
  
  const mapStateToProps = (decks, { navigation }) => {
    const { deckKey } = navigation.state.params
  
    return {
        deckKey,
      deck: decks[deckKey],
    }
  }
  
  export default connect(
    mapStateToProps
  )(QuizView)