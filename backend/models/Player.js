const mongoUtil = require('../db/mongoUtil');
const { players } = require('../db/constants');
const db = mongoUtil.get();
const ObjectId = require('mongodb').ObjectID;

class Player {
  static async addPlayer(playerEmail, name, lat, long, timestamp, distance) {
    await db
      .collection(players)
      .updateOne(
        { email: { $eq: playerEmail } },
        { $set: { name, timestamp, distance } },
        { upsert: true }
      );
    return;
  }

  static async removePlayer(_id) {
    await db.collection(players).deleteOne({ _id: ObjectId(_id) });
    return;
  }

  static async getPlayers() {
    return await db
      .collection(players)
      .find()
      .toArray();
  }

  static async countPlayers() {
    return await db.collection(players).count();
  }

  static async getPlayer(_id) {
    return await db.collection(players).findOne({ _id: ObjectId(_id) });
  }
}

module.exports = Player;
