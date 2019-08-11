import jwt from 'jsonwebtoken';
import {SECRET} from '../secret';

const user = {
  email: 'silas@silas.com',
  name: 'silas burger'
};

const token = jwt.sign(user, SECRET);

const players = [
  {
    name: 'Silas Burger',
    id: 2,
  },
  {
    name: 'Juan Areces',
    id: 3,
  },
  {
    name: 'Jay Chi',
    id: 4,
  },
  {
    name: 'Hasi Pastor',
    id: 5,
  },
]

const getUserData = (delay = 1000) => {
  return new Promise(function(resolve, reject) {
    setTimeout(function() {
      resolve(token);
    }, delay);
  });
};

const getPlayerData = (delay = 1000) => {
  return new Promise(function(resolve, reject) {
    setTimeout(function() {
      resolve(players);
    }, delay);
  });
};

export {getUserData, getPlayerData};