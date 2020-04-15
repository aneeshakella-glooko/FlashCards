// utils/_calendar.js
import { AsyncStorage } from 'react-native'

export const DECKS_STORAGE_KEY = 'Flashcards:decks'
export const CARDS_STORAGE_KEY = 'Flashcards:cards'


export default function generateUID () {
  return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)
}
