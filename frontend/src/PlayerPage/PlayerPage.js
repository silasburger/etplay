import React, { Component } from 'react';
import Button from '../Button';
import PlayerList from './PlayerList';
import CourtsideCounterAPI from '../util/CourtsideCounterAPI';

class PlayerPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      players: [],
      otw: []
    };
    this.handleCheckin = this.handleCheckin.bind(this);
    this.handleCheckout = this.handleCheckout.bind(this);
    this.handleUpdate = this.handleUpdate.bind(this);
  }

  async componentDidMount() {
    try {
      if (!this.props.currUser) {
        this.props.history.push('/');
      } else {
        let responses = await Promise.all([
          CourtsideCounterAPI.getPlayers(this.props.currUser._token),
          CourtsideCounterAPI.getOTW(this.props.currUser._token)
        ]);

        this.setState({ players: responses[0].players, otw: responses[1].otw });
      }
    } catch (err) {
      console.log(err);
    }
  }

  async handleCheckin() {
    try {
      await this.props.checkinPlayer();
      this.handleUpdate();
    } catch (e) {
      console.error(e);
    }
  }

  async handleCheckout() {
    try {
      await this.props.checkoutPlayer();
      this.handleUpdate();
    } catch (e) {
      console.error(e);
    }
  }

  async handleUpdate() {
    try {
      let responses = await Promise.all([
        CourtsideCounterAPI.getPlayers(this.props.currUser._token),
        CourtsideCounterAPI.getOTW(this.props.currUser._token)
      ]);
      this.setState({
        players: responses[0].players,
        otw: responses[1].otw
      });
    } catch (e) {
      console.error(e);
    }
  }

  render() {
    //replace checkin button with checkout and update status button when someone is checked in
    let status = this.props.isCheckedIn ? (
      <div>
        {this.props.isAtCourt
          ? 'You are at the court!'
          : `You were ${this.props.distance} miles from the court at ${
              this.props.timestamp
            }`}
      </div>
    ) : null;

    return (
      <>
        {status}
        <div className="statusButtons">
          {this.props.isCheckedIn ? (
            <>
              <Button handleClick={this.handleCheckout}>Checkout</Button>
              <Button handleClick={this.handleCheckin}>Update</Button>
            </>
          ) : (
            <>
              <Button handleClick={this.handleCheckin}>Check In</Button>
              <Button handleClick={this.handleUpdate}>Update</Button>
            </>
          )}
        </div>
        <PlayerList otw={this.state.otw} players={this.state.players} />
      </>
    );
  }
}

export default PlayerPage;

// 37.883581, -122.269655
// 37.883625, -122.269153
// 37.883344, -122.269144
// 37.883284, -122.269609
