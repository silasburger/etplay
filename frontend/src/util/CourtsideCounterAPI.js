const BASE_URL = 'http://127.0.0.1:3333';
const axios = require('axios');

export default class CourtsideCounterAPI {
  static async signup(user) {
    try {
      let response = await axios({
        method: 'post',
        url: `${BASE_URL}/signup`,
        data: user
      });
      return response.data;
    } catch (e) {
      throw e;
    }
  }


  static async login(email) {
    try {
      let response = await axios({
        method: 'post',
        url: `${BASE_URL}/login`,
        data: email
      });
      return response.data;
    } catch (e) {
      throw e;
    }
  }

  static async getPlayers(_token) {
    try {
      let response = await axios({
        method: 'get',
        url: `${BASE_URL}/players`,
        params: {_token}
      });
      return response.data;
    } catch (e) {
      throw e;
    }
  }

  static async getOTW(_token) {
    try {
      let response = await axios({
        method: 'get',
        url: `${BASE_URL}/otw`,
        params: {_token}
      });
      return response.data;
    } catch (e) {
      throw e;
    }
  }

  static async checkoutPlayer(_token) {
    try {
      let response = await axios({
        method: 'delete',
        url: `${BASE_URL}/players`, 
        data: {_token}
      });
      return response.data;
    } catch (e) {
      throw e;
    }
  }
  static async checkinPlayer(_token, lat, long, timestamp) {
    try {
      let response = await axios({
        method: 'post',
        url: `${BASE_URL}/players`, 
        data: {_token, lat, long, timestamp}
      });
      return response.data;
    } catch (e) {
      throw e;
    }
  }
  static async checkStatus(_token) {
    try {
      let response = await axios({
        method: 'get',
        url: `${BASE_URL}/players/status`, 
        params: {_token}
      });
      return response.data;
    } catch (e) {
      throw e;
    }
  }
}
