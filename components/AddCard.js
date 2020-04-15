import React, {Component} from 'react'
import { TextInput, Text, Button, View,TouchableOpacity, StyleSheet} from 'react-native';
import { NavigationActions } from 'react-navigation'
import {submitDeck} from '../utils/api'
import { connect } from 'react-redux'
import generateUID from '../utils/decks'
import {addCardToDeck} from  '../actions/index'

class AddCard extends Component {
  state = {
    question : '',
    answer: ''
  }

   submit = () => {
    if (this.state.question === '' || this.state.answer === ''){
      alert("Please Enter Some Text")
      return
    }

    const card_id = generateUID()
    const question = this.state.question
    const answer = this.state.answer
    this.props.dispatch(addCardToDeck(this.props.deck_id,
      card_id, question, answer))

    this.setState(() => ({ question: '', answer: ''}))
    this.toHome()

    this.props.curr_deck.cards[card_id] = {question, answer}
    submitDeck(this.props.deck_id, this.props.curr_deck)
  }





  toHome = () => {
    this.props.navigation.dispatch(NavigationActions.back({key: 'Decks'}))
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.header}> Submit Card </Text>
        <TextInput
        style={[styles.textInput]}
        placeholder="Enter Question Here"
        onChangeText={(question) => {
                      this.setState({question})
                    }
                  }
        value={this.state.question}/>

        <TextInput
        style={[styles.textInput]}
        placeholder="Enter Answer Here"
        onChangeText={(answer) => {
                      this.setState({answer})
                    }
                  }
        value={this.state.answer}/>

        <View style={styles.inputContainer}>
          <TouchableOpacity
            style={styles.saveButton}
            onPress={this.submit}>
            <Text style={styles.saveButtonText}>Save</Text>
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
  }
});


function mapStateToProps ({decks}, {navigation}) {
  const deck_id  = navigation.state.params.deck_id
  return {
    deck_id,
    curr_deck : decks[deck_id]
  }
}

export default connect(mapStateToProps)(AddCard)
