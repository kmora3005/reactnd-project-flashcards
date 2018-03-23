import React, { Component } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { connect } from 'react-redux'
import { white } from '../utils/helpers'
import TextButton from './TextButton'
import { fetchDecksResults } from '../utils/api'
import { AppLoading} from 'expo'

class DeckDetail extends Component {

  openNewCardScreen = () => {
    this.props.navigation.navigate(
      'NewCard',
      { deckKey: this.props.deckKey }
    )
  }

  openQuizViewScreen = () => {
    this.props.navigation.navigate(
      'QuizView',
      { deckKey: this.props.deckKey }
    )
  }

  render() {
    const { deck } = this.props
    
    return (
      <View style={styles.container}>
        <Text>{`${deck.title}`}</Text>
        <Text>{`${deck.cards.length} cards`}</Text>
        <TextButton style={{margin: 10}} onPress={this.openNewCardScreen}>
          Add Card
        </TextButton>
        <TextButton style={{margin: 10}} onPress={this.openQuizViewScreen}>
          Start Quiz
        </TextButton>
      </View>
    )
  }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: white,
      padding: 10,
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
    mapStateToProps,
  )(DeckDetail)