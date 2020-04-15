import { ADD_DECK, ADD_CARD_TO_DECK, RECEIVE_DECKS } from '../actions'

export default function decks(state={}, action) {
  switch(action.type){
    case RECEIVE_DECKS:
      return {
        ...state,
        ...action.decks
      }
    case ADD_DECK:
      const {id, name} = action
      console.log(id, name)
      return {
        ...state,
        [action.id]: {
          name,
          cards:{}
        }
      }
    case ADD_CARD_TO_DECK:
      const {card, deck} = action
       return {
          ...state,
          [deck.id]: {
            ...state[deck.id],
            [card.id]: card
          }
        }
    default:
      return state
  }
}
