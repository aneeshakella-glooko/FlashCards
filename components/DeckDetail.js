import AddCard from './AddCard'
import AddDeck from './AddDeck'
import Quiz from './Quiz'
import React, { Component } from 'react'
import { View, Text, TouchableOpacity, Animated } from 'react-native'
import { connect } from 'react-redux'
import {styles, orange} from '../utils/colors'
import {deleteDeck} from  '../actions/index'
import {removeDeck} from '../utils/api'
import {clearLocalNotification, setLocalNotification} from '../utils/helpers'

class DeckDetail extends Component {
  state = {
    bounceValue: new Animated.Value(1)
  }

  componentDidMount() {
    const {bounceValue} = this.state
    Animated.sequence([
       Animated.timing(bounceValue, { duration: 200, toValue: 1.04}),
       Animated.spring(bounceValue, { toValue: 1, friction: 4})
     ]).start()
  }

  delete = () => {
    this.props.dispatch(deleteDeck(this.props.id))
    removeDeck(this.props.id).then(() =>   this.props.navigation.navigate(
       'Home'))
  }

  startQuiz = () => {
    this.props.navigation.navigate(
       'Quiz')

    clearLocalNotification()
        .then(setLocalNotification)
  }


  render() {

    const id = this.props.id
    return( <View style={styles.container}>
        <Animated.Text style={[styles.header, {transform: [{scale: this.state.bounceValue}]}]}> {this.props.curr_deck.name} </Animated.Text>
        <View style={styles.inputContainer}>
          <TouchableOpacity
            style={styles.saveButton}
            onPress={() => {
               this.props.navigation.navigate(
                'AddCard',
                { deck_id: id}
              )
            }}
          >
            <Animated.Text style={[styles.saveButtonText,{transform: [{scale: this.state.bounceValue}]}]}>Add Card</Animated.Text>
          </TouchableOpacity>
        </View>
        <View style={styles.inputContainer}>
          <TouchableOpacity
            style={styles.startButton}
            onPress={() => {
               this.props.navigation.navigate(
                'Quiz',
                { deck_id: id}
              )
            }}>
            <Animated.Text style={[styles.saveButtonText,{transform: [{scale: this.state.bounceValue}]}]}>Start a Quiz</Animated.Text>
          </TouchableOpacity>
        </View>

        <View style={styles.inputContainer}>
          <TouchableOpacity
            style={styles.deleteButton}
            onPress={this.delete}>
            <Animated.Text style={[styles.saveButtonText,{transform: [{scale: this.state.bounceValue}]}]}>Delete</Animated.Text>
          </TouchableOpacity>
        </View>
      </View>
    )
  }
}


function mapStateToProps ({decks}, {navigation}) {
  const { id } = navigation.state.params
  return {
    id,
    curr_deck: decks[id]
  }
}

export default connect(mapStateToProps)(DeckDetail)
