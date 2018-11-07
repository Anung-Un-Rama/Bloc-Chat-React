import React, { Component } from 'react';
import './App.css';
import * as firebase from 'firebase';
import RoomList from './components/RoomList.js'


var config = {
    apiKey: "AIzaSyAEukQq15t4I7D8yeLQk3TGr5h2CB_HD2Y",
    authDomain: "bloc-chat-react-69908.firebaseapp.com",
    databaseURL: "https://bloc-chat-react-69908.firebaseio.com",
    projectId: "bloc-chat-react-69908",
    storageBucket: "bloc-chat-react-69908.appspot.com",
    messagingSenderId: "241483774953"
  };

firebase.initializeApp(config)


class App extends Component {
  render() {
    return (
      <div className="App">
        <div id="sidbar">
          <RoomList firebase={firebase}
                    createRoom={this.createRoom}
          />
        </div>
      </div>
    );
  }
}

export default App;
