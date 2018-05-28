import React, { Component } from 'react'
import { connect } from 'react-redux'
import { 
	Text, 
	View, 
	StyleSheet,
	TouchableOpacity 
} from 'react-native'

import { white, turquoise, red, green } from '../utils/colors'
import { clearLocalNotification, setLocalNotification } from '../utils/helpers'

class QuizView extends Component {
	state = {
		questionsIndex: 0,
		correct: 0,
		flipCard: false,
	}

	flipCard = () => {
		this.setState(state => ({ flipCard: !state.flipCard }))
	} 

	startQuiz = () => {
		this.setState({ questionsIndex: 0, correct: 0, flipCard: false })
		clearLocalNotification().then(setLocalNotification)
	}

	backToDeck = () => {
		this.props.navigation.goBack()
	}

	answerCorrect = () => {
		this.setState(state => ({
			correct: state.correct + 1,
			questionsIndex: state.questionsIndex + 1,
			flipCard: false,
		}))
	}

	answerIncorrect = () => {
		this.setState(state => ({
			questionsIndex: state.questionsIndex + 1,
			flipCard: false,
		}))
	}

	renderShowQuestion = (questions, questionsIndex) => {
		return (
			<View style={styles.questionBox}>
				<Text style={styles.answerTitle}>
					{questions[questionsIndex].answer}
				</Text>

				<TouchableOpacity onPress={this.flipCard}>
					<Text style={styles.questionText}>Question</Text>
				</TouchableOpacity>
			</View>
		)
	}

	renderFlipCard = (questions, questionsIndex) => {
		return (
			<View style={{ alignItems: 'center' }}>
				<Text style={styles.questionTitle}>
					{questions[questionsIndex].question}
				</Text>

				<TouchableOpacity onPress={this.flipCard}>
					<Text style={styles.answerText}>Answer</Text>
				</TouchableOpacity>
			</View>
		)
	}

	renderRemaindingQuestions = (questionsRemainder, questionsLength) => {
		return (
			<View>
				<View>
					<Text>
						{questionsRemainder} / {questionsLength}
					</Text>
				</View>
			</View>
		)
	}

	renderButtons = () => {
		return (
			<View style={styles.quizViewBox}>
				<TouchableOpacity
					onPress={this.answerCorrect}
					style={[styles.correct, styles.button]}
				>
					<Text style={styles.correctText}>Correct</Text>
				</TouchableOpacity>
				<TouchableOpacity
					onPress={this.answerIncorrect}
					style={[styles.incorrect, styles.button]}
				>
					<Text style={styles.incorrectText}>Incorrect</Text>
				</TouchableOpacity>
			</View>
		)
	}

 	renderQuizSummary = (correct, questionsLength) => {
 		return (
 			<View style={styles.container}>
 				<Text style={styles.summaryText}>
 					Score: {Number(correct / questionsLength * 100).toFixed()}%
 				</Text>

 				<View style={{ alignItems: 'center', justifyContent: 'space-around', flex: 2 }}>
 					<View style={styles.container}>
 						<TouchableOpacity
 							onPress={this.startQuiz}
 							style={[styles.button, styles.btn]}
 						>
 							<Text style={styles.quizTitle}>Start Quiz</Text>
 						</TouchableOpacity>
 						<TouchableOpacity
 							onPress={this.backToDeck}
 							style={[styles.button, styles.btn]}
 						>
 							<Text style={styles.backBtn}>Back to Deck</Text>
 						</TouchableOpacity>
 					</View>
 				</View>
 			</View>
 		)
 	}
 

	render() {
		const { questions, title } = this.props.navigation.state.params
		const { questionsIndex, flipCard, correct } = this.state 
		const questionsLength = questions.length
		const questionsRemainder = questionsLength - questionsIndex
		const questionsAvailable = questionsIndex < questionsLength

		return (
			<View style={{flex: 1}}>
				{questionsAvailable ? (
					<View style={styles.container}>
						<View style={styles.view}>
							{this.renderRemaindingQuestions(
								questionsRemainder,
								questionsLength,
							)} 
						</View>
						<View style={styles.viewTwo}>
							<View> 
								{flipCard ? (
									<View>
										{this.renderShowQuestion(
											questions,
											questionsIndex,
										)}
									</View>
								) : (
									<View style={{alignItems: 'center'}}>
										{this.renderFlipCard(
											questions,
											questionsIndex,
										)}
									</View>
							)}
							</View>
						</View>

						<View style={{alignItems: 'center', justifyContent: 'space-around', flex: 2 }}>
							{this.renderButtons()}
						</View>
					</View>
				) : (
					<View style={styles.container}>
						{this.renderQuizSummary(correct, questionsLength)}
					</View>
				)}				
			</View>
		);
	}
}

const styles = StyleSheet.create ({
	container: {
		flex: 1,
		padding: 40,
		backgroundColor: white,
	},
	quizViewBox: {
		margin: 20,
		alignItems: 'center',
	},
	view: {
		justifyContent: 'flex-start',
		flex: 1,
	},
	viewTwo: {
		flex: 4,
	},
	button: {
		paddingTop: 20,
		borderRadius: 2,
		height: 60,
		marginLeft: 50,
		marginRight: 50,
		marginTop: 30,
		width: 250,
		height: 60,
	},
	questionTitle: {
		fontSize: 36,
	},
	questionText: {
		fontSize: 18,
		color: turquoise,
	},
	questionBox: {
		alignItems: 'center',
	},
	answerText: {
		fontSize: 18,
		color: red,
	},
	answerTitle: {
		fontSize: 36,
		textAlign: 'center',
	},
	correct: {
		backgroundColor: green,
	},
	correctText: {
		color: white,
		fontSize: 22,
		textAlign: 'center',
		padding: 0,
		borderRadius: 2,
	},
	incorrect: {
		backgroundColor: red,
	},
	incorrectText: {
		color: white,
		fontSize: 22,
		textAlign: 'center',
		padding: 0,
		borderRadius: 2,
	},
	backBtn: {
		color: turquoise,
		fontSize: 22,
		textAlign: 'center',
	},
	quizTitle: {
		color: turquoise,
		fontSize: 22,
		textAlign: 'center',
		padding: 0,
		borderRadius: 2,
	},
	btn: {
		borderColor: turquoise,
		padding: 10,
		borderWidth: 3,
	},
	summaryText: {
		color: turquoise,
	},
})

function mapStateToProps(state) {
	return {
		decks: state,
	}
}

export default connect(mapStateToProps)(QuizView)