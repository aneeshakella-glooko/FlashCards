import React, {Component} from 'react'
import { TextInput, Text, Button, View,TouchableOpacity, StyleSheet} from 'react-native';
import { NavigationActions } from 'react-navigation'
import {submitDeck} from '../utils/api'
import { connect } from 'react-redux'
import generateUID from '../utils/decks'
import {addDeck} from  '../actions/index'

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



export default connect()(AddDeck)
