import React, {Component} from 'react';

class MessageList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      allMessages: [],
      displayedMessages: [],
      newMessage: ''
    }
    this.messageRef = this.props.firebase.database().ref('messages')
  }


  componentDidMount(){
    this.messageRef.on('child_added' , snapshot => {
      const message = snapshot.val();
      message.key = snapshot.key;
      this.setState({ allMessages: this.state.allMessages.concat( message ) })
    });
  }


/*
    activeMessages(activeRoom) {

    }

    createMessage(newMessag){

    }

    getDate() {

    }

    getTime() {

    }

    handleChange(e) {

    }
*/

  render() {
    let messages = null;
    if(this.props.activeRoom) {
      messages = this.state.allMessages
                            .filter(message => message.roomId == this.props.activeRoom.key)
                            .map((message) =>
                              <tr>
                                <td>{message.username}</td>
                                <td>{message.content}</td>
                                <td>{message.sentAt}</td>
                              </tr>
                            )
    }
    
    return(
      <div>
        <header className="chatroom-header">
          <h2 className="chatroom-name">Messages</h2>
        </header>

        <div>
          <table id="messages-component">
            <thead>
              <tr>
                <th id="user-header">User</th>
                <th id="message-header">Message</th>
                <th id="sent-header">Sent</th>
              </tr>
            </thead>
            <tbody id="chat-list">
              {messages}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}





export default MessageList;
