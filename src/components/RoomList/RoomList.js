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
      this.setState({ rooms: this.state.rooms.concat(room) });
      if(this.state.newRoomName){
        this.props.handleRoomSelect(room);
      }
    });

    this.roomsRef.on('child_removed', snapshot => {
      const rooms = this.state.rooms.filter((room) =>{
        return room.key !== snapshot.key
      });
      this.setState({rooms})
    });
  }

  createRoom(e) {
    e.preventDefault();
    this.roomsRef.push({
      name: this.state.newRoom,
      date: Date(),
      user: this.props.user ? this.props.user.displayName : "",
    });
    this.setState({ newRoom: ' ' });
  }

  handleCreateRoom(e) {
    this.setState({ newRoom: e.target.value });
  }

  deleteRoom (room){
    this.roomsRef.child(room.key).remove();
  }


  render() {
    return(
      <div className="chat-room-div" >
        <ul className="chat-room-list" >
          {this.state.rooms.map((room, index) =>
            <li
              className="room-names"
              key={room.key}
              onClick={ () => this.props.setActiveRoom(room) }
              >
              {room.name}
              <button className="delete-room" type="button" onClick={(e) => this.deleteRoom(room)}>Delete Room</button>
            </li>
          )}
        </ul>
        <form className="create-room" onSubmit={ (e) => this.createRoom(e) }>

          <input  id="formSubmit"
            text="text"

            value={ this.state.newRoom }
            onChange={(e) => this.handleCreateRoom(e)}
            placeholder="Create Room" />

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
