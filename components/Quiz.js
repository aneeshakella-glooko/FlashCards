import React, {Component} from 'react'
import {white, purple, orange} from '../utils/colors'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import { connect } from 'react-redux'
import { FontAwesome, AntDesign } from '@expo/vector-icons'

class Quiz extends Component {
    state = {
      seeAnswer : false,
      currCard : 0
    }

    seeLeft = () => {
      this.setState(
        {
          currCard: this.state.currCard - 1 < 0 ? 0: this.state.currCard - 1,
          seeAnswer: false
        } )
    }

    seeRight = () => {
      this.setState(
        {
          currCard: this.state.currCard + 1 < this.props.card_keys.length ?
          this.state.currCard + 1: this.state.currCard,
          seeAnswer: false
        } )
    }

    render () {
      return Object.keys(this.props.cards).length == 0 ?
      (<View style={styles.container}>
          <Text style={styles.header}> You need to add a card to start the quiz</Text>
      </View>
      )
      : (<View style={styles.container}>

        <Text style={styles.header}> {this.state.seeAnswer ?
          this.props.cards[this.props.card_keys[this.state.currCard]].answer
           :  this.props.cards[this.props.card_keys[this.state.currCard]].question} </Text>

          <View style={styles.buttonRow}>

          <AntDesign onClick={this.seeLeft} name='arrowleft' size={100}
          color={this.state.currCard == 0 ? "transparent" : "blue"}/>

            <TouchableOpacity
              style={styles.startButton}
              onPress={() => {
                 this.setState({
                   seeAnswer: !this.state.seeAnswer
                 })
              }
            }>

            <Text style={styles.saveButtonText}>{this.state.seeAnswer ?
                "See Question" : "See Answer" } </Text>
            </TouchableOpacity>

            <AntDesign onClick={this.seeRight} name='arrowright' size={100}
            color={this.state.currCard == this.props.card_keys.length -1
               ? "transparent" : "blue"}/>

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
  },
  buttonRow: {
    marginTop: 100,
    flexDirection: 'row',
    justifyContent: 'space-between',
    align: 'center'
  }
});


function mapStateToProps ({decks}, {navigation}) {
  const { deck_id } = navigation.state.params
  return {
    deck_id,
    card_keys: Object.keys(decks[deck_id].cards),
    cards: decks[deck_id].cards
  }
}

export default connect(mapStateToProps)(Quiz)
