import React from 'react';
import { StyleSheet, View, StatusBar } from 'react-native';
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import { createBottomTabNavigator, createStackNavigator, DrawerNavigator } from 'react-navigation'
import { FontAwesome, Ionicons } from '@expo/vector-icons'
import { Constants } from 'expo'

import DeckList from './components/DeckList'
import IndividualDeck from './components/IndividualDeck'
import QuizView from './components/QuizView'
import NewDeck from './components/NewDeck'
import NewQuestion from './components/NewQuestion'
import reducer from './reducers'
import { white, lightBlue, turquoise } from './utils/colors'
import { setLocalNotification } from './utils/helpers'


function MobileStatusBar({ backgroundColor, ...props }) {
  return (
    <View style={{backgroundColor, height: Constants.statusBarHeight }}>
      <StatusBar 
        translucent 
        backgroundColor={backgroundColor}
        {...props}
      />
    </View>
  );
}

const Tabs = createBottomTabNavigator ({
  DeckList: {
    screen: DeckList,
      navigationOptions: {
        tabBarLabel: 'Decks',
        tabBarIcon: ({ tintColor }) => <Ionicons name='ios-albums' size={35} color={tintColor} />
    }
  },
  NewDeck: {
    screen: NewDeck,
      navigationOptions: {
        tabBarLabel: 'New Deck',
        tabBarIcon: ({ tintColor }) => <Ionicons name='ios-create' size={35} color={tintColor} />
    }
  }
}, {
  tabBarOptions: {
    activeTintColor: turquoise,
    style: {
      height: 56,
      backgroundColor: white,
      shadowOffset: {
        width: 0,
        height: 3
      },
      shadowRadius: 6,
      shadowOpacity: 1
    }
  }
})

const MainNavigator = createStackNavigator({
  Home: {
    screen: Tabs,
    navigationOptions: {
     title: 'Mobile Flashcards',
     headerTintColor: white,
     headerStyle: {
      backgroundColor: turquoise
      }
    }
  },
  IndividualDeck: {
    screen: IndividualDeck,
    navigationOptions: {
      headerTintColor: white,
      headerStyle: {
        backgroundColor: turquoise
      }
    }
  },
  NewQuestion: {
    screen: NewQuestion,
    navigationOptions: {
      headerTintColor: white,
      headerStyle: {
        backgroundColor: turquoise
      }
    }
  },
  QuizView: {
    screen: QuizView,
    navigationOptions: {
      headerTintColor: white,
      headerStyle: {
        backgroundColor: turquoise
      }
    }
  }
});


export default class App extends React.Component {
  componentDidMount() {
    setLocalNotification()
  }
  render() {
    return (
      <Provider store={createStore(reducer)}>
        <View style={{flex: 1}}>
         <MobileStatusBar backgroundColor={turquoise} barStyle='light-content' />
         <MainNavigator />
        </View>
      </Provider> 
    );
  }
}

