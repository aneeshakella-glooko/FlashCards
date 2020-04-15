import { AsyncStorage } from 'react-native'
import { DECKS_STORAGE_KEY, CARDS_STORAGE_KEY} from './decks'


export function fetchDeckResults () {
  return AsyncStorage.getItem(DECKS_STORAGE_KEY).then((x) => JSON.parse(x))
}

export function submitDeck (key, entry) {
  return AsyncStorage.mergeItem(DECKS_STORAGE_KEY, JSON.stringify({
    [key]: entry,
  }))
}

export function removeDeck (key) {
  return AsyncStorage.getItem(DECKS_STORAGE_KEY)
  .then((results) => {
    const data = JSON.parse(results)
    data[key] = undefined
    delete data[key]
    AsyncStorage.setItem(DECKS_STORAGE_KEY, JSON.stringify(data))
  })
}
