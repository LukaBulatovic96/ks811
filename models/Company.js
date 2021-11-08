const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create the Company Schema
const SectorSchema = new Schema({
    name:{
      type: String,
      required: true
    },
    radnaMesta:[String]
 });


const CompanySchema = new Schema({
  name:{
    type: String,
    required: true
  },
  userId: [{
    type: String
  }],
  stavoviZaposlenih:{
    staz:{
      a:{
        type: Number,
        default: 0
      },
      b:{
        type: Number,
        default: 0
      },
      c:{
        type: Number,
        default: 0
      },
      d:{
        type: Number,
        default: 0
      },
    },
    pol:{
      a:{
        type: Number,
        default: 0
      },
      b:{
        type: Number,
        default: 0
      },
    },
    numberOfAnswers:{
      type: Number,
      default: 0
    },
    ans11:{
      type: Number,
      default: 0
    },
    ans12:{
      type: String,
      default: ''
    },
    ans13:{
      type: Number,
      default: 0
    },
    ans14:{
      a:{
        type: Number,
        default: 0
      },
      b:{
        type: Number,
        default: 0
      },
      c:{
        type: Number,
        default: 0
      },
      d:{
        type: Number,
        default: 0
      },
      e:{
        type: Number,
        default: 0
      },
    },

    ans21:{
      a:{
        type: Number,
        default: 0
      },
      b:{
        type: Number,
        default: 0
      },
      c:{
        type: Number,
        default: 0
      },
    },
    ans22:{
      type:Number,
      default: 0
    },
    ans23:{
      type:Number,
      default: 0
    },
    ans24:{
      type:Number,
      default: 0
    },
    ans25:{
      type:Number,
      default: 0
    },
    ans26:{
      a:{
        type: Number,
        default: 0
      },
      b:{
        type: Number,
        default: 0
      },
      c:{
        type: Number,
        default: 0
      },
      d:{
        type: Number,
        default: 0
      },
    },
    ans27:{
      type:Number,
      default: 0
    },
    ans28:{
      type:Number,
      default: 0
    },


    ans31:{
      type:Number,
      default: 0
    },
    ans32:{
      type:Number,
      default: 0
    },
    ans33:{
      type:Number,
      default: 0
    },
    ans34:{
      type:Number,
      default: 0
    },
    ans35:{
      type:Number,
      default: 0
    },
    ans36:{
      type:Number,
      default: 0
    },
    ans37:{
      type:Number,
      default: 0
    },
    ans38:{
      type:Number,
      default: 0
    },
    ans39:{
      type:Number,
      default: 0
    },
    ans310:{
      type:Number,
      default: 0
    },
    ans311:{
      type:Number,
      default: 0
    },


    ans41:{
      type:Number,
      default: 0
    },
    ans42:{
      type:Number,
      default: 0
    },
    ans43:{
      type:Number,
      default: 0
    },
    ans44:{
      type:Number,
      default: 0
    },
    ans45:{
      type:Number,
      default: 0
    },
    ans46:{
      type:Number,
      default: 0
    },
    ans47:{
      type:Number,
      default: 0
    },
    ans48:{
      type:Number,
      default: 0
    },
    ans49:{
      type:Number,
      default: 0
    },
    ans410:{
      type:Number,
      default: 0
    },
    ans411:{
      type:Number,
      default: 0
    },
    ans412:{
      type:Number,
      default: 0
    },
    ans413:{
      type:Number,
      default: 0
    },
    ans414:{
      a:{
        type: Number,
        default: 0
      },
      b:{
        type: Number,
        default: 0
      },
      c:{
        type: Number,
        default: 0
      },
      d:{
        type: Number,
        default: 0
      },
    },
    ans415:{
      type:Number,
      default: 0
    },
    ans416:{
      type:Number,
      default: 0
    },


    ans51:{
      type:Number,
      default: 0
    },
    ans52:{
      type:Number,
      default: 0
    },
    ans53:{
      type:Number,
      default: 0
    },
    ans54:{
      type:Number,
      default: 0
    },
    ans55:{
      type:Number,
      default: 0
    },
    ans56:{
      type:Number,
      default: 0
    },

    ans61:{
      type:Number,
      default: 0
    },
    ans62:{
      type:Number,
      default: 0
    },
    ans63:{
      type:Number,
      default: 0
    },
    ans64:{
      type:Number,
      default: 0
    },
    ans65:{
      type:Number,
      default: 0
    },
    ans66:{
      type:Number,
      default: 0
    },
    ans67:{
      type:Number,
      default: 0
    },
    ans68:{
      type:Number,
      default: 0
    },


    ans71:{
      type:Number,
      default: 0
    },
    ans72:{
      type:Number,
      default: 0
    },
    ans73:{
      a:{
        type: Number,
        default: 0
      },
      b:{
        type: Number,
        default: 0
      },
      c:{
        type: Number,
        default: 0
      },
      d:{
        type: Number,
        default: 0
      },
      e:{
        type: Number,
        default: 0
      },
    },
    ans74:{
      type:Number,
      default: 0
    },


    ans81:{
      a:{
        type: Number,
        default: 0
      },
      b:{
        type: Number,
        default: 0
      },
      c:{
        type: Number,
        default: 0
      },
      d:{
        type: Number,
        default: 0
      },
      e:{
        type: Number,
        default: 0
      },
    },
    ans82:{
      type:Number,
      default: 0
    },
    ans83:{
      type:Number,
      default: 0
    },
    ans84:{
      type:Number,
      default: 0
    },
    ans85:{
      type:Number,
      default: 0
    },
    ans86:{
      type:Number,
      default: 0
    },
    ans87:{
      a:{
        type: Number,
        default: 0
      },
      b:{
        type: Number,
        default: 0
      },
      c:{
        type: Number,
        default: 0
      },
    },


    ans91:{
      type:Number,
      default: 0
    },
    ans92:{
      type:String,
      default: ''
    },


  },
  sektori:[SectorSchema],

});

module.exports = Company = mongoose.model('company',CompanySchema);
