import React, { Component } from 'react'
import { View, TouchableOpacity, Text, TextInput, StyleSheet } from 'react-native'
import { connect } from 'react-redux'
import { purple, white } from '../utils/colors'
import TextButton from './TextButton'
import { guid, clearLocalNotification, setLocalNotification } from '../utils/helpers'

class ScoreView extends Component {
  openDeckDetailScreen = () => {
    this.props.navigation.pop()
    this.props.navigation.pop()
    this.props.navigation.pop()
    this.props.navigation.navigate(
      'DeckDetail',
      { deckKey: this.props.deckKey }
    )
  }

  openQuizView = () => {
    this.props.navigation.pop()
    this.props.navigation.pop()
    this.props.navigation.navigate(
      'QuizView',
      { deckKey: this.props.deckKey }
    )
  }

  componentDidMount() {
    clearLocalNotification().then(setLocalNotification)
  }

  render() {
    const { deck,questionAnswered } = this.props
    
    return (
    <View style={styles.center}>
        <Text>Question answered:{`${questionAnswered}`}</Text>
        <TextButton style={{padding: 10}} onPress={this.openQuizView}>
        Restart Quiz
        </TextButton>
        <TextButton style={{padding: 10}} onPress={this.openDeckDetailScreen}>
        Back to Deck
        </TextButton>
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
    const { deckKey, questionAnswered } = navigation.state.params
  
    return {
        deckKey,
        questionAnswered,
      deck: decks[deckKey],
    }
  }
  
  export default connect(
    mapStateToProps,
  )(ScoreView)