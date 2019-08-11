const { MongoClient } = require('mongodb');
const { DB_URI, DB_NAME } = require('../config');

const state = {
  db: null
};
module.exports = {
  connect: function(done) {
    if (state.db) return done();

    MongoClient.connect(DB_URI, { useNewUrlParser: true }, function(
      err,
      client
    ) {
      if (err) return done(err);
      state.db = client.db(DB_NAME);
      done();
    });
  },
  get: function() {
    return state.db;
  },
  close: function(done) {
    if (state.db) {
      state.db.close(function(err) {
        state.db = null;
        state.mode = null;
        done(err);
      });
    }
  }
};
