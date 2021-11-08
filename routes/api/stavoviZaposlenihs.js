const express = require('express');
const router = express.Router();
const StavoviZaposlenih = require('../../models/StavoviZaposlenih');

//GetAll 360tests
router.get('/getAll',async (req,res)=>{
  StavoviZaposlenih.find({}).then(stavoviZaposlenih=>{
     return  res.status(200).json(stavoviZaposlenih);
  });
});

router.post('/submit',(req,res)=>{
  let {
     name,
     staz,
     pol,
     ans1,
     ans2,
     ans3,
     ans4
   } = req.body;

  console.log("BACKEND");

    let newStavoviZaposlenih = new StavoviZaposlenih({
      name,
      staz,
      pol,
      ans1,
      ans2,
      ans3,
      ans4
    });

    newStavoviZaposlenih.save().then(newStavoviZaposlenih=>{
          return res.status(201).json({
            success:true,
            msg:"Stavovi zaposlenih is saved"
          });

});
});


module.exports = router;
