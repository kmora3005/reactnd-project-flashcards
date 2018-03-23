import React, { Component } from 'react'
import { View, TouchableOpacity, Text, TextInput, StyleSheet } from 'react-native'
import { connect } from 'react-redux'
import { NavigationActions } from 'react-navigation'
import { submitCard } from '../utils/api'
import { updateDeck } from '../actions'
import { purple, white } from '../utils/colors'
import TextButton from './TextButton'
import { guid } from '../utils/helpers'

class NewCard extends Component {
  state = {
      key:'',
      question:'',
      answer:''
  }

  submit = () => {
      const card = this.state
      const {deck, goBack, updateDeck, navigation } = this.props
      const key = guid()
      card.key=key
      deck.cards.push(card)
      
      updateDeck({[deck.key]: deck})
      submitCard({card, key:deck.key})
      navigation.pop()
      navigation.pop()
      navigation.navigate(
        'DeckDetail',
        { deckKey: deck.key }
      )
    }

  render() {
    return (
    <View style={styles.center}>
        <Text>Question:</Text>
        <TextInput style={{height: 40, width: 200, borderColor: 'gray', borderWidth: 1} } ref= {(el) => { this.question = el; }}
          onChangeText={(question) => this.setState({question})}/>
        <Text>Answer:</Text>
        <TextInput style={{height: 40, width: 200, borderColor: 'gray', borderWidth: 1} } ref= {(el) => { this.answer = el; }}
          onChangeText={(answer) => this.setState({answer})}/>
        <TextButton style={{padding: 10}} onPress={this.submit}>
        Submit
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
    const { deckKey } = navigation.state.params
  
    return {
        deckKey,
      deck: decks[deckKey],
    }
  }
  
  const mapDispatchToProps = (dispatch, { navigation }) => {
  
    return {
      goBack: () => navigation.goBack(),
      updateDeck:(deck) => dispatch(updateDeck(deck))
    }
  }
  
  export default connect(
    mapStateToProps,
    mapDispatchToProps,
  )(NewCard)