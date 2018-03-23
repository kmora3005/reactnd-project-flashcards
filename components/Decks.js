import React, { Component } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, FlatList, List } from 'react-native'
import { connect } from 'react-redux'
import { AppLoading} from 'expo'
import { receiveDecks, addDeck } from '../actions'
import { fetchDecksResults } from '../utils/api'
import { white } from '../utils/colors'
import { guid } from '../utils/helpers'

class Decks extends Component {
  state = {
    ready: false,
  }

  componentDidMount () {
    const { dispatch } = this.props
    
    fetchDecksResults().then((decks)=>dispatch(receiveDecks(decks)))
    .then(() => this.setState(() => ({ready: true})))
  }

  flatListItemSeparator = () => {
    return (
      <View
        style={{
          height: 1,
          width: "100%",
          backgroundColor: "#607D8B",
        }}
      />
    );
  }

  renderItem=( item ) => {
    return(
    <View style={{marginTop: 10, marginHorizontal: 10, paddingLeft: 10}}>
      <TouchableOpacity
            onPress={() => this.props.navigation.navigate(
              'DeckDetail',
              { deckKey: item.key }
            )}
          >
        <Text style={styles.itemStyle}>{`${item.title}`}</Text>
        <Text style={styles.itemStyle}>{`${item.cards.length} cards`}</Text>
      </TouchableOpacity>
    </View>
  )}

  render() {
    const { decks } = this.props
    const { ready } = this.state

    if (ready === false) {
      return <AppLoading />
    }
    
    let listDecks=[]
    Object.keys(decks).map((key) => {
      listDecks.push(decks[key])
    })
    
    return (
    <View style={styles.center}>
        <FlatList
          data={listDecks}
          ItemSeparatorComponent = {this.flatListItemSeparator}
          renderItem={({ item }) =>  this.renderItem(item)}
          keyExtractor={(item, index) => index}
        />
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
      height:400
    },
    itemStyle: {
      padding: 10,
      fontSize: 18,
      height: 44,
    },
  })
  
  const mapStateToProps = (decks) => {
    return {
        decks
    }
  }
  
  export default connect(
    mapStateToProps,
  )(Decks)