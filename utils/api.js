import { AsyncStorage } from 'react-native'
import { formatDecksResults, DECKS_STORAGE_KEY } from './_decks'

export const fetchDecksResults = () => {
  return AsyncStorage.getItem(DECKS_STORAGE_KEY)
    .then(formatDecksResults)
}

export const submitDeck = ({deck, key} ) => {
  return AsyncStorage.mergeItem(DECKS_STORAGE_KEY, JSON.stringify({
    [key]:deck
  }))
}

export const submitCard = ({card,key})=> {
  return AsyncStorage.getItem(DECKS_STORAGE_KEY)
    .then((results) => {
      const data = JSON.parse(results)
      //console.log(data[key])
      data[key].cards.push(card)
      
      AsyncStorage.setItem(DECKS_STORAGE_KEY, JSON.stringify(data))
    })
}