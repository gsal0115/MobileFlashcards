import React, { Component } from 'react'
import { View, StyleSheet, Text } from 'react-native'

import { white, lightBlue, turquoise } from '../utils/colors'

export default class SingleDeck extends Component {
	render() {
		const { title, questions } = this.props
		return (
			<View style={styles.deck}>
				<View>
					<Text style={styles.deckTitle}>{title}</Text>
					<Text style={styles.questions}>{questions && questions.length} cards</Text>
				</View>
			</View>
		);
	}
}


const styles = StyleSheet.create({
	deck: {
		flexDirection: 'row',
		marginTop: 10,
		height: 75,
		backgroundColor: white,
		justifyContent: 'center',
		alignItems: 'center',
	},
	deckTitle: {
		fontSize: 20,
		color: turquoise,
		textAlign: 'center',
	},
	questions: {
		textAlign: 'center',
		fontSize: 12,
		color: turquoise,
	},
})