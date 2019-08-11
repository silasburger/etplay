const mongoUtil = require('../db/mongoUtil');
const db = mongoUtil.get();
const {otw} = require('../db/constants');
const ObjectId = require('mongodb').ObjectID;


class OTW {

  static async getOTWs() {
    let result = await db
      .collection(otw)
      .find()
      .toArray();

      return result;
  }

  static async removeOTW(_id) {
    await db
      .collection(otw)
      .deleteOne({ _id: ObjectId(_id)});
    return;
  }

  static async addOTW(otwEmail, name, distance, timestamp) {
    await db
    .collection(otw)
    .updateOne({ email: { $eq: otwEmail } }, {$set: {distance, timestamp, name}}, {upsert: true});
    return;
  }

  static async getOTW(_id) {
    return await db.collection(otw).findOne({ _id: ObjectId(_id)});
  }

  static async countOTW() {
    return await db.collection(otw).count();
  }

}

module.exports = OTW;