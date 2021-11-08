const express = require('express');
const router = express.Router();
const bcrypt= require('bcryptjs');
const jwt = require ('jsonwebtoken');
const passport = require('passport');
const key = require('../../config/keys').secret;
const User = require('../../models/User');

/*
* @route POST api/users/register
* @desc Register the User
* @ access Public
*/


router.post('/register',(req,res)=>{
  let {
     name,
     username,
     email,
     password,
     confirm_password,
     type,
     radnoMesto,
     sektor
    } = req.body
    if(password !== confirm_password){
      return res.status(400).json({
          msg: `Passwords do not match. ${password} __ ${confirm_password}`
      });
    }
    //Check for the unique email
    User.findOne({
      username: username
    }).then(user =>{
      if(user){
        return res.status(400).json({
            msg:"Username is already taken."
        });
      }
    })
    //check for the unique email
    User.findOne({
      email: email
    }).then(user =>{
      if(user){
        return res.status(400).json({
            msg:"Email is already registered."
        });
      }
    });
    // The data is valid and now register the users
    let newUser = new User({
      name,
      username,
      password,
      email,
      type,
      radnoMesto,
      sektor
    });
    //Hash the Password

    bcrypt.genSalt(10,(err,salt)=>{
      bcrypt.hash(newUser.password, salt, (err,hash)=>{
        if(err) throw err;
        newUser.password= hash;
        newUser.save().then(user=>{
          return res.status(201).json({
            success:true,
            msg:"User is now registered"
          });
        });
      });
    });
});

/*
* @route POST api/users/login
* @desc Login  User
* @ access Public
*/

router.post('/login',(req,res)=>{
  User.findOne({username: req.body.username}).then(user=>{
    if(!user){
      return res.status(404).json({
        msg:"Username is not found",
        success:false
      });
    }
    // username exists
    bcrypt.compare(req.body.password, user.password).then(isMatch =>{
      if(isMatch){
        //User password is correct
        const payload = {
          _id: user._id,
          username:user.username,
          name: user.name,
          email: user.email
        }

        jwt.sign(payload, key, {
          expiresIn:  604800
        },(err,token)=>{
          res.status(200).json({
            success:true,
            user: user,
            token:`Bearer ${token}`,
            msg:"U are logged in"
          });
        });

      }else{
        return res.status(404).json({
          msg:"Incorrect password",
          success:false
        });
      }
    })
  });
});

/*
* @route POST api/users/profile
* @desc user data
* @ access Private
*/

//GetAll Users
router.get('/getAll',async (req,res)=>{
  User.find({}).then(users=>{
     return  res.status(200).json(users);
  });
});

//put VQ
router.put('/putVQ/:id', async(req, res) => {

    let vqData= {
      result:req.body.result,
      finished:req.body.finished,
      date: req.body.date
    }
    // Check for the existing name
    await User.findOne({
        _id: req.params.id
    }).then(async user => {
        if (user) {

          user.vqTest = vqData;
          user.save().then(user=>{
            return res.status(201).json({
                success: true,
                msg: "user saved."
            });
          })

        }else{
          return res.status(400).json({
              msg: "User doesn't exists."
          });
        }
    });
    // The data is valid and new we can register the user
});

//get Users from same company
router.get('/getCollegues/:company', async(req, res) => {

    // Check for the existing name
    await User.find({
        type: req.params.company
    }).then(async users => {
        if (users) {
            return  res.status(200).json(users);
        }else{
          return res.status(400).json({
              msg: "users are empty"
          });
        }
    });
    // The data is valid and new we can register the user
});

router.get('/profile', passport.authenticate('jwt',{
  session:false
}), (req,res) => {
  return res.json({
    user:req.user
  });
});

// put test licnosti
router.put('/putTestLicnosti/:id', async(req, res) => {

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
      date,
      userId,
      finished
   } = req.body;



    let testData= {
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
      date,
      finished
    }
    // Check for the existing name
    await User.findOne({
        _id: req.params.id
    }).then(async user => {
        if (user) {

          user.testLicnosti = testData;
          user.save().then(user=>{
            return res.status(201).json({
                success: true,
                msg: "user saved."
            });
          })

        }else{
          return res.status(400).json({
              msg: "User doesn't exists."
          });
        }
    });
    // The data is valid and new we can register the user
});


//put 360 FeedBack Result
router.put('/putFeedBack/:id', async(req, res) => {

    let = {
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
ans26,
ans27,
ans28,
ans29,
ans30,
ans31,
ans32,
ans33,
ans34,
ans35,
ans36,
ans37,
ans38,
ans39,
ans40,
ans41,
ans42,
ans43,
ans44,
ans45,
ans46,
ans47,
ans48,
ans49,
ans50,
ans51,
ans52,
ans53,
ans54,
ans55,
ans56,
ans57,
ans58,
ans59,
ans60,
ans61,
ans62,
ans63,
ans64,
ans65,
ans66,
ans67,
ans68,
ans69,
ans70,
ans71,
ans72,
ans73,
ans74,
ans75,
ans76,
ans77,
ans78,
ans79,
ans80,
ans81,
ans82,
ans83,
ans84,
ans85,
ans86,
ans87,
ans88,
ans89,
ans90,
ans91,
ans92,
typeOfCollegue
} = req.body;

    // Check for the existing name
    await User.findOne({
        _id: req.params.id
    }).then(async user => {

        let feedBackData=user.feedBackTest;

        if (user) {
          //PODREDJENI
          if(typeOfCollegue==='1'){

            feedBackData.ans1.podredjeni=(feedBackData.ans1.podredjeni*feedBackData.ukupnoPodredjeni+parseInt(ans1))/(feedBackData.ukupnoPodredjeni+1);
feedBackData.ans2.podredjeni=(feedBackData.ans2.podredjeni*feedBackData.ukupnoPodredjeni+parseInt(ans2))/(feedBackData.ukupnoPodredjeni+1);
feedBackData.ans3.podredjeni=(feedBackData.ans3.podredjeni*feedBackData.ukupnoPodredjeni+parseInt(ans3))/(feedBackData.ukupnoPodredjeni+1);
feedBackData.ans4.podredjeni=(feedBackData.ans4.podredjeni*feedBackData.ukupnoPodredjeni+parseInt(ans4))/(feedBackData.ukupnoPodredjeni+1);
feedBackData.ans5.podredjeni=(feedBackData.ans5.podredjeni*feedBackData.ukupnoPodredjeni+parseInt(ans5))/(feedBackData.ukupnoPodredjeni+1);
feedBackData.ans6.podredjeni=(feedBackData.ans6.podredjeni*feedBackData.ukupnoPodredjeni+parseInt(ans6))/(feedBackData.ukupnoPodredjeni+1);
feedBackData.ans7.podredjeni=(feedBackData.ans7.podredjeni*feedBackData.ukupnoPodredjeni+parseInt(ans7))/(feedBackData.ukupnoPodredjeni+1);
feedBackData.ans8.podredjeni=(feedBackData.ans8.podredjeni*feedBackData.ukupnoPodredjeni+parseInt(ans8))/(feedBackData.ukupnoPodredjeni+1);
feedBackData.ans9.podredjeni=(feedBackData.ans9.podredjeni*feedBackData.ukupnoPodredjeni+parseInt(ans9))/(feedBackData.ukupnoPodredjeni+1);
feedBackData.ans10.podredjeni=(feedBackData.ans10.podredjeni*feedBackData.ukupnoPodredjeni+parseInt(ans10))/(feedBackData.ukupnoPodredjeni+1);
feedBackData.ans11.podredjeni=(feedBackData.ans11.podredjeni*feedBackData.ukupnoPodredjeni+parseInt(ans11))/(feedBackData.ukupnoPodredjeni+1);
feedBackData.ans12.podredjeni=(feedBackData.ans12.podredjeni*feedBackData.ukupnoPodredjeni+parseInt(ans12))/(feedBackData.ukupnoPodredjeni+1);
feedBackData.ans13.podredjeni=(feedBackData.ans13.podredjeni*feedBackData.ukupnoPodredjeni+parseInt(ans13))/(feedBackData.ukupnoPodredjeni+1);
feedBackData.ans14.podredjeni=(feedBackData.ans14.podredjeni*feedBackData.ukupnoPodredjeni+parseInt(ans14))/(feedBackData.ukupnoPodredjeni+1);
feedBackData.ans15.podredjeni=(feedBackData.ans15.podredjeni*feedBackData.ukupnoPodredjeni+parseInt(ans15))/(feedBackData.ukupnoPodredjeni+1);
feedBackData.ans16.podredjeni=(feedBackData.ans16.podredjeni*feedBackData.ukupnoPodredjeni+parseInt(ans16))/(feedBackData.ukupnoPodredjeni+1);
feedBackData.ans17.podredjeni=(feedBackData.ans17.podredjeni*feedBackData.ukupnoPodredjeni+parseInt(ans17))/(feedBackData.ukupnoPodredjeni+1);
feedBackData.ans18.podredjeni=(feedBackData.ans18.podredjeni*feedBackData.ukupnoPodredjeni+parseInt(ans18))/(feedBackData.ukupnoPodredjeni+1);
feedBackData.ans19.podredjeni=(feedBackData.ans19.podredjeni*feedBackData.ukupnoPodredjeni+parseInt(ans19))/(feedBackData.ukupnoPodredjeni+1);
feedBackData.ans20.podredjeni=(feedBackData.ans20.podredjeni*feedBackData.ukupnoPodredjeni+parseInt(ans20))/(feedBackData.ukupnoPodredjeni+1);
feedBackData.ans21.podredjeni=(feedBackData.ans21.podredjeni*feedBackData.ukupnoPodredjeni+parseInt(ans21))/(feedBackData.ukupnoPodredjeni+1);
feedBackData.ans22.podredjeni=(feedBackData.ans22.podredjeni*feedBackData.ukupnoPodredjeni+parseInt(ans22))/(feedBackData.ukupnoPodredjeni+1);
feedBackData.ans23.podredjeni=(feedBackData.ans23.podredjeni*feedBackData.ukupnoPodredjeni+parseInt(ans23))/(feedBackData.ukupnoPodredjeni+1);
feedBackData.ans24.podredjeni=(feedBackData.ans24.podredjeni*feedBackData.ukupnoPodredjeni+parseInt(ans24))/(feedBackData.ukupnoPodredjeni+1);
feedBackData.ans25.podredjeni=(feedBackData.ans25.podredjeni*feedBackData.ukupnoPodredjeni+parseInt(ans25))/(feedBackData.ukupnoPodredjeni+1);
feedBackData.ans26.podredjeni=(feedBackData.ans26.podredjeni*feedBackData.ukupnoPodredjeni+parseInt(ans26))/(feedBackData.ukupnoPodredjeni+1);
feedBackData.ans27.podredjeni=(feedBackData.ans27.podredjeni*feedBackData.ukupnoPodredjeni+parseInt(ans27))/(feedBackData.ukupnoPodredjeni+1);
feedBackData.ans28.podredjeni=(feedBackData.ans28.podredjeni*feedBackData.ukupnoPodredjeni+parseInt(ans28))/(feedBackData.ukupnoPodredjeni+1);
feedBackData.ans29.podredjeni=(feedBackData.ans29.podredjeni*feedBackData.ukupnoPodredjeni+parseInt(ans29))/(feedBackData.ukupnoPodredjeni+1);
feedBackData.ans30.podredjeni=(feedBackData.ans30.podredjeni*feedBackData.ukupnoPodredjeni+parseInt(ans30))/(feedBackData.ukupnoPodredjeni+1);
feedBackData.ans31.podredjeni=(feedBackData.ans31.podredjeni*feedBackData.ukupnoPodredjeni+parseInt(ans31))/(feedBackData.ukupnoPodredjeni+1);
feedBackData.ans32.podredjeni=(feedBackData.ans32.podredjeni*feedBackData.ukupnoPodredjeni+parseInt(ans32))/(feedBackData.ukupnoPodredjeni+1);
feedBackData.ans33.podredjeni=(feedBackData.ans33.podredjeni*feedBackData.ukupnoPodredjeni+parseInt(ans33))/(feedBackData.ukupnoPodredjeni+1);
feedBackData.ans34.podredjeni=(feedBackData.ans34.podredjeni*feedBackData.ukupnoPodredjeni+parseInt(ans34))/(feedBackData.ukupnoPodredjeni+1);
feedBackData.ans35.podredjeni=(feedBackData.ans35.podredjeni*feedBackData.ukupnoPodredjeni+parseInt(ans35))/(feedBackData.ukupnoPodredjeni+1);
feedBackData.ans36.podredjeni=(feedBackData.ans36.podredjeni*feedBackData.ukupnoPodredjeni+parseInt(ans36))/(feedBackData.ukupnoPodredjeni+1);
feedBackData.ans37.podredjeni=(feedBackData.ans37.podredjeni*feedBackData.ukupnoPodredjeni+parseInt(ans37))/(feedBackData.ukupnoPodredjeni+1);
feedBackData.ans38.podredjeni=(feedBackData.ans38.podredjeni*feedBackData.ukupnoPodredjeni+parseInt(ans38))/(feedBackData.ukupnoPodredjeni+1);
feedBackData.ans39.podredjeni=(feedBackData.ans39.podredjeni*feedBackData.ukupnoPodredjeni+parseInt(ans39))/(feedBackData.ukupnoPodredjeni+1);
feedBackData.ans40.podredjeni=(feedBackData.ans40.podredjeni*feedBackData.ukupnoPodredjeni+parseInt(ans40))/(feedBackData.ukupnoPodredjeni+1);
feedBackData.ans41.podredjeni=(feedBackData.ans41.podredjeni*feedBackData.ukupnoPodredjeni+parseInt(ans41))/(feedBackData.ukupnoPodredjeni+1);
feedBackData.ans42.podredjeni=(feedBackData.ans42.podredjeni*feedBackData.ukupnoPodredjeni+parseInt(ans42))/(feedBackData.ukupnoPodredjeni+1);
feedBackData.ans43.podredjeni=(feedBackData.ans43.podredjeni*feedBackData.ukupnoPodredjeni+parseInt(ans43))/(feedBackData.ukupnoPodredjeni+1);
feedBackData.ans44.podredjeni=(feedBackData.ans44.podredjeni*feedBackData.ukupnoPodredjeni+parseInt(ans44))/(feedBackData.ukupnoPodredjeni+1);
feedBackData.ans45.podredjeni=(feedBackData.ans45.podredjeni*feedBackData.ukupnoPodredjeni+parseInt(ans45))/(feedBackData.ukupnoPodredjeni+1);
feedBackData.ans46.podredjeni=(feedBackData.ans46.podredjeni*feedBackData.ukupnoPodredjeni+parseInt(ans46))/(feedBackData.ukupnoPodredjeni+1);
feedBackData.ans47.podredjeni=(feedBackData.ans47.podredjeni*feedBackData.ukupnoPodredjeni+parseInt(ans47))/(feedBackData.ukupnoPodredjeni+1);
feedBackData.ans48.podredjeni=(feedBackData.ans48.podredjeni*feedBackData.ukupnoPodredjeni+parseInt(ans48))/(feedBackData.ukupnoPodredjeni+1);
feedBackData.ans49.podredjeni=(feedBackData.ans49.podredjeni*feedBackData.ukupnoPodredjeni+parseInt(ans49))/(feedBackData.ukupnoPodredjeni+1);
feedBackData.ans50.podredjeni=(feedBackData.ans50.podredjeni*feedBackData.ukupnoPodredjeni+parseInt(ans50))/(feedBackData.ukupnoPodredjeni+1);
feedBackData.ans51.podredjeni=(feedBackData.ans51.podredjeni*feedBackData.ukupnoPodredjeni+parseInt(ans51))/(feedBackData.ukupnoPodredjeni+1);
feedBackData.ans52.podredjeni=(feedBackData.ans52.podredjeni*feedBackData.ukupnoPodredjeni+parseInt(ans52))/(feedBackData.ukupnoPodredjeni+1);
feedBackData.ans53.podredjeni=(feedBackData.ans53.podredjeni*feedBackData.ukupnoPodredjeni+parseInt(ans53))/(feedBackData.ukupnoPodredjeni+1);
feedBackData.ans54.podredjeni=(feedBackData.ans54.podredjeni*feedBackData.ukupnoPodredjeni+parseInt(ans54))/(feedBackData.ukupnoPodredjeni+1);
feedBackData.ans55.podredjeni=(feedBackData.ans55.podredjeni*feedBackData.ukupnoPodredjeni+parseInt(ans55))/(feedBackData.ukupnoPodredjeni+1);
feedBackData.ans56.podredjeni=(feedBackData.ans56.podredjeni*feedBackData.ukupnoPodredjeni+parseInt(ans56))/(feedBackData.ukupnoPodredjeni+1);
feedBackData.ans57.podredjeni=(feedBackData.ans57.podredjeni*feedBackData.ukupnoPodredjeni+parseInt(ans57))/(feedBackData.ukupnoPodredjeni+1);
feedBackData.ans58.podredjeni=(feedBackData.ans58.podredjeni*feedBackData.ukupnoPodredjeni+parseInt(ans58))/(feedBackData.ukupnoPodredjeni+1);
feedBackData.ans59.podredjeni=(feedBackData.ans59.podredjeni*feedBackData.ukupnoPodredjeni+parseInt(ans59))/(feedBackData.ukupnoPodredjeni+1);
feedBackData.ans60.podredjeni=(feedBackData.ans60.podredjeni*feedBackData.ukupnoPodredjeni+parseInt(ans60))/(feedBackData.ukupnoPodredjeni+1);
feedBackData.ans61.podredjeni=(feedBackData.ans61.podredjeni*feedBackData.ukupnoPodredjeni+parseInt(ans61))/(feedBackData.ukupnoPodredjeni+1);
feedBackData.ans62.podredjeni=(feedBackData.ans62.podredjeni*feedBackData.ukupnoPodredjeni+parseInt(ans62))/(feedBackData.ukupnoPodredjeni+1);
feedBackData.ans63.podredjeni=(feedBackData.ans63.podredjeni*feedBackData.ukupnoPodredjeni+parseInt(ans63))/(feedBackData.ukupnoPodredjeni+1);
feedBackData.ans64.podredjeni=(feedBackData.ans64.podredjeni*feedBackData.ukupnoPodredjeni+parseInt(ans64))/(feedBackData.ukupnoPodredjeni+1);
feedBackData.ans65.podredjeni=(feedBackData.ans65.podredjeni*feedBackData.ukupnoPodredjeni+parseInt(ans65))/(feedBackData.ukupnoPodredjeni+1);
feedBackData.ans66.podredjeni=(feedBackData.ans66.podredjeni*feedBackData.ukupnoPodredjeni+parseInt(ans66))/(feedBackData.ukupnoPodredjeni+1);
feedBackData.ans67.podredjeni=(feedBackData.ans67.podredjeni*feedBackData.ukupnoPodredjeni+parseInt(ans67))/(feedBackData.ukupnoPodredjeni+1);
feedBackData.ans68.podredjeni=(feedBackData.ans68.podredjeni*feedBackData.ukupnoPodredjeni+parseInt(ans68))/(feedBackData.ukupnoPodredjeni+1);
feedBackData.ans69.podredjeni=(feedBackData.ans69.podredjeni*feedBackData.ukupnoPodredjeni+parseInt(ans69))/(feedBackData.ukupnoPodredjeni+1);
feedBackData.ans70.podredjeni=(feedBackData.ans70.podredjeni*feedBackData.ukupnoPodredjeni+parseInt(ans70))/(feedBackData.ukupnoPodredjeni+1);
feedBackData.ans71.podredjeni=(feedBackData.ans71.podredjeni*feedBackData.ukupnoPodredjeni+parseInt(ans71))/(feedBackData.ukupnoPodredjeni+1);
feedBackData.ans72.podredjeni=(feedBackData.ans72.podredjeni*feedBackData.ukupnoPodredjeni+parseInt(ans72))/(feedBackData.ukupnoPodredjeni+1);
feedBackData.ans73.podredjeni=(feedBackData.ans73.podredjeni*feedBackData.ukupnoPodredjeni+parseInt(ans73))/(feedBackData.ukupnoPodredjeni+1);
feedBackData.ans74.podredjeni=(feedBackData.ans74.podredjeni*feedBackData.ukupnoPodredjeni+parseInt(ans74))/(feedBackData.ukupnoPodredjeni+1);
feedBackData.ans75.podredjeni=(feedBackData.ans75.podredjeni*feedBackData.ukupnoPodredjeni+parseInt(ans75))/(feedBackData.ukupnoPodredjeni+1);
feedBackData.ans76.podredjeni=(feedBackData.ans76.podredjeni*feedBackData.ukupnoPodredjeni+parseInt(ans76))/(feedBackData.ukupnoPodredjeni+1);
feedBackData.ans77.podredjeni=(feedBackData.ans77.podredjeni*feedBackData.ukupnoPodredjeni+parseInt(ans77))/(feedBackData.ukupnoPodredjeni+1);
feedBackData.ans78.podredjeni=(feedBackData.ans78.podredjeni*feedBackData.ukupnoPodredjeni+parseInt(ans78))/(feedBackData.ukupnoPodredjeni+1);
feedBackData.ans79.podredjeni=(feedBackData.ans79.podredjeni*feedBackData.ukupnoPodredjeni+parseInt(ans79))/(feedBackData.ukupnoPodredjeni+1);
feedBackData.ans80.podredjeni=(feedBackData.ans80.podredjeni*feedBackData.ukupnoPodredjeni+parseInt(ans80))/(feedBackData.ukupnoPodredjeni+1);
feedBackData.ans81.podredjeni=(feedBackData.ans81.podredjeni*feedBackData.ukupnoPodredjeni+parseInt(ans81))/(feedBackData.ukupnoPodredjeni+1);
feedBackData.ans82.podredjeni=(feedBackData.ans82.podredjeni*feedBackData.ukupnoPodredjeni+parseInt(ans82))/(feedBackData.ukupnoPodredjeni+1);
feedBackData.ans83.podredjeni=(feedBackData.ans83.podredjeni*feedBackData.ukupnoPodredjeni+parseInt(ans83))/(feedBackData.ukupnoPodredjeni+1);
feedBackData.ans84.podredjeni=(feedBackData.ans84.podredjeni*feedBackData.ukupnoPodredjeni+parseInt(ans84))/(feedBackData.ukupnoPodredjeni+1);
feedBackData.ans85.podredjeni=(feedBackData.ans85.podredjeni*feedBackData.ukupnoPodredjeni+parseInt(ans85))/(feedBackData.ukupnoPodredjeni+1);
feedBackData.ans86.podredjeni=(feedBackData.ans86.podredjeni*feedBackData.ukupnoPodredjeni+parseInt(ans86))/(feedBackData.ukupnoPodredjeni+1);
feedBackData.ans87.podredjeni=(feedBackData.ans87.podredjeni*feedBackData.ukupnoPodredjeni+parseInt(ans87))/(feedBackData.ukupnoPodredjeni+1);
feedBackData.ans88.podredjeni=(feedBackData.ans88.podredjeni*feedBackData.ukupnoPodredjeni+parseInt(ans88))/(feedBackData.ukupnoPodredjeni+1);
feedBackData.ans89.podredjeni=(feedBackData.ans89.podredjeni*feedBackData.ukupnoPodredjeni+parseInt(ans89))/(feedBackData.ukupnoPodredjeni+1);
feedBackData.ans90.podredjeni=(feedBackData.ans90.podredjeni*feedBackData.ukupnoPodredjeni+parseInt(ans90))/(feedBackData.ukupnoPodredjeni+1);
feedBackData.ans91.podredjeni=(feedBackData.ans91.podredjeni*feedBackData.ukupnoPodredjeni+parseInt(ans91))/(feedBackData.ukupnoPodredjeni+1);
feedBackData.ans92.podredjeni=(feedBackData.ans92.podredjeni*feedBackData.ukupnoPodredjeni+parseInt(ans92))/(feedBackData.ukupnoPodredjeni+1);

  feedBackData.ukupnoPodredjeni+=1;

  feedBackData.prosek.podredjeni=
  ( feedBackData.ans1.podredjeni
+ feedBackData.ans2.podredjeni
+ feedBackData.ans3.podredjeni
+ feedBackData.ans4.podredjeni
+ feedBackData.ans5.podredjeni
+ feedBackData.ans6.podredjeni
+ feedBackData.ans7.podredjeni
+ feedBackData.ans8.podredjeni
+ feedBackData.ans9.podredjeni
+ feedBackData.ans10.podredjeni
+ feedBackData.ans11.podredjeni
+ feedBackData.ans12.podredjeni
+ feedBackData.ans13.podredjeni
+ feedBackData.ans14.podredjeni
+ feedBackData.ans15.podredjeni
+ feedBackData.ans16.podredjeni
+ feedBackData.ans17.podredjeni
+ feedBackData.ans18.podredjeni
+ feedBackData.ans19.podredjeni
+ feedBackData.ans20.podredjeni
+ feedBackData.ans21.podredjeni
+ feedBackData.ans22.podredjeni
+ feedBackData.ans23.podredjeni
+ feedBackData.ans24.podredjeni
+ feedBackData.ans25.podredjeni
+ feedBackData.ans26.podredjeni
+ feedBackData.ans27.podredjeni
+ feedBackData.ans28.podredjeni
+ feedBackData.ans29.podredjeni
+ feedBackData.ans30.podredjeni
+ feedBackData.ans31.podredjeni
+ feedBackData.ans32.podredjeni
+ feedBackData.ans33.podredjeni
+ feedBackData.ans34.podredjeni
+ feedBackData.ans35.podredjeni
+ feedBackData.ans36.podredjeni
+ feedBackData.ans37.podredjeni
+ feedBackData.ans38.podredjeni
+ feedBackData.ans39.podredjeni
+ feedBackData.ans40.podredjeni
+ feedBackData.ans41.podredjeni
+ feedBackData.ans42.podredjeni
+ feedBackData.ans43.podredjeni
+ feedBackData.ans44.podredjeni
+ feedBackData.ans45.podredjeni
+ feedBackData.ans46.podredjeni
+ feedBackData.ans47.podredjeni
+ feedBackData.ans48.podredjeni
+ feedBackData.ans49.podredjeni
+ feedBackData.ans50.podredjeni
+ feedBackData.ans51.podredjeni
+ feedBackData.ans52.podredjeni
+ feedBackData.ans53.podredjeni
+ feedBackData.ans54.podredjeni
+ feedBackData.ans55.podredjeni
+ feedBackData.ans56.podredjeni
+ feedBackData.ans57.podredjeni
+ feedBackData.ans58.podredjeni
+ feedBackData.ans59.podredjeni
+ feedBackData.ans60.podredjeni
+ feedBackData.ans61.podredjeni
+ feedBackData.ans62.podredjeni
+ feedBackData.ans63.podredjeni
+ feedBackData.ans64.podredjeni
+ feedBackData.ans65.podredjeni
+ feedBackData.ans66.podredjeni
+ feedBackData.ans67.podredjeni
+ feedBackData.ans68.podredjeni
+ feedBackData.ans69.podredjeni
+ feedBackData.ans70.podredjeni
+ feedBackData.ans71.podredjeni
+ feedBackData.ans72.podredjeni
+ feedBackData.ans73.podredjeni
+ feedBackData.ans74.podredjeni
+ feedBackData.ans75.podredjeni
+ feedBackData.ans76.podredjeni
+ feedBackData.ans77.podredjeni
+ feedBackData.ans78.podredjeni
+ feedBackData.ans79.podredjeni
+ feedBackData.ans80.podredjeni
+ feedBackData.ans81.podredjeni
+ feedBackData.ans82.podredjeni
+ feedBackData.ans83.podredjeni
+ feedBackData.ans84.podredjeni
+ feedBackData.ans85.podredjeni
+ feedBackData.ans86.podredjeni
+ feedBackData.ans87.podredjeni
+ feedBackData.ans88.podredjeni
+ feedBackData.ans89.podredjeni
+ feedBackData.ans90.podredjeni
+ feedBackData.ans91.podredjeni
+ feedBackData.ans92.podredjeni)/ 92;

  feedBackData.prosek.ukupno=(feedBackData.prosek.podredjeni+feedBackData.prosek.nadredjeni)/2;

          }
          //NADREDJENI
          if(typeOfCollegue==='2'){

            feedBackData.ans1.nadredjeni=(feedBackData.ans1.nadredjeni*feedBackData.ukupnoNadredjeni+parseInt(ans1))/(feedBackData.ukupnoNadredjeni+1);
feedBackData.ans2.nadredjeni=(feedBackData.ans2.nadredjeni*feedBackData.ukupnoNadredjeni+parseInt(ans2))/(feedBackData.ukupnoNadredjeni+1);
feedBackData.ans3.nadredjeni=(feedBackData.ans3.nadredjeni*feedBackData.ukupnoNadredjeni+parseInt(ans3))/(feedBackData.ukupnoNadredjeni+1);
feedBackData.ans4.nadredjeni=(feedBackData.ans4.nadredjeni*feedBackData.ukupnoNadredjeni+parseInt(ans4))/(feedBackData.ukupnoNadredjeni+1);
feedBackData.ans5.nadredjeni=(feedBackData.ans5.nadredjeni*feedBackData.ukupnoNadredjeni+parseInt(ans5))/(feedBackData.ukupnoNadredjeni+1);
feedBackData.ans6.nadredjeni=(feedBackData.ans6.nadredjeni*feedBackData.ukupnoNadredjeni+parseInt(ans6))/(feedBackData.ukupnoNadredjeni+1);
feedBackData.ans7.nadredjeni=(feedBackData.ans7.nadredjeni*feedBackData.ukupnoNadredjeni+parseInt(ans7))/(feedBackData.ukupnoNadredjeni+1);
feedBackData.ans8.nadredjeni=(feedBackData.ans8.nadredjeni*feedBackData.ukupnoNadredjeni+parseInt(ans8))/(feedBackData.ukupnoNadredjeni+1);
feedBackData.ans9.nadredjeni=(feedBackData.ans9.nadredjeni*feedBackData.ukupnoNadredjeni+parseInt(ans9))/(feedBackData.ukupnoNadredjeni+1);
feedBackData.ans10.nadredjeni=(feedBackData.ans10.nadredjeni*feedBackData.ukupnoNadredjeni+parseInt(ans10))/(feedBackData.ukupnoNadredjeni+1);
feedBackData.ans11.nadredjeni=(feedBackData.ans11.nadredjeni*feedBackData.ukupnoNadredjeni+parseInt(ans11))/(feedBackData.ukupnoNadredjeni+1);
feedBackData.ans12.nadredjeni=(feedBackData.ans12.nadredjeni*feedBackData.ukupnoNadredjeni+parseInt(ans12))/(feedBackData.ukupnoNadredjeni+1);
feedBackData.ans13.nadredjeni=(feedBackData.ans13.nadredjeni*feedBackData.ukupnoNadredjeni+parseInt(ans13))/(feedBackData.ukupnoNadredjeni+1);
feedBackData.ans14.nadredjeni=(feedBackData.ans14.nadredjeni*feedBackData.ukupnoNadredjeni+parseInt(ans14))/(feedBackData.ukupnoNadredjeni+1);
feedBackData.ans15.nadredjeni=(feedBackData.ans15.nadredjeni*feedBackData.ukupnoNadredjeni+parseInt(ans15))/(feedBackData.ukupnoNadredjeni+1);
feedBackData.ans16.nadredjeni=(feedBackData.ans16.nadredjeni*feedBackData.ukupnoNadredjeni+parseInt(ans16))/(feedBackData.ukupnoNadredjeni+1);
feedBackData.ans17.nadredjeni=(feedBackData.ans17.nadredjeni*feedBackData.ukupnoNadredjeni+parseInt(ans17))/(feedBackData.ukupnoNadredjeni+1);
feedBackData.ans18.nadredjeni=(feedBackData.ans18.nadredjeni*feedBackData.ukupnoNadredjeni+parseInt(ans18))/(feedBackData.ukupnoNadredjeni+1);
feedBackData.ans19.nadredjeni=(feedBackData.ans19.nadredjeni*feedBackData.ukupnoNadredjeni+parseInt(ans19))/(feedBackData.ukupnoNadredjeni+1);
feedBackData.ans20.nadredjeni=(feedBackData.ans20.nadredjeni*feedBackData.ukupnoNadredjeni+parseInt(ans20))/(feedBackData.ukupnoNadredjeni+1);
feedBackData.ans21.nadredjeni=(feedBackData.ans21.nadredjeni*feedBackData.ukupnoNadredjeni+parseInt(ans21))/(feedBackData.ukupnoNadredjeni+1);
feedBackData.ans22.nadredjeni=(feedBackData.ans22.nadredjeni*feedBackData.ukupnoNadredjeni+parseInt(ans22))/(feedBackData.ukupnoNadredjeni+1);
feedBackData.ans23.nadredjeni=(feedBackData.ans23.nadredjeni*feedBackData.ukupnoNadredjeni+parseInt(ans23))/(feedBackData.ukupnoNadredjeni+1);
feedBackData.ans24.nadredjeni=(feedBackData.ans24.nadredjeni*feedBackData.ukupnoNadredjeni+parseInt(ans24))/(feedBackData.ukupnoNadredjeni+1);
feedBackData.ans25.nadredjeni=(feedBackData.ans25.nadredjeni*feedBackData.ukupnoNadredjeni+parseInt(ans25))/(feedBackData.ukupnoNadredjeni+1);
feedBackData.ans26.nadredjeni=(feedBackData.ans26.nadredjeni*feedBackData.ukupnoNadredjeni+parseInt(ans26))/(feedBackData.ukupnoNadredjeni+1);
feedBackData.ans27.nadredjeni=(feedBackData.ans27.nadredjeni*feedBackData.ukupnoNadredjeni+parseInt(ans27))/(feedBackData.ukupnoNadredjeni+1);
feedBackData.ans28.nadredjeni=(feedBackData.ans28.nadredjeni*feedBackData.ukupnoNadredjeni+parseInt(ans28))/(feedBackData.ukupnoNadredjeni+1);
feedBackData.ans29.nadredjeni=(feedBackData.ans29.nadredjeni*feedBackData.ukupnoNadredjeni+parseInt(ans29))/(feedBackData.ukupnoNadredjeni+1);
feedBackData.ans30.nadredjeni=(feedBackData.ans30.nadredjeni*feedBackData.ukupnoNadredjeni+parseInt(ans30))/(feedBackData.ukupnoNadredjeni+1);
feedBackData.ans31.nadredjeni=(feedBackData.ans31.nadredjeni*feedBackData.ukupnoNadredjeni+parseInt(ans31))/(feedBackData.ukupnoNadredjeni+1);
feedBackData.ans32.nadredjeni=(feedBackData.ans32.nadredjeni*feedBackData.ukupnoNadredjeni+parseInt(ans32))/(feedBackData.ukupnoNadredjeni+1);
feedBackData.ans33.nadredjeni=(feedBackData.ans33.nadredjeni*feedBackData.ukupnoNadredjeni+parseInt(ans33))/(feedBackData.ukupnoNadredjeni+1);
feedBackData.ans34.nadredjeni=(feedBackData.ans34.nadredjeni*feedBackData.ukupnoNadredjeni+parseInt(ans34))/(feedBackData.ukupnoNadredjeni+1);
feedBackData.ans35.nadredjeni=(feedBackData.ans35.nadredjeni*feedBackData.ukupnoNadredjeni+parseInt(ans35))/(feedBackData.ukupnoNadredjeni+1);
feedBackData.ans36.nadredjeni=(feedBackData.ans36.nadredjeni*feedBackData.ukupnoNadredjeni+parseInt(ans36))/(feedBackData.ukupnoNadredjeni+1);
feedBackData.ans37.nadredjeni=(feedBackData.ans37.nadredjeni*feedBackData.ukupnoNadredjeni+parseInt(ans37))/(feedBackData.ukupnoNadredjeni+1);
feedBackData.ans38.nadredjeni=(feedBackData.ans38.nadredjeni*feedBackData.ukupnoNadredjeni+parseInt(ans38))/(feedBackData.ukupnoNadredjeni+1);
feedBackData.ans39.nadredjeni=(feedBackData.ans39.nadredjeni*feedBackData.ukupnoNadredjeni+parseInt(ans39))/(feedBackData.ukupnoNadredjeni+1);
feedBackData.ans40.nadredjeni=(feedBackData.ans40.nadredjeni*feedBackData.ukupnoNadredjeni+parseInt(ans40))/(feedBackData.ukupnoNadredjeni+1);
feedBackData.ans41.nadredjeni=(feedBackData.ans41.nadredjeni*feedBackData.ukupnoNadredjeni+parseInt(ans41))/(feedBackData.ukupnoNadredjeni+1);
feedBackData.ans42.nadredjeni=(feedBackData.ans42.nadredjeni*feedBackData.ukupnoNadredjeni+parseInt(ans42))/(feedBackData.ukupnoNadredjeni+1);
feedBackData.ans43.nadredjeni=(feedBackData.ans43.nadredjeni*feedBackData.ukupnoNadredjeni+parseInt(ans43))/(feedBackData.ukupnoNadredjeni+1);
feedBackData.ans44.nadredjeni=(feedBackData.ans44.nadredjeni*feedBackData.ukupnoNadredjeni+parseInt(ans44))/(feedBackData.ukupnoNadredjeni+1);
feedBackData.ans45.nadredjeni=(feedBackData.ans45.nadredjeni*feedBackData.ukupnoNadredjeni+parseInt(ans45))/(feedBackData.ukupnoNadredjeni+1);
feedBackData.ans46.nadredjeni=(feedBackData.ans46.nadredjeni*feedBackData.ukupnoNadredjeni+parseInt(ans46))/(feedBackData.ukupnoNadredjeni+1);
feedBackData.ans47.nadredjeni=(feedBackData.ans47.nadredjeni*feedBackData.ukupnoNadredjeni+parseInt(ans47))/(feedBackData.ukupnoNadredjeni+1);
feedBackData.ans48.nadredjeni=(feedBackData.ans48.nadredjeni*feedBackData.ukupnoNadredjeni+parseInt(ans48))/(feedBackData.ukupnoNadredjeni+1);
feedBackData.ans49.nadredjeni=(feedBackData.ans49.nadredjeni*feedBackData.ukupnoNadredjeni+parseInt(ans49))/(feedBackData.ukupnoNadredjeni+1);
feedBackData.ans50.nadredjeni=(feedBackData.ans50.nadredjeni*feedBackData.ukupnoNadredjeni+parseInt(ans50))/(feedBackData.ukupnoNadredjeni+1);
feedBackData.ans51.nadredjeni=(feedBackData.ans51.nadredjeni*feedBackData.ukupnoNadredjeni+parseInt(ans51))/(feedBackData.ukupnoNadredjeni+1);
feedBackData.ans52.nadredjeni=(feedBackData.ans52.nadredjeni*feedBackData.ukupnoNadredjeni+parseInt(ans52))/(feedBackData.ukupnoNadredjeni+1);
feedBackData.ans53.nadredjeni=(feedBackData.ans53.nadredjeni*feedBackData.ukupnoNadredjeni+parseInt(ans53))/(feedBackData.ukupnoNadredjeni+1);
feedBackData.ans54.nadredjeni=(feedBackData.ans54.nadredjeni*feedBackData.ukupnoNadredjeni+parseInt(ans54))/(feedBackData.ukupnoNadredjeni+1);
feedBackData.ans55.nadredjeni=(feedBackData.ans55.nadredjeni*feedBackData.ukupnoNadredjeni+parseInt(ans55))/(feedBackData.ukupnoNadredjeni+1);
feedBackData.ans56.nadredjeni=(feedBackData.ans56.nadredjeni*feedBackData.ukupnoNadredjeni+parseInt(ans56))/(feedBackData.ukupnoNadredjeni+1);
feedBackData.ans57.nadredjeni=(feedBackData.ans57.nadredjeni*feedBackData.ukupnoNadredjeni+parseInt(ans57))/(feedBackData.ukupnoNadredjeni+1);
feedBackData.ans58.nadredjeni=(feedBackData.ans58.nadredjeni*feedBackData.ukupnoNadredjeni+parseInt(ans58))/(feedBackData.ukupnoNadredjeni+1);
feedBackData.ans59.nadredjeni=(feedBackData.ans59.nadredjeni*feedBackData.ukupnoNadredjeni+parseInt(ans59))/(feedBackData.ukupnoNadredjeni+1);
feedBackData.ans60.nadredjeni=(feedBackData.ans60.nadredjeni*feedBackData.ukupnoNadredjeni+parseInt(ans60))/(feedBackData.ukupnoNadredjeni+1);
feedBackData.ans61.nadredjeni=(feedBackData.ans61.nadredjeni*feedBackData.ukupnoNadredjeni+parseInt(ans61))/(feedBackData.ukupnoNadredjeni+1);
feedBackData.ans62.nadredjeni=(feedBackData.ans62.nadredjeni*feedBackData.ukupnoNadredjeni+parseInt(ans62))/(feedBackData.ukupnoNadredjeni+1);
feedBackData.ans63.nadredjeni=(feedBackData.ans63.nadredjeni*feedBackData.ukupnoNadredjeni+parseInt(ans63))/(feedBackData.ukupnoNadredjeni+1);
feedBackData.ans64.nadredjeni=(feedBackData.ans64.nadredjeni*feedBackData.ukupnoNadredjeni+parseInt(ans64))/(feedBackData.ukupnoNadredjeni+1);
feedBackData.ans65.nadredjeni=(feedBackData.ans65.nadredjeni*feedBackData.ukupnoNadredjeni+parseInt(ans65))/(feedBackData.ukupnoNadredjeni+1);
feedBackData.ans66.nadredjeni=(feedBackData.ans66.nadredjeni*feedBackData.ukupnoNadredjeni+parseInt(ans66))/(feedBackData.ukupnoNadredjeni+1);
feedBackData.ans67.nadredjeni=(feedBackData.ans67.nadredjeni*feedBackData.ukupnoNadredjeni+parseInt(ans67))/(feedBackData.ukupnoNadredjeni+1);
feedBackData.ans68.nadredjeni=(feedBackData.ans68.nadredjeni*feedBackData.ukupnoNadredjeni+parseInt(ans68))/(feedBackData.ukupnoNadredjeni+1);
feedBackData.ans69.nadredjeni=(feedBackData.ans69.nadredjeni*feedBackData.ukupnoNadredjeni+parseInt(ans69))/(feedBackData.ukupnoNadredjeni+1);
feedBackData.ans70.nadredjeni=(feedBackData.ans70.nadredjeni*feedBackData.ukupnoNadredjeni+parseInt(ans70))/(feedBackData.ukupnoNadredjeni+1);
feedBackData.ans71.nadredjeni=(feedBackData.ans71.nadredjeni*feedBackData.ukupnoNadredjeni+parseInt(ans71))/(feedBackData.ukupnoNadredjeni+1);
feedBackData.ans72.nadredjeni=(feedBackData.ans72.nadredjeni*feedBackData.ukupnoNadredjeni+parseInt(ans72))/(feedBackData.ukupnoNadredjeni+1);
feedBackData.ans73.nadredjeni=(feedBackData.ans73.nadredjeni*feedBackData.ukupnoNadredjeni+parseInt(ans73))/(feedBackData.ukupnoNadredjeni+1);
feedBackData.ans74.nadredjeni=(feedBackData.ans74.nadredjeni*feedBackData.ukupnoNadredjeni+parseInt(ans74))/(feedBackData.ukupnoNadredjeni+1);
feedBackData.ans75.nadredjeni=(feedBackData.ans75.nadredjeni*feedBackData.ukupnoNadredjeni+parseInt(ans75))/(feedBackData.ukupnoNadredjeni+1);
feedBackData.ans76.nadredjeni=(feedBackData.ans76.nadredjeni*feedBackData.ukupnoNadredjeni+parseInt(ans76))/(feedBackData.ukupnoNadredjeni+1);
feedBackData.ans77.nadredjeni=(feedBackData.ans77.nadredjeni*feedBackData.ukupnoNadredjeni+parseInt(ans77))/(feedBackData.ukupnoNadredjeni+1);
feedBackData.ans78.nadredjeni=(feedBackData.ans78.nadredjeni*feedBackData.ukupnoNadredjeni+parseInt(ans78))/(feedBackData.ukupnoNadredjeni+1);
feedBackData.ans79.nadredjeni=(feedBackData.ans79.nadredjeni*feedBackData.ukupnoNadredjeni+parseInt(ans79))/(feedBackData.ukupnoNadredjeni+1);
feedBackData.ans80.nadredjeni=(feedBackData.ans80.nadredjeni*feedBackData.ukupnoNadredjeni+parseInt(ans80))/(feedBackData.ukupnoNadredjeni+1);
feedBackData.ans81.nadredjeni=(feedBackData.ans81.nadredjeni*feedBackData.ukupnoNadredjeni+parseInt(ans81))/(feedBackData.ukupnoNadredjeni+1);
feedBackData.ans82.nadredjeni=(feedBackData.ans82.nadredjeni*feedBackData.ukupnoNadredjeni+parseInt(ans82))/(feedBackData.ukupnoNadredjeni+1);
feedBackData.ans83.nadredjeni=(feedBackData.ans83.nadredjeni*feedBackData.ukupnoNadredjeni+parseInt(ans83))/(feedBackData.ukupnoNadredjeni+1);
feedBackData.ans84.nadredjeni=(feedBackData.ans84.nadredjeni*feedBackData.ukupnoNadredjeni+parseInt(ans84))/(feedBackData.ukupnoNadredjeni+1);
feedBackData.ans85.nadredjeni=(feedBackData.ans85.nadredjeni*feedBackData.ukupnoNadredjeni+parseInt(ans85))/(feedBackData.ukupnoNadredjeni+1);
feedBackData.ans86.nadredjeni=(feedBackData.ans86.nadredjeni*feedBackData.ukupnoNadredjeni+parseInt(ans86))/(feedBackData.ukupnoNadredjeni+1);
feedBackData.ans87.nadredjeni=(feedBackData.ans87.nadredjeni*feedBackData.ukupnoNadredjeni+parseInt(ans87))/(feedBackData.ukupnoNadredjeni+1);
feedBackData.ans88.nadredjeni=(feedBackData.ans88.nadredjeni*feedBackData.ukupnoNadredjeni+parseInt(ans88))/(feedBackData.ukupnoNadredjeni+1);
feedBackData.ans89.nadredjeni=(feedBackData.ans89.nadredjeni*feedBackData.ukupnoNadredjeni+parseInt(ans89))/(feedBackData.ukupnoNadredjeni+1);
feedBackData.ans90.nadredjeni=(feedBackData.ans90.nadredjeni*feedBackData.ukupnoNadredjeni+parseInt(ans90))/(feedBackData.ukupnoNadredjeni+1);
feedBackData.ans91.nadredjeni=(feedBackData.ans91.nadredjeni*feedBackData.ukupnoNadredjeni+parseInt(ans91))/(feedBackData.ukupnoNadredjeni+1);
feedBackData.ans92.nadredjeni=(feedBackData.ans92.nadredjeni*feedBackData.ukupnoNadredjeni+parseInt(ans92))/(feedBackData.ukupnoNadredjeni+1);
              feedBackData.ukupnoNadredjeni+=1;

              feedBackData.prosek.nadredjeni=
              ( feedBackData.ans1.nadredjeni
+ feedBackData.ans2.nadredjeni
+ feedBackData.ans3.nadredjeni
+ feedBackData.ans4.nadredjeni
+ feedBackData.ans5.nadredjeni
+ feedBackData.ans6.nadredjeni
+ feedBackData.ans7.nadredjeni
+ feedBackData.ans8.nadredjeni
+ feedBackData.ans9.nadredjeni
+ feedBackData.ans10.nadredjeni
+ feedBackData.ans11.nadredjeni
+ feedBackData.ans12.nadredjeni
+ feedBackData.ans13.nadredjeni
+ feedBackData.ans14.nadredjeni
+ feedBackData.ans15.nadredjeni
+ feedBackData.ans16.nadredjeni
+ feedBackData.ans17.nadredjeni
+ feedBackData.ans18.nadredjeni
+ feedBackData.ans19.nadredjeni
+ feedBackData.ans20.nadredjeni
+ feedBackData.ans21.nadredjeni
+ feedBackData.ans22.nadredjeni
+ feedBackData.ans23.nadredjeni
+ feedBackData.ans24.nadredjeni
+ feedBackData.ans25.nadredjeni
+ feedBackData.ans26.nadredjeni
+ feedBackData.ans27.nadredjeni
+ feedBackData.ans28.nadredjeni
+ feedBackData.ans29.nadredjeni
+ feedBackData.ans30.nadredjeni
+ feedBackData.ans31.nadredjeni
+ feedBackData.ans32.nadredjeni
+ feedBackData.ans33.nadredjeni
+ feedBackData.ans34.nadredjeni
+ feedBackData.ans35.nadredjeni
+ feedBackData.ans36.nadredjeni
+ feedBackData.ans37.nadredjeni
+ feedBackData.ans38.nadredjeni
+ feedBackData.ans39.nadredjeni
+ feedBackData.ans40.nadredjeni
+ feedBackData.ans41.nadredjeni
+ feedBackData.ans42.nadredjeni
+ feedBackData.ans43.nadredjeni
+ feedBackData.ans44.nadredjeni
+ feedBackData.ans45.nadredjeni
+ feedBackData.ans46.nadredjeni
+ feedBackData.ans47.nadredjeni
+ feedBackData.ans48.nadredjeni
+ feedBackData.ans49.nadredjeni
+ feedBackData.ans50.nadredjeni
+ feedBackData.ans51.nadredjeni
+ feedBackData.ans52.nadredjeni
+ feedBackData.ans53.nadredjeni
+ feedBackData.ans54.nadredjeni
+ feedBackData.ans55.nadredjeni
+ feedBackData.ans56.nadredjeni
+ feedBackData.ans57.nadredjeni
+ feedBackData.ans58.nadredjeni
+ feedBackData.ans59.nadredjeni
+ feedBackData.ans60.nadredjeni
+ feedBackData.ans61.nadredjeni
+ feedBackData.ans62.nadredjeni
+ feedBackData.ans63.nadredjeni
+ feedBackData.ans64.nadredjeni
+ feedBackData.ans65.nadredjeni
+ feedBackData.ans66.nadredjeni
+ feedBackData.ans67.nadredjeni
+ feedBackData.ans68.nadredjeni
+ feedBackData.ans69.nadredjeni
+ feedBackData.ans70.nadredjeni
+ feedBackData.ans71.nadredjeni
+ feedBackData.ans72.nadredjeni
+ feedBackData.ans73.nadredjeni
+ feedBackData.ans74.nadredjeni
+ feedBackData.ans75.nadredjeni
+ feedBackData.ans76.nadredjeni
+ feedBackData.ans77.nadredjeni
+ feedBackData.ans78.nadredjeni
+ feedBackData.ans79.nadredjeni
+ feedBackData.ans80.nadredjeni
+ feedBackData.ans81.nadredjeni
+ feedBackData.ans82.nadredjeni
+ feedBackData.ans83.nadredjeni
+ feedBackData.ans84.nadredjeni
+ feedBackData.ans85.nadredjeni
+ feedBackData.ans86.nadredjeni
+ feedBackData.ans87.nadredjeni
+ feedBackData.ans88.nadredjeni
+ feedBackData.ans89.nadredjeni
+ feedBackData.ans90.nadredjeni
+ feedBackData.ans91.nadredjeni
+ feedBackData.ans92.nadredjeni
) /92;
  feedBackData.prosek.ukupno=(feedBackData.prosek.podredjeni+feedBackData.prosek.nadredjeni)/2;
          }

          if(typeOfCollegue==='3'){
            feedBackData.ans1.istiNivo=(feedBackData.ans1.istiNivo*feedBackData.ukupnoIstiNivo+parseInt(ans1))/(feedBackData.ukupnoIstiNivo+1);
feedBackData.ans2.istiNivo=(feedBackData.ans2.istiNivo*feedBackData.ukupnoIstiNivo+parseInt(ans2))/(feedBackData.ukupnoIstiNivo+1);
feedBackData.ans3.istiNivo=(feedBackData.ans3.istiNivo*feedBackData.ukupnoIstiNivo+parseInt(ans3))/(feedBackData.ukupnoIstiNivo+1);
feedBackData.ans4.istiNivo=(feedBackData.ans4.istiNivo*feedBackData.ukupnoIstiNivo+parseInt(ans4))/(feedBackData.ukupnoIstiNivo+1);
feedBackData.ans5.istiNivo=(feedBackData.ans5.istiNivo*feedBackData.ukupnoIstiNivo+parseInt(ans5))/(feedBackData.ukupnoIstiNivo+1);
feedBackData.ans6.istiNivo=(feedBackData.ans6.istiNivo*feedBackData.ukupnoIstiNivo+parseInt(ans6))/(feedBackData.ukupnoIstiNivo+1);
feedBackData.ans7.istiNivo=(feedBackData.ans7.istiNivo*feedBackData.ukupnoIstiNivo+parseInt(ans7))/(feedBackData.ukupnoIstiNivo+1);
feedBackData.ans8.istiNivo=(feedBackData.ans8.istiNivo*feedBackData.ukupnoIstiNivo+parseInt(ans8))/(feedBackData.ukupnoIstiNivo+1);
feedBackData.ans9.istiNivo=(feedBackData.ans9.istiNivo*feedBackData.ukupnoIstiNivo+parseInt(ans9))/(feedBackData.ukupnoIstiNivo+1);
feedBackData.ans10.istiNivo=(feedBackData.ans10.istiNivo*feedBackData.ukupnoIstiNivo+parseInt(ans10))/(feedBackData.ukupnoIstiNivo+1);
feedBackData.ans11.istiNivo=(feedBackData.ans11.istiNivo*feedBackData.ukupnoIstiNivo+parseInt(ans11))/(feedBackData.ukupnoIstiNivo+1);
feedBackData.ans12.istiNivo=(feedBackData.ans12.istiNivo*feedBackData.ukupnoIstiNivo+parseInt(ans12))/(feedBackData.ukupnoIstiNivo+1);
feedBackData.ans13.istiNivo=(feedBackData.ans13.istiNivo*feedBackData.ukupnoIstiNivo+parseInt(ans13))/(feedBackData.ukupnoIstiNivo+1);
feedBackData.ans14.istiNivo=(feedBackData.ans14.istiNivo*feedBackData.ukupnoIstiNivo+parseInt(ans14))/(feedBackData.ukupnoIstiNivo+1);
feedBackData.ans15.istiNivo=(feedBackData.ans15.istiNivo*feedBackData.ukupnoIstiNivo+parseInt(ans15))/(feedBackData.ukupnoIstiNivo+1);
feedBackData.ans16.istiNivo=(feedBackData.ans16.istiNivo*feedBackData.ukupnoIstiNivo+parseInt(ans16))/(feedBackData.ukupnoIstiNivo+1);
feedBackData.ans17.istiNivo=(feedBackData.ans17.istiNivo*feedBackData.ukupnoIstiNivo+parseInt(ans17))/(feedBackData.ukupnoIstiNivo+1);
feedBackData.ans18.istiNivo=(feedBackData.ans18.istiNivo*feedBackData.ukupnoIstiNivo+parseInt(ans18))/(feedBackData.ukupnoIstiNivo+1);
feedBackData.ans19.istiNivo=(feedBackData.ans19.istiNivo*feedBackData.ukupnoIstiNivo+parseInt(ans19))/(feedBackData.ukupnoIstiNivo+1);
feedBackData.ans20.istiNivo=(feedBackData.ans20.istiNivo*feedBackData.ukupnoIstiNivo+parseInt(ans20))/(feedBackData.ukupnoIstiNivo+1);
feedBackData.ans21.istiNivo=(feedBackData.ans21.istiNivo*feedBackData.ukupnoIstiNivo+parseInt(ans21))/(feedBackData.ukupnoIstiNivo+1);
feedBackData.ans22.istiNivo=(feedBackData.ans22.istiNivo*feedBackData.ukupnoIstiNivo+parseInt(ans22))/(feedBackData.ukupnoIstiNivo+1);
feedBackData.ans23.istiNivo=(feedBackData.ans23.istiNivo*feedBackData.ukupnoIstiNivo+parseInt(ans23))/(feedBackData.ukupnoIstiNivo+1);
feedBackData.ans24.istiNivo=(feedBackData.ans24.istiNivo*feedBackData.ukupnoIstiNivo+parseInt(ans24))/(feedBackData.ukupnoIstiNivo+1);
feedBackData.ans25.istiNivo=(feedBackData.ans25.istiNivo*feedBackData.ukupnoIstiNivo+parseInt(ans25))/(feedBackData.ukupnoIstiNivo+1);
feedBackData.ans26.istiNivo=(feedBackData.ans26.istiNivo*feedBackData.ukupnoIstiNivo+parseInt(ans26))/(feedBackData.ukupnoIstiNivo+1);
feedBackData.ans27.istiNivo=(feedBackData.ans27.istiNivo*feedBackData.ukupnoIstiNivo+parseInt(ans27))/(feedBackData.ukupnoIstiNivo+1);
feedBackData.ans28.istiNivo=(feedBackData.ans28.istiNivo*feedBackData.ukupnoIstiNivo+parseInt(ans28))/(feedBackData.ukupnoIstiNivo+1);
feedBackData.ans29.istiNivo=(feedBackData.ans29.istiNivo*feedBackData.ukupnoIstiNivo+parseInt(ans29))/(feedBackData.ukupnoIstiNivo+1);
feedBackData.ans30.istiNivo=(feedBackData.ans30.istiNivo*feedBackData.ukupnoIstiNivo+parseInt(ans30))/(feedBackData.ukupnoIstiNivo+1);
feedBackData.ans31.istiNivo=(feedBackData.ans31.istiNivo*feedBackData.ukupnoIstiNivo+parseInt(ans31))/(feedBackData.ukupnoIstiNivo+1);
feedBackData.ans32.istiNivo=(feedBackData.ans32.istiNivo*feedBackData.ukupnoIstiNivo+parseInt(ans32))/(feedBackData.ukupnoIstiNivo+1);
feedBackData.ans33.istiNivo=(feedBackData.ans33.istiNivo*feedBackData.ukupnoIstiNivo+parseInt(ans33))/(feedBackData.ukupnoIstiNivo+1);
feedBackData.ans34.istiNivo=(feedBackData.ans34.istiNivo*feedBackData.ukupnoIstiNivo+parseInt(ans34))/(feedBackData.ukupnoIstiNivo+1);
feedBackData.ans35.istiNivo=(feedBackData.ans35.istiNivo*feedBackData.ukupnoIstiNivo+parseInt(ans35))/(feedBackData.ukupnoIstiNivo+1);
feedBackData.ans36.istiNivo=(feedBackData.ans36.istiNivo*feedBackData.ukupnoIstiNivo+parseInt(ans36))/(feedBackData.ukupnoIstiNivo+1);
feedBackData.ans37.istiNivo=(feedBackData.ans37.istiNivo*feedBackData.ukupnoIstiNivo+parseInt(ans37))/(feedBackData.ukupnoIstiNivo+1);
feedBackData.ans38.istiNivo=(feedBackData.ans38.istiNivo*feedBackData.ukupnoIstiNivo+parseInt(ans38))/(feedBackData.ukupnoIstiNivo+1);
feedBackData.ans39.istiNivo=(feedBackData.ans39.istiNivo*feedBackData.ukupnoIstiNivo+parseInt(ans39))/(feedBackData.ukupnoIstiNivo+1);
feedBackData.ans40.istiNivo=(feedBackData.ans40.istiNivo*feedBackData.ukupnoIstiNivo+parseInt(ans40))/(feedBackData.ukupnoIstiNivo+1);
feedBackData.ans41.istiNivo=(feedBackData.ans41.istiNivo*feedBackData.ukupnoIstiNivo+parseInt(ans41))/(feedBackData.ukupnoIstiNivo+1);
feedBackData.ans42.istiNivo=(feedBackData.ans42.istiNivo*feedBackData.ukupnoIstiNivo+parseInt(ans42))/(feedBackData.ukupnoIstiNivo+1);
feedBackData.ans43.istiNivo=(feedBackData.ans43.istiNivo*feedBackData.ukupnoIstiNivo+parseInt(ans43))/(feedBackData.ukupnoIstiNivo+1);
feedBackData.ans44.istiNivo=(feedBackData.ans44.istiNivo*feedBackData.ukupnoIstiNivo+parseInt(ans44))/(feedBackData.ukupnoIstiNivo+1);
feedBackData.ans45.istiNivo=(feedBackData.ans45.istiNivo*feedBackData.ukupnoIstiNivo+parseInt(ans45))/(feedBackData.ukupnoIstiNivo+1);
feedBackData.ans46.istiNivo=(feedBackData.ans46.istiNivo*feedBackData.ukupnoIstiNivo+parseInt(ans46))/(feedBackData.ukupnoIstiNivo+1);
feedBackData.ans47.istiNivo=(feedBackData.ans47.istiNivo*feedBackData.ukupnoIstiNivo+parseInt(ans47))/(feedBackData.ukupnoIstiNivo+1);
feedBackData.ans48.istiNivo=(feedBackData.ans48.istiNivo*feedBackData.ukupnoIstiNivo+parseInt(ans48))/(feedBackData.ukupnoIstiNivo+1);
feedBackData.ans49.istiNivo=(feedBackData.ans49.istiNivo*feedBackData.ukupnoIstiNivo+parseInt(ans49))/(feedBackData.ukupnoIstiNivo+1);
feedBackData.ans50.istiNivo=(feedBackData.ans50.istiNivo*feedBackData.ukupnoIstiNivo+parseInt(ans50))/(feedBackData.ukupnoIstiNivo+1);
feedBackData.ans51.istiNivo=(feedBackData.ans51.istiNivo*feedBackData.ukupnoIstiNivo+parseInt(ans51))/(feedBackData.ukupnoIstiNivo+1);
feedBackData.ans52.istiNivo=(feedBackData.ans52.istiNivo*feedBackData.ukupnoIstiNivo+parseInt(ans52))/(feedBackData.ukupnoIstiNivo+1);
feedBackData.ans53.istiNivo=(feedBackData.ans53.istiNivo*feedBackData.ukupnoIstiNivo+parseInt(ans53))/(feedBackData.ukupnoIstiNivo+1);
feedBackData.ans54.istiNivo=(feedBackData.ans54.istiNivo*feedBackData.ukupnoIstiNivo+parseInt(ans54))/(feedBackData.ukupnoIstiNivo+1);
feedBackData.ans55.istiNivo=(feedBackData.ans55.istiNivo*feedBackData.ukupnoIstiNivo+parseInt(ans55))/(feedBackData.ukupnoIstiNivo+1);
feedBackData.ans56.istiNivo=(feedBackData.ans56.istiNivo*feedBackData.ukupnoIstiNivo+parseInt(ans56))/(feedBackData.ukupnoIstiNivo+1);
feedBackData.ans57.istiNivo=(feedBackData.ans57.istiNivo*feedBackData.ukupnoIstiNivo+parseInt(ans57))/(feedBackData.ukupnoIstiNivo+1);
feedBackData.ans58.istiNivo=(feedBackData.ans58.istiNivo*feedBackData.ukupnoIstiNivo+parseInt(ans58))/(feedBackData.ukupnoIstiNivo+1);
feedBackData.ans59.istiNivo=(feedBackData.ans59.istiNivo*feedBackData.ukupnoIstiNivo+parseInt(ans59))/(feedBackData.ukupnoIstiNivo+1);
feedBackData.ans60.istiNivo=(feedBackData.ans60.istiNivo*feedBackData.ukupnoIstiNivo+parseInt(ans60))/(feedBackData.ukupnoIstiNivo+1);
feedBackData.ans61.istiNivo=(feedBackData.ans61.istiNivo*feedBackData.ukupnoIstiNivo+parseInt(ans61))/(feedBackData.ukupnoIstiNivo+1);
feedBackData.ans62.istiNivo=(feedBackData.ans62.istiNivo*feedBackData.ukupnoIstiNivo+parseInt(ans62))/(feedBackData.ukupnoIstiNivo+1);
feedBackData.ans63.istiNivo=(feedBackData.ans63.istiNivo*feedBackData.ukupnoIstiNivo+parseInt(ans63))/(feedBackData.ukupnoIstiNivo+1);
feedBackData.ans64.istiNivo=(feedBackData.ans64.istiNivo*feedBackData.ukupnoIstiNivo+parseInt(ans64))/(feedBackData.ukupnoIstiNivo+1);
feedBackData.ans65.istiNivo=(feedBackData.ans65.istiNivo*feedBackData.ukupnoIstiNivo+parseInt(ans65))/(feedBackData.ukupnoIstiNivo+1);
feedBackData.ans66.istiNivo=(feedBackData.ans66.istiNivo*feedBackData.ukupnoIstiNivo+parseInt(ans66))/(feedBackData.ukupnoIstiNivo+1);
feedBackData.ans67.istiNivo=(feedBackData.ans67.istiNivo*feedBackData.ukupnoIstiNivo+parseInt(ans67))/(feedBackData.ukupnoIstiNivo+1);
feedBackData.ans68.istiNivo=(feedBackData.ans68.istiNivo*feedBackData.ukupnoIstiNivo+parseInt(ans68))/(feedBackData.ukupnoIstiNivo+1);
feedBackData.ans69.istiNivo=(feedBackData.ans69.istiNivo*feedBackData.ukupnoIstiNivo+parseInt(ans69))/(feedBackData.ukupnoIstiNivo+1);
feedBackData.ans70.istiNivo=(feedBackData.ans70.istiNivo*feedBackData.ukupnoIstiNivo+parseInt(ans70))/(feedBackData.ukupnoIstiNivo+1);
feedBackData.ans71.istiNivo=(feedBackData.ans71.istiNivo*feedBackData.ukupnoIstiNivo+parseInt(ans71))/(feedBackData.ukupnoIstiNivo+1);
feedBackData.ans72.istiNivo=(feedBackData.ans72.istiNivo*feedBackData.ukupnoIstiNivo+parseInt(ans72))/(feedBackData.ukupnoIstiNivo+1);
feedBackData.ans73.istiNivo=(feedBackData.ans73.istiNivo*feedBackData.ukupnoIstiNivo+parseInt(ans73))/(feedBackData.ukupnoIstiNivo+1);
feedBackData.ans74.istiNivo=(feedBackData.ans74.istiNivo*feedBackData.ukupnoIstiNivo+parseInt(ans74))/(feedBackData.ukupnoIstiNivo+1);
feedBackData.ans75.istiNivo=(feedBackData.ans75.istiNivo*feedBackData.ukupnoIstiNivo+parseInt(ans75))/(feedBackData.ukupnoIstiNivo+1);
feedBackData.ans76.istiNivo=(feedBackData.ans76.istiNivo*feedBackData.ukupnoIstiNivo+parseInt(ans76))/(feedBackData.ukupnoIstiNivo+1);
feedBackData.ans77.istiNivo=(feedBackData.ans77.istiNivo*feedBackData.ukupnoIstiNivo+parseInt(ans77))/(feedBackData.ukupnoIstiNivo+1);
feedBackData.ans78.istiNivo=(feedBackData.ans78.istiNivo*feedBackData.ukupnoIstiNivo+parseInt(ans78))/(feedBackData.ukupnoIstiNivo+1);
feedBackData.ans79.istiNivo=(feedBackData.ans79.istiNivo*feedBackData.ukupnoIstiNivo+parseInt(ans79))/(feedBackData.ukupnoIstiNivo+1);
feedBackData.ans80.istiNivo=(feedBackData.ans80.istiNivo*feedBackData.ukupnoIstiNivo+parseInt(ans80))/(feedBackData.ukupnoIstiNivo+1);
feedBackData.ans81.istiNivo=(feedBackData.ans81.istiNivo*feedBackData.ukupnoIstiNivo+parseInt(ans81))/(feedBackData.ukupnoIstiNivo+1);
feedBackData.ans82.istiNivo=(feedBackData.ans82.istiNivo*feedBackData.ukupnoIstiNivo+parseInt(ans82))/(feedBackData.ukupnoIstiNivo+1);
feedBackData.ans83.istiNivo=(feedBackData.ans83.istiNivo*feedBackData.ukupnoIstiNivo+parseInt(ans83))/(feedBackData.ukupnoIstiNivo+1);
feedBackData.ans84.istiNivo=(feedBackData.ans84.istiNivo*feedBackData.ukupnoIstiNivo+parseInt(ans84))/(feedBackData.ukupnoIstiNivo+1);
feedBackData.ans85.istiNivo=(feedBackData.ans85.istiNivo*feedBackData.ukupnoIstiNivo+parseInt(ans85))/(feedBackData.ukupnoIstiNivo+1);
feedBackData.ans86.istiNivo=(feedBackData.ans86.istiNivo*feedBackData.ukupnoIstiNivo+parseInt(ans86))/(feedBackData.ukupnoIstiNivo+1);
feedBackData.ans87.istiNivo=(feedBackData.ans87.istiNivo*feedBackData.ukupnoIstiNivo+parseInt(ans87))/(feedBackData.ukupnoIstiNivo+1);
feedBackData.ans88.istiNivo=(feedBackData.ans88.istiNivo*feedBackData.ukupnoIstiNivo+parseInt(ans88))/(feedBackData.ukupnoIstiNivo+1);
feedBackData.ans89.istiNivo=(feedBackData.ans89.istiNivo*feedBackData.ukupnoIstiNivo+parseInt(ans89))/(feedBackData.ukupnoIstiNivo+1);
feedBackData.ans90.istiNivo=(feedBackData.ans90.istiNivo*feedBackData.ukupnoIstiNivo+parseInt(ans90))/(feedBackData.ukupnoIstiNivo+1);
feedBackData.ans91.istiNivo=(feedBackData.ans91.istiNivo*feedBackData.ukupnoIstiNivo+parseInt(ans91))/(feedBackData.ukupnoIstiNivo+1);
feedBackData.ans92.istiNivo=(feedBackData.ans92.istiNivo*feedBackData.ukupnoIstiNivo+parseInt(ans92))/(feedBackData.ukupnoIstiNivo+1);
          }


          user.feedBackTest = feedBackData;
          user.save().then(user=>{
            return res.status(201).json({
                success: true,
                msg: "user saved."
            });
          })

        }else{
          return res.status(400).json({
              msg: "User doesn't exists."
          });
        }
    });
    // The data is valid and new we can register the user
});

//put BElbin
router.put('/putBelbin/:id', async(req, res) => {

    let belbinData= {
      SO:req.body.SO,
      RV:req.body.RV,
      OA:req.body.OA,
      OI:req.body.OI,
      OK:req.body.OK,
      S :req.body.S ,
      CT:req.body.CT,
      P :req.body.P ,
    }
    // Check for the existing name
    await User.findOne({
        _id: req.params.id
    }).then(async user => {
        if (user) {

          user.belbinTest = belbinData;
          user.save().then(user=>{
            return res.status(201).json({
                success: true,
                msg: "user saved."
            });
          })

        }else{
          return res.status(400).json({
              msg: "User doesn't exists."
          });
        }
    });
    // The data is valid and new we can register the user
});

//Administer VQ
router.put('/administerVQ/:id', async(req, res) => {


    // Check for the existing name
    await User.findOne({
        _id: req.params.id
    }).then(async user => {
        if (user) {

          user.availableTest.vqTest = true;
          user.save().then(user=>{
            return res.status(201).json({
                success: true,
                msg: "user saved."
            });
          })

        }else{
          return res.status(400).json({
              msg: "User doesn't exists."
          });
        }
    });
    // The data is valid and new we can register the user
});

//Administer TestLicnosti
router.put('/administerTL/:id', async(req, res) => {


    // Check for the existing name
    await User.findOne({
        _id: req.params.id
    }).then(async user => {
        if (user) {

          user.availableTest.testLicnosti = true;
          user.save().then(user=>{
            return res.status(201).json({
                success: true,
                msg: "user saved."
            });
          })

        }else{
          return res.status(400).json({
              msg: "User doesn't exists."
          });
        }
    });
    // The data is valid and new we can register the user
});

//Administer Stavovi
router.put('/administerStavovi/:id', async(req, res) => {


    // Check for the existing name
    await User.findOne({
        _id: req.params.id
    }).then(async user => {
        if (user) {

          user.availableTest.stavoviZaposlenih = true;
          user.save().then(user=>{
            return res.status(201).json({
                success: true,
                msg: "user saved."
            });
          })

        }else{
          return res.status(400).json({
              msg: "User doesn't exists."
          });
        }
    });
    // The data is valid and new we can register the user
});

//Administer 360 feedback
router.put('/administerFeedback/:id', async(req, res) => {


    // Check for the existing name
    await User.findOne({
        _id: req.params.id
    }).then(async user => {
        if (user) {

          user.availableTest.feedbackTest = true;
          user.save().then(user=>{
            return res.status(201).json({
                success: true,
                msg: "user saved."
            });
          })

        }else{
          return res.status(400).json({
              msg: "User doesn't exists."
          });
        }
    });
    // The data is valid and new we can register the user
});

//Administer Belbin
router.put('/administerBelbin/:id', async(req, res) => {


    // Check for the existing name
    await User.findOne({
        _id: req.params.id
    }).then(async user => {
        if (user) {

          user.availableTest.belbinTest = true;
          user.save().then(user=>{
            return res.status(201).json({
                success: true,
                msg: "user saved."
            });
          })

        }else{
          return res.status(400).json({
              msg: "User doesn't exists."
          });
        }
    });
    // The data is valid and new we can register the user
});



module.exports = router;
