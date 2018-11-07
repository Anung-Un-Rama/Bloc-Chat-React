import React, {Component} from 'react';


class RoomList extends Component {
  constructor(props) {
    super(props);
    this.state = { newRoom: '', rooms: [] };
    this.roomsRef = this.props.firebase.database().ref('rooms');
  }

  componentDidMount () {
    this.roomsRef.on('child_added', snapshot => {
      const room = snapshot.val();
      room.key = snapshot.key;
      this.setState({ rooms: this.state.rooms.concat( room )})
    });
  }

  createRoom(e) {
    e.preventDefault();
    this.roomsRef.push({
      name: this.state.newRoom
    });
    this.setState({ newRoom: ' ' });
  }

  handleCreateRoom(e) {
    this.setState({ newRoom: e.target.value });
  }

  render() {
    return(
      <div className="chatRoomsDiv" >
        <ul className="chatRoomList" >
          {this.state.rooms.map((room, index) =>
            <li
              className="roomNames"
              key={room.key}>
              {room.name}
            </li>
          )}
        </ul>
        <form className="create-room" onSubmit={ (e) => this.createRoom(e) }>
          <input  id="formSubmit"
            text="text"
            value={ this.state.newRoom }
            onChange={(e) => this.handleCreateRoom(e)}
            placeholder="New Chat Room" />
          <input  type="submit"
            value="Add"
            name="newRoomName"
           />
        </form>
      </div>
    )
  }
}
export default RoomList;
