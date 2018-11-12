import React, { Component } from 'react';
import './App.css';
import * as firebase from 'firebase';
import RoomList from './components/RoomList/RoomList.js'
import MessageList from './components/MessageList/MessageList.js'


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
  constructor(props) {
    super(props)
    this.state = {
      activeRoom: null
    };
  }

  setActiveRoom(room) {
    this.setState({activeRoom: room});
  }

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <h1 className="App-title">Chit-Chat</h1>
          <h2 className="list-of-rooms">Your Chat Rooms</h2>
        </div>

        <div className="chat-room-div" ></div>

        <div id="sidbar">
          <RoomList
              firebase={firebase}
              activeRoom={this.state.activeRoom}
              createRoom={this.createRoom}
              setActiveRoom={this.setActiveRoom.bind(this)} />
        </div>

          <section className="main">
            <MessageList firebase={firebase} activeRoom={this.state.activeRoom} />
          </section>

      </div>
    );
  }
}

export default App;
