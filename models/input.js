 var mongoose = require('mongoose');
 require('mongoose-double')(mongoose);
//  var SchemaTypes = mongoose.Schema.Types;

// var Schema = mongoose.Schema;

// var inputSchema = new Schema({
//     //id: { type : Number},
//     result : {type : String}
// });

// module.exports = mongoose.model('Input', inputSchema);
 
var SchemaTypes = mongoose.Schema.Types;

var Schema = mongoose.Schema;

var inputSchema = new Schema({
 trans_id : {type : Number}, 
 Class : {type : Number},
 MerchantCategoryCode : {type : String},
 TransactionTime : {type : SchemaTypes.Double},
 Transactionstatus : {type : String},
 TransactionPlace : {type : String},
 TransactionType : {type : String},
 customeridentification : {type :SchemaTypes.Double },
 BANK : { type: String }

//   V1 : { type: SchemaTypes.Double } ,
//   V2 : { type: SchemaTypes.Double } ,
//   V3 : { type: SchemaTypes.Double } ,
//   V4 : { type: SchemaTypes.Double } ,
//   V5 : { type: SchemaTypes.Double } ,
//   V6 : { type: SchemaTypes.Double } ,
//   V7 : { type: SchemaTypes.Double } ,
//   V8 : { type: SchemaTypes.Double } ,
//   V9 : { type: SchemaTypes.Double } ,
//   V10: { type: SchemaTypes.Double } ,
//   V11: { type: SchemaTypes.Double } ,
//   V12: { type: SchemaTypes.Double } ,
//   V13: { type: SchemaTypes.Double } ,
//   V14: { type: SchemaTypes.Double } ,
//   V15: { type: SchemaTypes.Double } ,
//   V16: { type: SchemaTypes.Double } ,
//   V17: { type: SchemaTypes.Double } ,
    // Amount : { type : SchemaTypes.Double},
    // Fraud : {  type : SchemaTypes.Double }
});

module.exports = mongoose.model('Input', inputSchema);

// trans_id,Class,MerchantCategoryCode,TransactionTime,Transactionstatus,TransactionPlace,TransactionType,customeridentification,BANK

// "Time","V1","V2","V3","V4","V5","V6","V7","V8","V9","V10","V11","V12","V13","V14","V15","V16","V17","V18",
// "V19","V20","V21","V22","V23","V24","V25","V26","V27","V28","Amount","Class"