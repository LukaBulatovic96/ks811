const express = require('express');
const router = express.Router();
const TestLicnosti = require('../../models/TestLicnosti');

/*
* @route POST api/users/register
* @desc Register the User
* @ access Public
*/

//GetAll vqtests
router.get('/getAll',async (req,res)=>{
  TestLicnosti.find({}).then(testLicnostis=>{
     return  res.status(200).json(testLicnostis);
  });
});

router.post('/submit',(req,res)=>{
  let {
      N1,
      N2,
      N3,
      N4,
      N5,
      N6,

      E1,
      E2,
      E3,
      E4,
      E5,
      E6,

      O1,
      O2,
      O3,
      O4,
      O5,
      O6,

      U1,
      U2,
      U3,
      U4,
      U5,
      U6,

      S1,
      S2,
      S3,
      S4,
      S5,
      S6,
      pol,
      userId
   } = req.body;


    let newTestLicnosti = new TestLicnosti({
      N1,
      N2,
      N3,
      N4,
      N5,
      N6,

      E1,
      E2,
      E3,
      E4,
      E5,
      E6,

      O1,
      O2,
      O3,
      O4,
      O5,
      O6,

      U1,
      U2,
      U3,
      U4,
      U5,
      U6,

      S1,
      S2,
      S3,
      S4,
      S5,
      S6,
      pol,

      userId

    });

    newTestLicnosti.save().then(newTestLicnosti=>{
          return res.status(201).json({
            success:true,
            msg:"Test Licnosti is saved"
          });

});
});


module.exports = router;
