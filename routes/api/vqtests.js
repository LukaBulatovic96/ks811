const express = require('express');
const router = express.Router();
const VQTest = require('../../models/VQTest');

/*
* @route POST api/users/register
* @desc Register the User
* @ access Public
*/

//GetAll vqtests
router.get('/getAll',async (req,res)=>{
  VQTest.find({}).then(vqtests=>{
     return  res.status(200).json(vqtests);
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
     ans11,
     ans12,
     ans13,
     ans14,
     ans15,
     ans16,
     ans17,
     ans18,
     ans19,
     ans20,
     ans21,
     ans22,
     ans23,
     ans24,
     ans25,
     name
   } = req.body;

   let result = 0;
   if(ans1 == 'A') result = result+1;
   else result = result - 1;
   if(ans2 == 'A') result = result+1;
   else result = result - 1;
   if(ans3 == 'A') result = result+1;
   else result = result - 1;
   if(ans4 == 'A') result = result+1;
   else result = result - 1;
   if(ans5 == 'A') result = result+1;
   else result = result - 1;
   if(ans6 == 'A') result = result+1;
   else result = result - 1;
   if(ans7 == 'A') result = result+1;
   else result = result - 1;
   if(ans8 == 'A') result = result+1;
   else result = result - 1;
   if(ans9 == 'A') result = result+1;
   else result = result - 1;
   if(ans10 == 'A') result = result+1;
   else result = result - 1;
   if(ans11 == 'A') result = result+1;
   else result = result - 1;
   if(ans12 == 'A') result = result+1;
   else result = result - 1;
   if(ans13 == 'A') result = result+1;
   else result = result - 1;
   if(ans14 == 'A') result = result+1;
   else result = result - 1;
   if(ans15 == 'A') result = result+1;
   else result = result - 1;
   if(ans16 == 'A') result = result+1;
   else result = result - 1;
   if(ans17 == 'A') result = result+1;
   else result = result - 1;
   if(ans18 == 'A') result = result+1;
   else result = result - 1;
   if(ans19 == 'A') result = result+1;
   else result = result - 1;
   if(ans20 == 'A') result = result+1;
   else result = result - 1;
   if(ans21 == 'A') result = result+1;
   else result = result - 1;
   if(ans22 == 'A') result = result+1;
   else result = result - 1;
   if(ans23 == 'A') result = result+1;
   else result = result - 1;
   if(ans24 == 'A') result = result+1;
   else result = result - 1;
   if(ans25 == 'A') result = result+1;
   else result = result - 1;

    let newVQTest = new VQTest({
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
      ans11,
      ans12,
      ans13,
      ans14,
      ans15,
      ans16,
      ans17,
      ans18,
      ans19,
      ans20,
      ans21,
      ans22,
      ans23,
      ans24,
      ans25,
      result,
      name
    });

    newVQTest.save().then(newVQTest=>{
          return res.status(201).json({
            success:true,
            msg:"VQTest is saved"
          });

});
});


module.exports = router;
