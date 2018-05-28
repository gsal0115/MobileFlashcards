import React, { Component } from 'react'
import { connect } from 'react-redux'
import { 
	Text, 
	View, 
	StyleSheet,
	TextInput,
	TouchableOpacity,
	Alert 
} from 'react-native'

import { addCardToDeck } from '../utils/api'
import { white, turquoise } from '../utils/colors'

class NewQuestion extends Component {
	state = {
		question: null,
		answer: null,
	}

	addNewCard = () => {
		const { question, answer } = this.state
		const deckTitle = this.props.navigation.state.params.title
		const card = { question, answer } 

		if (question === null) {
			Alert.alert('I think you forgot to add a question!')
		} else {
			addCardToDeck({ card, deckTitle })
				.then(() => {
					this.props.navigation.navigate('IndividualDeck', {
						title: deckTitle,
						questions: this.props.navigation.state.params,
					})
				})
		}
	}

	render() {
		const title = this.props.navigation.state.params.title 

		return (
			<View style={styles.container}>
				<View style={styles.titleBox}>
					<Text style={styles.titleText}>{title}</Text>
				</View>
				<View style={{ margin: 20, alignItems: 'center' }}> 
					<Text style={styles.text}>Question</Text>
					<View>
						<TextInput
							value={this.state.question}
							style={styles.input}
							onChangeText={question => this.setState({ question })}
							placeholder={'Enter Question'}
							returnKeyType={'done'}
						/>
					</View>
				</View>
				<View style={{ margin: 20, alignItems: 'center' }}>
					<Text style={styles.text}>Answer</Text>
					<TextInput
						value={this.state.answer}
						style={styles.input}
						onChangeText={answer => this.setState({ answer })}
						placeholder={'Enter Answer'}
						returnKeyType={'done'}
					/>
				</View>
				<TouchableOpacity onPress={this.addNewCard} style={[styles.button, styles.submit]}>
					<Text style={styles.buttonText}>Submit</Text>
				</TouchableOpacity>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		paddingTop: 40,
		backgroundColor: white,
	},
	text: {
		color: turquoise,
		fontSize: 20,
		textAlign: 'center',
	},
	input: {
		width: 250,
		height: 50,
		padding: 8,
		borderWidth: 3,
		borderColor: turquoise,
		backgroundColor: white,
		alignItems: 'center',
	},
	button: {
		backgroundColor: turquoise,
		padding: 8,
		borderRadius: 2,
		margin: 40,
	},
	buttonText: {
		color: white,
		fontSize: 22,
		textAlign: 'center',
	},
	submit: {
		margin: 50,
	},
	titleBox: {
		flexDirection: 'column',
		justifyContent: 'center',
		alignItems: 'center',
	},
	titleText: {
		fontSize: 36,
		color: turquoise, 
	},
})

function mapStateToProps(state) {
	return {
		decks: state,
	}
}

export default connect(mapStateToProps)(NewQuestion)