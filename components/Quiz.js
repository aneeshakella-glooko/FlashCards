import React, {Component} from 'react'
import {white, purple, orange, green, red} from '../utils/colors'
import { View, Text, StyleSheet, TouchableOpacity, Fragment } from 'react-native'
import { connect } from 'react-redux'
import { FontAwesome, AntDesign } from '@expo/vector-icons'

class Quiz extends Component {
    state = {
      seeAnswer : false,
      currCard : 0,
      correct: 0
    }

    render () {

      if(this.props.card_keys.length == 0){
        return (<View style={styles.container}>
            <Text style={styles.header}> You need to add a card to start the quiz</Text>
        </View> )
      }

      console.log(this.props.card_keys.length, this.state.currCard)
      if(this.props.card_keys.length == this.state.currCard){
        return (<View style={styles.container}>
            <Text style={styles.header}>
              You scored {this.state.correct * 100/this.props.card_keys.length}%!
            </Text>
        </View> )
      }

      return (
           <View style={styles.container}>
              <Text style={styles.header}> {this.state.seeAnswer ?
                this.props.cards[this.props.card_keys[this.state.currCard]].answer
                : this.props.cards[this.props.card_keys[this.state.currCard]].question
               }
              </Text>

                  <TouchableOpacity
                    style={styles.startButton}
                    onPress={() => {
                       this.setState({
                         seeAnswer: !this.state.seeAnswer
                       })}}>

                    <Text style={styles.saveButtonText}>{this.state.seeAnswer ?
                        "See Question" : "See Answer" } </Text>
                  </TouchableOpacity>

            {!this.state.seeAnswer ?
              (<View>
              </View>)
                : (<View>
                      <TouchableOpacity
                        style={styles.correctButton}
                        onPress={() => {
                           this.setState({
                             correct: this.state.correct + 1,
                             currCard: this.state.currCard + 1,
                             seeAnswer: false
                           })
                        }
                      }>

                        <Text style={styles.saveButtonText}> Correct </Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                          style={styles.wrongButton}
                          onPress={() => {
                             this.setState({
                               seeAnswer: false,
                               currCard: this.state.currCard + 1
                             })
                          }
                        }>

                        <Text style={styles.saveButtonText}> Incorrect </Text>
                        </TouchableOpacity>

                   </View>
                )}
            </View>
        )
    }
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 45,
    backgroundColor: '#F5FCFF',
    justifyContent: "space-between"
  },
  header: {
    fontSize: 25,
    textAlign: 'center',
    margin: 10,
    fontWeight: 'bold'
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
  startButton: {
    borderWidth: 1,
    borderColor: '#C62033',
    backgroundColor: orange,
    padding: 15,
    margin: 5
  },
  correctButton: {
    borderWidth: 1,
    borderColor: '#C62033',
    backgroundColor: green,
    padding: 15,
    margin: 5
  },
  wrongButton: {
    borderWidth: 1,
    borderColor: '#C62033',
    backgroundColor: red,
    padding: 15,
    margin: 5
  },
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
