export const ADD_CARD_TO_DECK = "ADD_CARD_TO_DECK"
export const ADD_DECK = "ADD_DECK"
export const RECEIVE_DECKS = "RECEIVE_DECKS"
export const DELETE_DECK = "DELETE_DECK"

export function receiveDecks (decks) {
  return {
    type: RECEIVE_DECKS,
    decks
  }
}
export  function addCardToDeck (deck_id, card_id, question, answer) {
  console.log(question)
  return {
    type: ADD_CARD_TO_DECK,
    deck_id,
    card_id,
    question,
    answer
  }
}

export function addDeck (id, name) {
  return {
    type: ADD_DECK,
    id,
    name,
  }
}

export function deleteDeck (id){
  return{
    type: DELETE_DECK,
    id
  }
}
