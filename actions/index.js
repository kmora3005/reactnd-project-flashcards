export const RECEIVE_DECKS = 'RECEIVE_DECKS'
export const ADD_DECK = 'ADD_DECK'
export const UPDATE_DECK = 'UPDATE_DECK'

export const receiveDecks = (decks) => {
  return {
    type: RECEIVE_DECKS,
    decks,
  }
}

export const addDeck = (deck) => {
  return {
    type: ADD_DECK,
    deck,
  }
}

export const updateDeck = (deck) => {
  return {
    type: UPDATE_DECK,
    deck,
  }
}