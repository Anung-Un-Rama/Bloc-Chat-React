import React, {Component} from 'react';


class User extends Component {

  componentDidMount() {
    this.props.firebase.auth().onAuthStateChanged( user => {
      this.props.setUser(user);
    })
  }

  signIn(){
    const provider = new this.props.firebase.auth.GoogleAuthProvider();
    this.props.firebase.auth().signInWithPopup( provider ).then((result) => {
      const user = result.user;
      this.props.setUser(user);
    }).catch(e => console.log(e));
  }

  signOut(){
    this.props.firebase.auth().signOut();
  }

  render() {
    return (
      <section className="user-display">
        <div className="user-display-name">
          {this.props.user ? this.props.user.displayName : ''}
        </div>

        <button className="user-sign-in-out"
          onClick={ this.props.user ? this.signOut.bind(this) : this.signIn.bind(this)} >
          <span> Sign {this.props.user ? 'Out' : 'In'}</span>
        </button>
      </section>
    );
  }


}

export default User;
