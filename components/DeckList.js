import React, { Component } from 'react'
import { connect } from 'react-redux'
import { 
	Text, 
	View, 
	StyleSheet,
	TouchableOpacity,
	FlatList 
} from 'react-native'

import SingleDeck from './SingleDeck'
import { getDecks } from '../actions'
import { fetchDecks } from '../utils/api'
import { white, turquoise } from '../utils/colors'

class DeckList extends Component {
	componentDidMount() {
		const { dispatch } = this.props

		fetchDecks()
			.then((decks) => dispatch(getDecks(decks)))
			.then(({ decks }) => {
				return dispatch(getDecks(decks))
			})
			.catch((error) => {
				console.warn('Error while getting decks!', error)
			})
	}
	renderItem = ({ item }) => (
		<View style={styles.deck}>
			<TouchableOpacity onPress={() => this.props.navigate('IndividualDeck', item)}>
				<SingleDeck title={item.title} questions={item.questions} />
			</TouchableOpacity>
		</View>
	)
	render() {
		let data = Object.values(this.props.decks).sort(
			(a, b) => a.title > b.title,
		)
		
		return (
			<View style={styles.container}>
				<FlatList data={data} renderItem={this.renderItem} keyExtractor={(item, index) => index.toString()} />
			</View>
		);
	}
}


const styles = StyleSheet.create ({
	container: {
		flexDirection: 'row',
		justifyContent: 'center',
		backgroundColor: white,
		padding: 20
	},
	deck: {
		margin: 0,
		padding: 0,
	},
})

function mapStateToProps(state, ownProps) {
	return {
		decks: state,
		navigate: ownProps.navigation.navigate,
	}
}

export default connect(mapStateToProps)(DeckList)