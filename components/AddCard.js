import React, {Component, Fragment} from 'react'
import { TextInput, Text, Button } from 'react-native';


export default class AddCard extends Component {
  state = {
    question : '',
    answer : '',
  }

  submit () {
    console.log("FUCK YEAH!")
  }


  render() {
    return (
      <Fragment>
        <Text style={{fontSize: 20}}> Question </Text>
        <TextInput
        style={{ height: 40, width: 300,  borderColor: 'gray', borderWidth: 1, marginBottom: 20}}
        onChangeText={(question) => this.setState({question: question})}
        value={this.state.question}/>

        <Text style={{fontSize: 20}}> Answer </Text>
        <TextInput
        style={{ height: 40, width: 300, borderColor: 'gray', borderWidth: 1, marginBottom: 20 }}
        onChangeText={(answer) => this.setState({answer: answer})}
        value={this.state.answer}/>

        <Button
           onPress = {this.submit}
           title = "Submit!"
           color = "red"
            />

      </Fragment>
    )
  }
}
