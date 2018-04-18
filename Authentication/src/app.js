import React, {Component } from 'react';
import { View } from 'react-native';
import firebase from 'firebase';
import { Header, Button, CardSection, Spinner } from './components/common';
import LoginForm from  './components/LoginForm';


class App extends Component {
  state = { loggedIn: null };
  componentWillMount(){
    firebase.initializeApp({
        apiKey: 'AIzaSyASUha88P5VC4pY1B1_LP87hakbPJ-fFOk',
        authDomain: 'authentication-116be.firebaseapp.com',
        databaseURL: 'https://authentication-116be.firebaseio.com',
        projectId: 'authentication-116be',
        storageBucket: 'authentication-116be.appspot.com',
        messagingSenderId: '538411505822'
    });

    firebase.auth().onAuthStateChanged((user) => {
      if(user){
        this.setState({ loggedIn: true});
      } else {
        this.setState({loggedIn: false});
      }
    });
  }

  renderContent(){
    switch(this.state.loggedIn){
      case true:
        return (
        <CardSection>
          <Button onPress = {() => firebase.auth().signOut()}>
            Log Out
          </Button>
        </CardSection>
        );
      case false:
        return <LoginForm />;
      default:
        return <Spinner size = "large" />
    }
  }

  render(){
    return (
      <View>
        <Header headerText = "Authentication" />
        {this.renderContent()}
      </View>
    );
  }
}

export default App;