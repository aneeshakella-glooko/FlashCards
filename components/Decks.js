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
    const { dispatch} = this.props
    
    this.props.navigation.addListener(
      'didFocus',
      payload => {
        this.forceUpdate();
      }
    );
    fetchDeckResults()
      .then((decks) => {
        console.log(decks)
        dispatch(receiveDecks(decks))})
      .then(() => this.setState(() => ({ready: true})))
  }

  render() {
    const { decks } = this.props
    const { ready } = this.state
    console.log(decks)
    if (ready === false) {
        return <AppLoading />
    }

    return Object.keys(this.props.decks).length == 0 ?
    (<View style={styles.container}>
        <Text style={styles.title}> Please Add Some Decks</Text>
    </View>
    )
    : (
            <View style={styles.container}>
               <FlatList
                 data={Object.keys(this.props.decks)}
                 renderItem={({item}) => <DeckInfo id={item}
                 num={this.props.decks[item].name}
                 size={Object.keys(this.props.decks[item].cards).length}
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
        <Text style={styles.title}> {props.size} Cards </Text>
      </View>
      </TouchableOpacity>
  )
}


function mapStateToProps ({decks}) {
  console.log()
  return {
    decks
  }
}


export default connect(
  mapStateToProps)(Decks)
