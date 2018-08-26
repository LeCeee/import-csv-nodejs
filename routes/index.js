var express = require('express');
var express = require('express');
var csv = require("fast-csv");
var router = express.Router();
var fs = require('fs');

var mongoose = require('mongoose');

var Input  = mongoose.model('Input');

var csvfile = __dirname + "/../public/files/newpre.csv";
var stream = fs.createReadStream(csvfile);


/* GET home page. */
router.get('/', function(req, res, next) {

    res.render('index', { title: 'Import CSV using NodeJS' });

}).get('/import', function(req, res, next) {

    var  inputs  = []
    var csvStream = csv()
        .on("data", function(data){
         
         var item = new Input({
            //   name: data[0] ,
            //   price: data[1]   ,
            //   category: data[2],
            //   description: data[3],
            //   manufacturer:data[4] 
            //id: data[0],
            result: data[0]
            // Time:data[0] ,
            // V1 : data[1] ,
            // V2 : data[2] ,
            // V3 : data[3] ,
            // V4 : data[4] ,
            // V5 : data[5] ,
            // V6 : data[6] ,
            // V7 : data[7] ,
            // V8 : data[8] ,
            // V9 : data[9] ,
            // V10: data[10] ,
            // V11: data[11] ,
            // V12: data[12] ,
            // V13: data[13] ,
            // V14: data[14] ,
            // V15: data[15] ,
            // V16: data[16] ,
            // V17: data[17] ,
            // V18: data[18] ,
            // V19: data[19] ,
            // V20: data[20] ,
            // V21: data[21] ,
            // V22: data[22] ,
            // V23: data[23] ,
            // V24: data[24] ,
            // V25: data[25] ,
            // V26: data[26] ,
            // V27: data[27] ,
            // V28: data[28] ,
            // Amount: data[29]
         });
         
          item.save(function(error){
            console.log(item);
              if(error){
                   throw error;
              }
          }); 

    }).on("end", function(){

    });
  
    stream.pipe(csvStream);
    res.json({success : "Data imported successfully.", status : 200});
     
  }).get('/fetchdata', function(req, res, next) {
    
    Input.find({}, function(err, docs) {
        if (!err){ 
            res.json({success : "Updated Successfully", status : 200, data: docs});
        } else { 
            throw err;
        }
    });
  
});
module.exports = router;
