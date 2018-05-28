import React, { Component } from 'react'
import { connect } from 'react-redux'
import { 
	TextInput, 
	View, 
	TouchableOpacity, 
	Text, 
	StyleSheet,
	Alert 
} from 'react-native'

import { createDeck } from '../utils/api'
import { white, turquoise } from '../utils/colors'
import { addDeck } from '../actions'

class NewDeck extends Component {
	state = {
		text: null
	}

	customDeck = () => {
		const { decks } = this.props
		const deck = this.state.text

		if (deck === null) {
			Alert.alert("Uh Oh! Looks like you're missing a title!")
			return			
		}
		if (decks[deck]) {
			Alert.alert("Deck Exists, Try Again!")
			return 
		} else {
			const newDeck = {
				[deck]: { title: deck, questions: [] },
			}
			return createDeck(newDeck)
				.then((deck) => this.props.dispatch(addDeck(deck)))
				.then(() => {
					this.props.navigation.navigate('DeckList')
				})
				.catch((error) => console.warn('Error', error))
		}
	}

	render() {
		return (
			<View style={styles.container}>
				<View style={styles.inputBox}>
					<Text style={styles.text}>
						Give your deck a title!
					</Text>
					<TextInput
						value={this.state.text}
						style={styles.input}
						onChangeText={text => this.setState({ text })}
						placeholder={'Deck Title'}
						returnKeyType={'done'}
					/>
					<TouchableOpacity onPress={this.customDeck} style={styles.button}>
						<Text style={styles.buttonText}>Submit</Text>
					</TouchableOpacity>
				</View>
			</View>
		);
	}
}

const styles = StyleSheet.create ({
	container: {
		flex: 1,
		paddingTop: 40,
		backgroundColor: white,
		alignItems: 'center',
	},
	text: {
		color: turquoise,
		fontSize: 24,
		textAlign: 'center'
	},
	input: {
		width: 250,
		height: 50,
		padding: 10,
		borderWidth: 2,
		borderColor: turquoise,
		backgroundColor: white,
		margin: 30,
	},
	button: {
		backgroundColor: white,
		padding: 10,
		borderRadius: 2,
	},
	buttonText: {
		color: turquoise,
		fontSize: 22,
	},
	inputBox: {
		flexDirection: 'column',
		justifyContent: 'center',
		alignItems: 'center'
	},
})

const mapStateToProps = state => {
	return {
		decks: state,
	}
}

export default connect(mapStateToProps)(NewDeck)