var express = require('express');
var express = require('express');
var csv = require("fast-csv");
var router = express.Router();
var fs = require('fs');

var mongoose = require('mongoose');

var Input  = mongoose.model('Input');

var csvfile = __dirname + "/../public/files/input.csv";
var stream = fs.createReadStream(csvfile);


/* GET home page. */
router.get('/', function(req, res, next) {

    res.render('index', { title: 'Import CSV using NodeJS' });

}).get('/import', function(req, res, next) {

    var  inputs  = []
    var csvStream = csv()
    //.fromStream(stream, {headers : true})
        .on("data", function(data){
         
         var item = new Input({
            //   name: data[0] ,
            //   price: data[1]   ,
            //   category: data[2],
            //   description: data[3],
            //   manufacturer:data[4] 
            //id: data[0],
            //result: data[
// trans_id,Class,MerchantCategoryCode,TransactionTime,Transactionstatus,TransactionPlace,TransactionType,customeridentification,BANK

            trans_id : data[0],
            Class:data[1] ,
            MerchantCategoryCode : data[2] ,
            TransactionTime : data[3] ,
            Transactionstatus : data[4] ,
            TransactionPlace : data[5] ,
            TransactionType: data[6] ,
            customeridentification : data[7] ,
            BANK : data[8] 
            // V8 : data[9] ,
            // V9 : data[10] ,
            // V10: data[11] ,
            // V11: data[12] ,
            // V12: data[13] ,
            // V13: data[14] ,
            // V14: data[15] ,
            // V15: data[16] ,
            // V16: data[17] ,
            // V17: data[18] ,
            // Amount: data[19],
            // Fraud : data[20]
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
    
    Input.find({Class :'1'} ,function(err, docs) {
        if (!err){ 
            res.json({success : "Updated Successfully", status : 200, data: docs});
        } else { 
            throw err;
        }
    });
  
});
module.exports = router;
