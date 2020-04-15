import { ADD_DECK, ADD_CARD_TO_DECK, RECEIVE_DECKS, DELETE_DECK} from '../actions'

export default function decks(state={}, action) {
  switch(action.type){
    case RECEIVE_DECKS:
      return {
        ...state,
        ...action.decks
      }
    case ADD_DECK:
      const {id, name} = action
      return {
        ...state,
        [action.id]: {
          name,
          cards:{}
        }
      }
    case ADD_CARD_TO_DECK:
      const {deck_id, card_id, question, answer} = action
       return {
          ...state,
          [deck_id]: {
            ...state[deck_id],
            cards: {
              ...state[deck_id].cards,
              [card_id] : {
                question,
                answer
              }
            }
          }
        }
    case DELETE_DECK:
        delete state[action.id]
        return state
    default:
      return state
  }
}
