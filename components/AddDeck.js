import React, {Component} from 'react'
import { TextInput, Text, View, TouchableOpacity} from 'react-native';
import { NavigationActions } from 'react-navigation'
import {submitDeck} from '../utils/api'
import { connect } from 'react-redux'
import generateUID from '../utils/decks'
import {addDeck} from  '../actions/index'
import {styles} from '../utils/colors'

class AddDeck extends Component {
  state = {
    name : '',
    cards: {}
  }

   submit = () => {
    if (this.state.name == ''){
      alert("Please Enter Some Text")
      return
    }

    const entry = this.state
    const id = generateUID()
    this.props.dispatch(addDeck(id, this.state.name))
    this.setState(() => ({ name: ''}))
    this.toHome()
    submitDeck(id, entry)
  }

  toHome = () => {
    this.props.navigation.dispatch(NavigationActions.back({key: 'Decks'}))
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.header}> Deck Name </Text>
        <TextInput
        style={[styles.textInput]}
        placeholder="Enter Text Here"
        onChangeText={(name) => {
                      this.setState({name})
                    }
                  }
        value={this.state.name}/>

        <View style={styles.inputContainer}>
          <TouchableOpacity
            style={styles.saveButton}
            onPress={this.submit}
          >
            <Text style={styles.saveButtonText}>Save</Text>
          </TouchableOpacity>
        </View>
      </View>
    )
  }
}

export default connect()(AddDeck)
