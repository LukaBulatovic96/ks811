const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const StavoviZaposlenihSchema = new Schema({

  name:{
    type: String,
    required: true
  },
  date:{
    type: Date,
    default: Date.now
  },
  staz:{
    type: String,
    required: true
  },
  pol:{
    type: String,
    required: true
  },
  ans1:{
    type: String,
    required: true
  },
  ans2:{
    type: String,
    required: false
  },
  ans3:{
    type: String,
    required: true
  },
  ans4:{
    type: String,
    required: true
  },
});


module.exports = StavoviZaposlenih = mongoose.model('StavoviZaposlenihs',StavoviZaposlenihSchema);
