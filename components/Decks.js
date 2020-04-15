import React, { Component } from 'react'
import { connect } from 'react-redux'
import { fetchDeckResults } from '../utils/api'
import {View, FlatList, Text, StyleSheet, TouchableOpacity} from 'react-native'
import { AppLoading} from 'expo'
import Constants from 'expo-constants';
import { receiveDecks, addEntry } from '../actions'
import DeckDetail from './DeckDetail'

class Decks extends Component {

  state = {
    ready: false,
  }

  componentDidMount () {
    const { dispatch } = this.props

    fetchDeckResults()
      .then((decks) => {
        dispatch(receiveDecks(decks))})
      .then(() => this.setState(() => ({ready: true})))
  }

  render() {
    const { decks } = this.props
    const { ready } = this.state
    if (ready === false) {
        return <AppLoading />
    }

    return (
            <View style={styles.container}>
               <FlatList
                 data={Object.keys(this.props.decks)}
                 renderItem={({item}) => <DeckInfo id={item}
                 num={this.props.decks[item].name}
                 navigation={this.props.navigation}/>}
               />
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
  item: {
    backgroundColor: '#f9c2ff',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 32,
  },
});

function DeckInfo (props) {
  return (
      <TouchableOpacity
              onPress={() => props.navigation.navigate(
                'DeckDetail',
                { id: props.id }
              )}
            >
      <View style={styles.item}>
        <Text style={styles.title}> {props.num} </Text>
      </View>
      </TouchableOpacity>
  )
}


function mapStateToProps ({decks}) {
  return {
    decks
  }
}


export default connect(
  mapStateToProps)(Decks)
