import React, { Component } from 'react'
import { View, TouchableOpacity, Text, TextInput, StyleSheet } from 'react-native'
import { connect } from 'react-redux'
import { NavigationActions } from 'react-navigation'
import { submitDeck } from '../utils/api'
import { addDeck } from '../actions'
import { purple, white } from '../utils/colors'
import TextButton from './TextButton'
import { guid } from '../utils/helpers'

class NewDeck extends Component {
  state = {
      key:'',
      title:'',
      cards:[]
  }

  toHome = () => {
      this.props.navigation.dispatch(NavigationActions.back({key: 'NewDeck'}))
    }

  submit = () => {
    const key = guid()
    const deck = this.state
    deck.key=key
    
    this.props.dispatch(addDeck({[key]: deck}))
    this.toHome()
    
    submitDeck({deck, key})
  }

  render() {
      return (
      <View style={styles.center}>
          <Text>What is the title of your new deck?</Text>
          <TextInput style={{height: 40, width: 200, borderColor: 'gray', borderWidth: 1} } ref= {(el) => { this.title = el; }}
            onChangeText={(title) => this.setState({title})}/>
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

  const mapStateToProps = (decks) => {
    return {
        decks
    }
  }
  
  export default connect(
    mapStateToProps,
  )(NewDeck)