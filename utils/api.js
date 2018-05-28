import { AsyncStorage } from 'react-native';

export const STORAGE_KEY = 'STORAGE_KEY'

const staticData = {
  React: {
    title: 'React',
    questions: [
      {
        question: 'What is React?',
        answer: 'A library for managing user interfaces'
      },
      {
        question: 'Where do you make Ajax requests in React?',
        answer: 'The componentDidMount lifecycle event'
      }
    ]
  },
  JavaScript: {
    title: 'JavaScript',
    questions: [
      {
        question: 'What is a closure?',
        answer: 'The combination of a function and the lexical environment within which that function was declared.'
      }
    ]
  }
}

export function starterData() {
	AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(staticData))
	return staticData
}

export function fetchDecks() {
	return AsyncStorage.getItem(STORAGE_KEY)
		.then((results) => {
			return results === null ? starterData() : JSON.parse(results)
		})
}

export function createDeck(deck) {
	return AsyncStorage.mergeItem(STORAGE_KEY, JSON.stringify(deck))
}

export function addCardToDeck({ card, deckTitle }) {
	return AsyncStorage.getItem(STORAGE_KEY, (err, result) => {
		let decks = JSON.parse(result)

		let newQuestions = JSON.parse(
			JSON.stringify(decks[deckTitle].questions)
		)
		newQuestions[newQuestions.length] = card

		const value = JSON.stringify({
			[deckTitle]: { title: deckTitle, questions: newQuestions },
		})
		AsyncStorage.mergeItem(STORAGE_KEY, value)
	})
}