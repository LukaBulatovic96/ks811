const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create the User Schema

const TestLicnostiSchema = new Schema({
  N1:{
    type: Number,
    required: true
  },
  N2:{
    type: Number,
    required: true
  },
  N3:{
    type: Number,
    required: true
  },
  N4:{
    type: Number,
    required: true
  },
  N5:{
    type: Number,
    required: true
  },
  N6:{
    type: Number,
    required: true
  },
  E1:{
    type: Number,
    required: true
  },
  E2:{
    type: Number,
    required: true
  },
  E3:{
    type: Number,
    required: true
  },
  E4:{
    type: Number,
    required: true
  },
  E5:{
    type: Number,
    required: true
  },
  E6:{
    type: Number,
    required: true
  },
  O1:{
    type: Number,
    required: true
  },
  O2:{
    type: Number,
    required: true
  },
  O3:{
    type: Number,
    required: true
  },
  O4:{
    type: Number,
    required: true
  },
  O5:{
    type: Number,
    required: true
  },
  O6:{
    type: Number,
    required: true
  },
  U1:{
    type: Number,
    required: true
  },
  U2:{
    type: Number,
    required: true
  },
  U3:{
    type: Number,
    required: true
  },
  U4:{
    type: Number,
    required: true
  },
  U5:{
    type: Number,
    required: true
  },
  U6:{
    type: Number,
    required: true
  },
  S1:{
    type: Number,
    required: true
  },
  S2:{
    type: Number,
    required: true
  },
  S3:{
    type: Number,
    required: true
  },
  S4:{
    type: Number,
    required: true
  },
  S5:{
    type: Number,
    required: true
  },
  S6:{
    type: Number,
    required: true
  },
  pol:{
    type: String,
    required: true
  },
  userId:{
    type: String,
    required: true
  },
  date:{
    type: Date,
    default: Date.now
  },

});

module.exports = TestLicnosti = mongoose.model('TestLicnostis',TestLicnostiSchema);
