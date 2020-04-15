export const ADD_CARD_TO_DECK = "ADD_CARD_TO_DECK"
export const ADD_DECK = "ADD_DECK"
export const RECEIVE_DECKS = "RECEIVE_DECKS"

export  function receiveDecks (decks) {
  return {
    type: RECEIVE_DECKS,
    decks
  }
}
export  function addCardToDeck (card, deck) {
  return {
    type: ADD_CARD,
    card,
    deck
  }
}

export  function addDeck (id, name) {
  return {
    type: ADD_DECK,
    id,
    name,
  }
}
