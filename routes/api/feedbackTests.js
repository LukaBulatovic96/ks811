const express = require('express');
const router = express.Router();
const FeedBackTest = require('../../models/FeedBackTest');

//GetAll 360tests
router.get('/getAll',async (req,res)=>{
  FeedBackTest.find({}).then(feedbackTests=>{
     return  res.status(200).json(feedbackTests);
  });
});

router.post('/submit',(req,res)=>{
  let {
     ans1,
     ans2,
     ans3,
     ans4,
     ans5,
     ans6,
     ans7,
     ans8,
     ans9,
     ans10,
     name,
     boss
   } = req.body;



    let newFeedBackTest = new FeedBackTest({
      ans1,
      ans2,
      ans3,
      ans4,
      ans5,
      ans6,
      ans7,
      ans8,
      ans9,
      ans10,
      name,
      boss
    });

    newFeedBackTest.save().then(newFeedBackTest=>{
          return res.status(201).json({
            success:true,
            msg:"360 test is saved"
          });

});
});


module.exports = router;
