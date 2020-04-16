import {View,
  FlatList,
  Text, StyleSheet, TouchableOpacity} from 'react-native'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { fetchDeckResults } from '../utils/api'
import { AppLoading} from 'expo'
import Constants from 'expo-constants';
import DeckDetail from './DeckDetail'
import {styles, getRandomColor} from '../utils/colors'
import { receiveDecks } from '../actions'

class Decks extends Component {

  state = {
    ready: false,
  }

  componentDidMount () {
    const { dispatch} = this.props
    const {bounceValue} = this.state

    this.props.navigation.addListener(
      'didFocus',
      payload => {
        this.forceUpdate();
      }
    );
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
                     keyExtractor = {(item) => item}
                   />
                 </View>
          )
      }
    }

function DeckInfo (props) {
  return (
      <TouchableOpacity
              onPress={() => props.navigation.navigate(
                'DeckDetail',
                { id: props.id }
              )}
            >
      <View style={[styles.item, {backgroundColor: getRandomColor()}]}>
        <Text style={styles.title}> {props.num} </Text>
        <Text style={styles.title}> {props.size} Cards </Text>
      </View>
      </TouchableOpacity>
  )
}


function mapStateToProps ({decks}) {
  return {
    decks
  }
}


export default connect(mapStateToProps)(Decks)
