import { AsyncStorage } from 'react-native'
import { guid } from '../utils/helpers'

export const DECKS_STORAGE_KEY = 'Flashcards:decks'

const setDummyData = () => {
  let dummyData = {}
  const key1 = guid()
  const key2 = guid()
  const key3 = guid()
  const key4 = guid()
  dummyData[key1] = {key:key1, title:'test', cards:[{key:key3, question:'1+1?',answer:'2'},{key:key4, question:'1+11?',answer:'12'}]}
  dummyData[key2] = {key:key2, title:'test2', cards:[]}

  AsyncStorage.setItem(DECKS_STORAGE_KEY, JSON.stringify(dummyData))
  return dummyData
}

export const formatDecksResults = (results) => {
  return setDummyData()
}