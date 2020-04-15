import React, { Component } from 'react'
import { connect } from 'react-redux'
import { fetchDeckResults } from '../utils/api'
import {View, FlatList, Text, StyleSheet} from 'react-native'
import { AppLoading} from 'expo'
import Constants from 'expo-constants';
import { receiveDecks, addEntry } from '../actions'

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
    console.log(this.props)
    if (ready === false) {
        return <AppLoading />
    }

    return (
            <View style={styles.container}>
               <FlatList
                 data={Object.keys(this.props.decks)}
                 renderItem={({item}) => <DeckInfo num={this.props.decks[item].name}/>}
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
    <View style={styles.item}>
      <Text style={styles.title}> {props.num} </Text>
    </View>
  )
}


function mapStateToProps ({decks}) {
  return {
    decks
  }
}


export default connect(
  mapStateToProps)(Decks)
