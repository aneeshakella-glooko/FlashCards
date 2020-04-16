import React from 'react'
import {AsyncStorage} from 'react-native'
import * as Notifications from 'expo-notifications'
import * as Permissions from "expo-permissions";

const NOTIFICATION_KEY = 'Flashcards:notifications'

export function clearLocalNotification () {
  return AsyncStorage.removeItem(NOTIFICATION_KEY)
    .then(Notifications.cancelAllScheduledNotificationsAsync)
}

function createNotification () {
  return {
    title: "👋 Don't forget to quiz yourself today!",
    body: "👋 Consistent Studying Makes Perfect!!!!!",
    ios: {
      sound: true,
    },
    android: {
      sound: true,
      priority: 'high',
      stick: false,
      vibrate: true,
    }
  }
}

export function setLocalNotification () {
  AsyncStorage.getItem(NOTIFICATION_KEY)
    .then(JSON.parse)
    .then((data) => {
      if (data === null) {
        Permissions.askAsync(Permissions.NOTIFICATIONS)
          .then(({ status }) => {
            if (status === 'granted') {
              Notifications.cancelAllScheduledNotificationsAsync()

              var tomorrow = new Date()
              tomorrow.setDate(tomorrow.getDate() + 1)
              tomorrow.setHours(20)

              try {
                Notifications.scheduleLocalNotificationsAsync(
                  createNotification(),
                  {
                    time: tomorrow,
                    repeat: 'day',
                  }
                )
              } catch (e) {
                console.log(e)
              }

              AsyncStorage.setItem(NOTIFICATION_KEY, JSON.stringify(true))
            }
          })
      }
    })
}
