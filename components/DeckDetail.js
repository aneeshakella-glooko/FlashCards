
import React, { Component } from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import { connect } from 'react-redux'

class DeckDetail extends Component {


  render() {
    return( <View style={styles.container}>
        <Text style={styles.header}> {this.props.decks[this.props.id].name} </Text>
        <View style={styles.inputContainer}>
          <TouchableOpacity
            style={styles.saveButton}
            onPress={this.submit}
          >
            <Text style={styles.saveButtonText}>Add Card</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.inputContainer}>
          <TouchableOpacity
            style={styles.saveButton}
            onPress={this.submit}
          >
            <Text style={styles.saveButtonText}>Start Quiz</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.inputContainer}>
          <TouchableOpacity
            style={styles.saveButton}
            onPress={this.submit}
          >
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
  }
});


function mapStateToProps ({decks}, {navigation}) {
  const { id } = navigation.state.params
  console.log(decks)
  console.log(id)
  return {
    id,
    decks
  }
}

export default connect(mapStateToProps)(DeckDetail)
