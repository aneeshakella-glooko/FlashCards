import React, {Component} from 'react'
import {styles} from '../utils/colors'
import { View, Text, TouchableOpacity, Fragment } from 'react-native'
import { connect } from 'react-redux'
import { FontAwesome} from '@expo/vector-icons'

class Quiz extends Component {
    state = {
      seeAnswer : false,
      currCard : 0,
      correct: 0
    }

    render () {

      if(this.props.card_keys.length === 0){
        return (<View style={styles.container}>
            <Text style={styles.header}> You need to add a card to start the quiz</Text>
        </View> )
      }

      if(this.props.card_keys.length === this.state.currCard){
        return (<View style={styles.container}>
            <Text style={styles.header}>
              You scored {this.state.correct * 100/this.props.card_keys.length}%!
            </Text>

            <TouchableOpacity
              style={styles.startButton}
              onPress={() => {
                 this.setState({
                   seeAnswer: false,
                   currCard: 0,
                   correct: 0,
                 })
               }
             }>
              <Text style={styles.saveButtonText}>Start the Quiz Over</Text>
            </TouchableOpacity>

            <FontAwesome
              style={{textAlign:"center"}}
              name='home'
              size={100}
              onPress={() => this.props.navigation.navigate(
               'Home'
             )}/>


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
                <Text style={styles.header}>
                {this.props.card_keys.length - this.state.currCard} Questions Left
                </Text>
            </View>
        )
    }
}


function mapStateToProps ({decks}, {navigation}) {
  const { deck_id } = navigation.state.params
  return {
    deck_id,
    card_keys: Object.keys(decks[deck_id].cards),
    cards: decks[deck_id].cards,
  }
}

export default connect(mapStateToProps)(Quiz)
