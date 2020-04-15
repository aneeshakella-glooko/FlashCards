import React, {Component} from 'react';
import { StyleSheet, Text, View, Platform, StatusBar} from 'react-native';
import Decks from './components/Decks'
import AddCard from './components/AddCard'
import AddDeck from './components/AddDeck'
import {white, purple} from './utils/colors'
import { createBottomTabNavigator } from 'react-navigation-tabs'
import { FontAwesome, Ionicons } from '@expo/vector-icons'
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import reducer from './reducers'
import { createStackNavigator, createAppContainer } from 'react-navigation';

import Constants from 'expo-constants'

const Tabs = createBottomTabNavigator({
  AddDeck: {
    screen: AddDeck,
    navigationOptions: {
      tabBarLabel: 'History',
      tabBarIcon: ({ tintColor }) => <Ionicons name='ios-bookmarks' size={30} color={tintColor} />
    },
  },
  Decks: {
    screen: Decks,
    navigationOptions: {
      tabBarLabel: 'Add Entry',
      tabBarIcon: ({ tintColor }) => <FontAwesome name='plus-square' size={30} color={tintColor} />
    },
  },
}, {
  navigationOptions: {
    header: null
  },
  tabBarOptions: {
    activeTintColor: Platform.OS === 'ios' ? purple : white,
    style: {
      height: 56,
      backgroundColor: Platform.OS === 'ios' ? white : purple,
      shadowColor: 'rgba(0, 0, 0, 0.24)',
      shadowOffset: {
        width: 0,
        height: 3
      },
      shadowRadius: 6,
      shadowOpacity: 1
    }
  }
})

const Container = createAppContainer(Tabs)

export default Container
