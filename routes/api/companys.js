const express = require('express');
const router = express.Router();
const Company = require('../../models/Company');

router.post('/register',(req,res)=>{
  let {
     name
    } = req.body
    //Check for unique company
    Company.findOne({
      name: name
    }).then(company =>{
      if(company){
        return res.status(400).json({
            msg:"Company name already exists."
        });
      }
    })

    // The data is valid and now register the company
    let newCompany = new Company({
      name
    });
    // post the company

    newCompany.save().then(newCompany=>{
          return res.status(201).json({
            success:true,
            msg:"Company is registered"
          });

});
});

router.get('/getAll',async (req,res)=>{
  Company.find({}).then(companys=>{
     return  res.status(200).json(companys);
  });
});


router.put('/putStavoviZaposlenih/:company', async(req, res) => {

  let {
      ans11,
      ans12,
      ans13,
      ans14,

      ans21,
      ans22,
      ans23,
      ans24,
      ans25,
      ans26,
      ans27,
      ans28,

      ans31,
      ans32,
      ans33,
      ans34,
      ans35,
      ans36,
      ans37,
      ans38,
      ans39,
      ans310,
      ans311,


      ans41,
      ans42,
      ans43,
      ans44,
      ans45,
      ans46,
      ans47,
      ans48,
      ans49,
      ans410,
      ans411,
      ans412,
      ans413,
      ans414,
      ans415,
      ans416,

      ans51,
      ans52,
      ans53,
      ans54,
      ans55,
      ans56,

      ans61,
      ans62,
      ans63,
      ans64,
      ans65,
      ans66,
      ans67,
      ans68,

      ans71,
      ans72,
      ans73,
      ans74,

      ans81,
      ans82,
      ans83,
      ans84,
      ans85,
      ans86,
      ans87,

      ans91,
      ans92,

      staz,
      pol
   } = req.body;

   let numberOfAnswers = 0;

    let testData= {

      ans11,
      ans12,
      ans13,
      ans14,

      ans21,
      ans22,
      ans23,
      ans24,
      ans25,
      ans26,
      ans27,
      ans28,

      ans31,
      ans32,
      ans33,
      ans34,
      ans35,
      ans36,
      ans37,
      ans38,
      ans39,
      ans310,
      ans311,


      ans41,
      ans42,
      ans43,
      ans44,
      ans45,
      ans46,
      ans47,
      ans48,
      ans49,
      ans410,
      ans411,
      ans412,
      ans413,
      ans414,
      ans415,
      ans416,

      ans51,
      ans52,
      ans53,
      ans54,
      ans55,
      ans56,

      ans61,
      ans62,
      ans63,
      ans64,
      ans65,
      ans66,
      ans67,
      ans68,

      ans71,
      ans72,
      ans73,
      ans74,

      ans81,
      ans82,
      ans83,
      ans84,
      ans85,
      ans86,
      ans87,

      ans91,
      ans92,

      staz,
      pol,
      numberOfAnswers

    }
    // Check for the existing name
    await Company.findOne({
        name: req.params.company
    }).then(async company => {
        if (company) {

          testData.staz.a += company.stavoviZaposlenih.staz.a;
          testData.staz.b += company.stavoviZaposlenih.staz.b;
          testData.staz.c += company.stavoviZaposlenih.staz.c;
          testData.staz.d += company.stavoviZaposlenih.staz.d;

          testData.pol.a += company.stavoviZaposlenih.pol.a;
          testData.pol.b += company.stavoviZaposlenih.pol.b;

          testData.numberOfAnswers=company.stavoviZaposlenih.numberOfAnswers+1;
          testData.ans11 = parseInt(testData.ans11) + company.stavoviZaposlenih.ans11;
          testData.ans12 += '&' + company.stavoviZaposlenih.ans12;
          testData.ans13 = parseInt(testData.ans13) + company.stavoviZaposlenih.ans13;
          testData.ans14.a += company.stavoviZaposlenih.ans14.a;
          testData.ans14.b += company.stavoviZaposlenih.ans14.b;
          testData.ans14.c += company.stavoviZaposlenih.ans14.c;
          testData.ans14.d += company.stavoviZaposlenih.ans14.d;
          testData.ans14.e += company.stavoviZaposlenih.ans14.e;

          testData.ans21.a += company.stavoviZaposlenih.ans21.a;
          testData.ans21.b += company.stavoviZaposlenih.ans21.b;
          testData.ans21.c += company.stavoviZaposlenih.ans21.c;
          testData.ans22 = parseInt(testData.ans22) + company.stavoviZaposlenih.ans22;
          testData.ans23 = parseInt(testData.ans23) + company.stavoviZaposlenih.ans23;
          testData.ans24 = parseInt(testData.ans24) +  company.stavoviZaposlenih.ans24;
          testData.ans25 = parseInt(testData.ans25) +  company.stavoviZaposlenih.ans25;
          testData.ans26.a += company.stavoviZaposlenih.ans26.a;
          testData.ans26.b += company.stavoviZaposlenih.ans26.b;
          testData.ans26.c += company.stavoviZaposlenih.ans26.c;
          testData.ans26.d += company.stavoviZaposlenih.ans26.d;
          testData.ans27 = parseInt(testData.ans27) +  company.stavoviZaposlenih.ans27;
          testData.ans28 = parseInt(testData.ans28) +  company.stavoviZaposlenih.ans28;

          testData.ans31 = parseInt(testData.ans31) + company.stavoviZaposlenih.ans31;
          testData.ans32 = parseInt(testData.ans32) + company.stavoviZaposlenih.ans32;
          testData.ans33 = parseInt(testData.ans33) + company.stavoviZaposlenih.ans33;
          testData.ans34 = parseInt(testData.ans34) + company.stavoviZaposlenih.ans34;
          testData.ans35 = parseInt(testData.ans35) + company.stavoviZaposlenih.ans35;
          testData.ans36 = parseInt(testData.ans36) + company.stavoviZaposlenih.ans36;
          testData.ans37 = parseInt(testData.ans37) + company.stavoviZaposlenih.ans37;
          testData.ans38 = parseInt(testData.ans38) + company.stavoviZaposlenih.ans38;
          testData.ans39 = parseInt(testData.ans39) + company.stavoviZaposlenih.ans39;
          testData.ans310 = parseInt(testData.ans310) + company.stavoviZaposlenih.ans310;
          testData.ans311 = parseInt(testData.ans311) + company.stavoviZaposlenih.ans311;


          testData.ans41 = parseInt(testData.ans41) + company.stavoviZaposlenih.ans41;
          testData.ans42 = parseInt(testData.ans42) + company.stavoviZaposlenih.ans42;
          testData.ans43 = parseInt(testData.ans43) + company.stavoviZaposlenih.ans43;
          testData.ans44 = parseInt(testData.ans44) + company.stavoviZaposlenih.ans44;
          testData.ans45 = parseInt(testData.ans45) + company.stavoviZaposlenih.ans45;
          testData.ans46 = parseInt(testData.ans46) + company.stavoviZaposlenih.ans46;
          testData.ans47 = parseInt(testData.ans47) + company.stavoviZaposlenih.ans47;
          testData.ans48 = parseInt(testData.ans48) + company.stavoviZaposlenih.ans48;
          testData.ans49 = parseInt(testData.ans49) + company.stavoviZaposlenih.ans49;
          testData.ans410 = parseInt(testData.ans410) + company.stavoviZaposlenih.ans410;
          testData.ans411 = parseInt(testData.ans411) + company.stavoviZaposlenih.ans411;
          testData.ans412 = parseInt(testData.ans412) + company.stavoviZaposlenih.ans412;
          testData.ans413 = parseInt(testData.ans413) + company.stavoviZaposlenih.ans413;
          testData.ans414.a += company.stavoviZaposlenih.ans414.a;
          testData.ans414.b += company.stavoviZaposlenih.ans414.b;
          testData.ans414.c += company.stavoviZaposlenih.ans414.c;
          testData.ans414.d += company.stavoviZaposlenih.ans414.d;
          testData.ans415 = parseInt(testData.ans415) + company.stavoviZaposlenih.ans415;
          testData.ans416 = parseInt(testData.ans416) + company.stavoviZaposlenih.ans416;

          testData.ans51 = parseInt(testData.ans51) + company.stavoviZaposlenih.ans51;
          testData.ans52 = parseInt(testData.ans52) + company.stavoviZaposlenih.ans52;
          testData.ans53 = parseInt(testData.ans53) + company.stavoviZaposlenih.ans53;
          testData.ans54 = parseInt(testData.ans54) + company.stavoviZaposlenih.ans54;
          testData.ans55 = parseInt(testData.ans55) + company.stavoviZaposlenih.ans55;
          testData.ans56 = parseInt(testData.ans56) + company.stavoviZaposlenih.ans56;

          testData.ans61 = parseInt(testData.ans61) + company.stavoviZaposlenih.ans61;
          testData.ans62 = parseInt(testData.ans62) + company.stavoviZaposlenih.ans62;
          testData.ans63 = parseInt(testData.ans63) + company.stavoviZaposlenih.ans63;
          testData.ans64 = parseInt(testData.ans64) + company.stavoviZaposlenih.ans64;
          testData.ans65 = parseInt(testData.ans65) + company.stavoviZaposlenih.ans65;
          testData.ans66 = parseInt(testData.ans66) + company.stavoviZaposlenih.ans66;
          testData.ans67 = parseInt(testData.ans67) + company.stavoviZaposlenih.ans67;
          testData.ans68 = parseInt(testData.ans68) + company.stavoviZaposlenih.ans68;

          testData.ans71 = parseInt(testData.ans71) + company.stavoviZaposlenih.ans71;
          testData.ans72 = parseInt(testData.ans72) + company.stavoviZaposlenih.ans72;
          testData.ans73.a += company.stavoviZaposlenih.ans73.a;
          testData.ans73.b += company.stavoviZaposlenih.ans73.b;
          testData.ans73.c += company.stavoviZaposlenih.ans73.c;
          testData.ans73.d += company.stavoviZaposlenih.ans73.d;
          testData.ans73.e += company.stavoviZaposlenih.ans73.e;
          testData.ans74 = parseInt(testData.ans74) + company.stavoviZaposlenih.ans74;

          testData.ans81.a = parseInt(testData.ans81.a) + company.stavoviZaposlenih.ans81.a;
          testData.ans81.b = parseInt(testData.ans81.b) + company.stavoviZaposlenih.ans81.b;
          testData.ans81.c = parseInt(testData.ans81.c) + company.stavoviZaposlenih.ans81.c;
          testData.ans81.d = parseInt(testData.ans81.d) + company.stavoviZaposlenih.ans81.d;
          testData.ans81.e = parseInt(testData.ans81.e) + company.stavoviZaposlenih.ans81.e;
          testData.ans82 = parseInt(testData.ans82) + company.stavoviZaposlenih.ans82;
          testData.ans83 = parseInt(testData.ans83) +company.stavoviZaposlenih.ans83;
          testData.ans84 = parseInt(testData.ans84) + company.stavoviZaposlenih.ans84;
          testData.ans85 = parseInt(testData.ans85) + company.stavoviZaposlenih.ans85;
          testData.ans86 = parseInt(testData.ans86) + company.stavoviZaposlenih.ans86;
          testData.ans87.a += company.stavoviZaposlenih.ans87.a;
          testData.ans87.b += company.stavoviZaposlenih.ans87.b;
          testData.ans87.c += company.stavoviZaposlenih.ans87.c;

          testData.ans91 = parseInt(testData.ans91) + company.stavoviZaposlenih.ans91;
          testData.ans92 += '&' + company.stavoviZaposlenih.ans92;

          company.stavoviZaposlenih = testData;
          company.save().then(company=>{
            return res.status(201).json({
                success: true,
                msg: "company saved."
            });
          })

        }else{
          return res.status(400).json({
              msg: "company doesn't exist."
          });
        }
    });
    // The data is valid and new we can register the user
});


router.put('/putSector/:company', async(req, res) => {

  let {
      sectorName
   } = req.body;

   let existingSector=0;
    // Check for the existing name
    await Company.findOne({
        name: req.params.company
    }).then(async company => {
        if (company) {

          for (var i = 0; i < company.sektori.length; i++) {
            if(company.sektori[i].name==sectorName){
              existingSector=1;
            }
          }

          if(existingSector==1){
            return res.status(400).json({
                msg: "Sector already exists."
            });
          }else{

              var sektor = {
                name: sectorName,
                radnaMesta: [],
              };

          company.sektori.push(sektor);
          company.save().then(company=>{
            return res.status(201).json({
                success: true,
                msg: "company saved."
            });
          })
        }
        }else{
          return res.status(400).json({
              msg: "company doesn't exist."
          });
        }
    });
    // The data is valid and new we can register the user
});


router.put('/putRM', async(req, res) => {

  let {
      companyName,
      sectorName,
      rMName
   } = req.body;

   let existingRM=0;
   let indexSector=0;
    // Check for the existing name
    await Company.findOne({
        name: companyName
    }).then(async company => {
        if (company) {

          for (var i = 0; i < company.sektori.length; i++) {
            if(company.sektori[i].name==sectorName){
              indexSector=i;
              for (var j = 0; j < company.sektori[i].radnaMesta.length; j++) {
                if(company.sektori[i].radnaMesta[j]==rMName){
                  existingRM=1;
                }
              }
              break;
            }

          }


          ///////////////////////////////////
          if(existingRM==1){
            return res.status(400).json({
                msg: "Radno Mesto already exists."
            });
          }else{

          company.sektori[indexSector].radnaMesta.push(rMName);
          company.save().then(company=>{
            return res.status(201).json({
                success: true,
                msg: "company saved."
            });
          })
        }
        }else{
          return res.status(400).json({
              msg: "company doesn't exist."
          });
        }
    });
    // The data is valid and new we can register the user
});


module.exports = router;
