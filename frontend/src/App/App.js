import React, { Component } from 'react';
import Routes from '../Routes';
import { SECRET } from '../secret';
import jwt from 'jsonwebtoken';
import CourtsideCounterAPI from '../util/CourtsideCounterAPI';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      currUser: null,
      isCheckedIn: false,
      isAtCourt: false,
      lat: null,
      long: null,
      timestamp: null,
      locationError: null,
      distance: null
    };
    this.doLogin = this.doLogin.bind(this);
    this.doSignup = this.doSignup.bind(this);
    this.checkinPlayer = this.checkinPlayer.bind(this);
    this.checkoutPlayer = this.checkoutPlayer.bind(this);
    this.updateCurrUser = this.updateCurrUser.bind(this);
  }

  async componentDidMount() {
    const _token = localStorage.getItem('token');
    if (_token) {
      const user = await jwt.verify(_token, SECRET);
      user._token = _token;
      //check here is the user is checked in (they are in otw or players)
      let {
        isCheckedIn,
        distance,
        timestamp,
        isAtCourt
      } = await CourtsideCounterAPI.checkStatus(_token);

      this.setState({
        currUser: user,
        isLoading: false,
        isCheckedIn,
        distance,
        timestamp,
        isAtCourt
      });
    } else {
      this.setState({ isLoading: false });
    }
  }

  async checkinPlayer() {
    const { lat, long, timestamp } = await this.getLocationAsync();
    // now that we have lat long, we can
    //api request to handleCheckin
    let { isAtCourt, distance } = await CourtsideCounterAPI.checkinPlayer(
      this.state.currUser._token,
      lat,
      long,
      timestamp
    );
    this.setState({
      lat,
      long,
      timestamp,
      isAtCourt,
      distance,
      isCheckedIn: true
    });
  }
  async checkoutPlayer() {
    await CourtsideCounterAPI.checkoutPlayer(this.state.currUser._token);
    this.setState({
      isCheckedIn: false,
      isAtCourt: false,
      lat: null,
      long: null,
      timestamp: null,
      distance: null
    });
  }

  //function that gets the location and return a promise
  getLocationAsync() {
    if (navigator.geolocation) {
      return new Promise(function(resolve, reject) {
        navigator.geolocation.getCurrentPosition(
          function(position) {
            resolve({
              long: position.coords.longitude,
              lat: position.coords.latitude,
              timestamp: position.timestamp
            });
          },
          function(PostionError) {
            reject(PostionError);
          },
          { enableHighAccuracy: true }
        );
      });
    } else {
      throw new Error('Geo Location not supported by browser');
    }
  }

  async doLogin(email) {
    let {_token} = await CourtsideCounterAPI.login({
      email
    });
    localStorage.setItem('token', _token);
    this.updateCurrUser();
  }

  async doSignup(name, email) {
    let { _token } = await CourtsideCounterAPI.signup({
      email,
      name
    });
    localStorage.setItem('token', _token);
    this.updateCurrUser();
  }

  async updateCurrUser() {
    const _token = localStorage.getItem('token');
    if (_token) {
      const user = await jwt.verify(_token, SECRET);
      user._token = _token;
      //check here is the user is checked in (they are in otw or players)
      let {
        isCheckedIn,
        distance,
        timestamp,
        isAtCourt
      } = await CourtsideCounterAPI.checkStatus(_token);

      this.setState({
        currUser: user,
        isLoading: false,
        isCheckedIn,
        distance,
        timestamp,
        isAtCourt
      });
    } else {
      this.setState({ isLoading: false });
    }
  }

  render() {
    if (this.state.isLoading) {
      return <div>Loading...</div>;
    }
    return (
      <Routes
        {...this.state}
        doLogin={this.doLogin}
        doSignup={this.doSignup}
        checkinPlayer={this.checkinPlayer}
        checkoutPlayer={this.checkoutPlayer}
      />
    );
  }
}

export default App;
