import React, { Component } from 'react'
import { connect } from 'react-redux'
import { 
	Text, 
	View, 
	StyleSheet,
	TouchableOpacity 
} from 'react-native'

import { white, turquoise } from '../utils/colors'

class IndividualDeck extends Component {
	render() {
		const { title, questions } = this.props.navigation.state.params
		return (
			<View style={styles.container}>
				<View style={styles.titleBox}>
					<Text style={styles.title}>{title}</Text>
					<Text style={styles.questionLengthTitle}>
						{questions.length} cards
					</Text>
				</View>

				<View style={styles.deckBox}>
					<TouchableOpacity 
						style={[styles.addCard, styles.button]} 
						onPress={() => this.props.navigation.navigate('NewQuestion', { title: title, })}>
						<Text style={styles.addCardTitle}>Add New Card</Text>
					</TouchableOpacity>

					<TouchableOpacity
						style={[styles.startQuiz, styles.button]}
						onPress={() => this.props.navigation.navigate('QuizView', { title: title, questions: questions })}>
						<Text style={styles.startQuizTitle}>Start Quiz</Text>
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
	},
	deckBox: {
		marginTop: 180,
	},
	button: {
		paddingTop: 10,
		borderRadius: 2,
		height: 60,
		marginLeft: 50,
		marginRight: 50,
		marginTop: 20,
	},
	addCard: {
		backgroundColor: white,
		borderColor: turquoise,
		borderWidth: 2,
	},
	startQuiz: {
		backgroundColor: turquoise,
	},	
	addCardTitle: {
		color: turquoise,
		fontSize: 30,
		textAlign: 'center',
		padding: 0,
		borderRadius: 2,
	},

	startQuizTitle: {
		color: white,
		fontSize: 30,
		textAlign: 'center',
		padding: 0,
		borderRadius: 2,
	},
	questionLengthTitle: { fontSize: 20 },
	title: { fontSize: 36, color: turquoise },
	titleBox: {
		flexDirection: 'column',
		justifyContent: 'center',
		alignItems: 'center',
	},
})

function mapStateToProps(state) {
	return {
		decks: state,
	}
}

export default connect(mapStateToProps)(IndividualDeck)