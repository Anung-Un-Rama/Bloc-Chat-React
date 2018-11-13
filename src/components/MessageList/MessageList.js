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

    }*/

    createMessage(e){
      e.preventDefault();
      this.messageRef.push({
        username: this.props.user ? this.props.user.displayName : "Guest",
        content: this.state.newMessage,
        sentAt: Date(),
        roomId: this.props.activeRoom.key
      });
      this.setState({ newMessage: ''});
    }

    handleMessageInput(e) {
        this.setState({ newMessage: e.target.value });
      }


    /*deleteMessage(){
      this.messageRef.child(activeRoom.key).remove();
    }*/


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

          <form className="create-message" onSubmit={ (e) => this.createMessage(e) } >

            <input id="messageSubmit"
              text="text"
              value={this.state.newMessage}
              onChange={(e) => this.handleMessageInput(e)}
              placeholder="Write a Message" />

            <input type="submit"
              value="Write Message"
            />

          </form>

        </div>
      </div>
    );
  }
}





export default MessageList;
