
import React, { Component } from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import { connect } from 'react-redux'
import {orange} from '../utils/colors'
import AddCard from './AddCard'
import AddDeck from './AddDeck'
import Quiz from './Quiz'
import {deleteDeck} from  '../actions/index'
import {removeDeck} from '../utils/api'

class DeckDetail extends Component {

  delete = () => {
    this.props.dispatch(deleteDeck(this.props.id))
    removeDeck(this.props.id).then(() =>   this.props.navigation.navigate(
       'Home'))
  }

  startQuiz = () => {
    this.props.navigation.navigate(
       'Quiz')
  }

  render() {
    console.log("HIIII")
    const id = this.props.id
    return( <View style={styles.container}>
        <Text style={styles.header}> {this.props.curr_deck.name} </Text>
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
            <Text style={styles.saveButtonText}>Add Card</Text>
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
            <Text style={styles.saveButtonText}>Start Quiz</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.inputContainer}>
          <TouchableOpacity
            style={styles.deleteButton}
            onPress={this.delete}>
            <Text style={styles.saveButtonText}>Delete</Text>
          </TouchableOpacity>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 45,
    backgroundColor: '#F5FCFF',
  },
  header: {
    fontSize: 25,
    textAlign: 'center',
    margin: 10,
    fontWeight: 'bold'
  },
  inputContainer: {
    paddingTop: 15
  },
  textInput: {
    borderColor: '#CCCCCC',
    borderTopWidth: 1,
    borderBottomWidth: 1,
    height: 50,
    fontSize: 25,
    paddingLeft: 20,
    paddingRight: 20
  },
  saveButton: {
    borderWidth: 1,
    borderColor: '#007BFF',
    backgroundColor: '#007BFF',
    padding: 15,
    margin: 5
  },
  saveButtonText: {
    color: '#FFFFFF',
    fontSize: 20,
    textAlign: 'center'
  },
  deleteButton: {
    borderWidth: 1,
    borderColor: '#C62033',
    backgroundColor: '#C62033',
    padding: 15,
    margin: 5
  },
  startButton: {
    borderWidth: 1,
    borderColor: '#C62033',
    backgroundColor: orange,
    padding: 15,
    margin: 5
  }
});


function mapStateToProps ({decks}, {navigation}) {
  const { id } = navigation.state.params
  return {
    id,
    curr_deck: decks[id]
  }
}

export default connect(mapStateToProps)(DeckDetail)
