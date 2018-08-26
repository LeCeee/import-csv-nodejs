var mongoose = require('mongoose');
require('mongoose-double')(mongoose);
 
var SchemaTypes = mongoose.Schema.Types;

var Schema = mongoose.Schema;

var outputSchema = new Schema({
    id: { type : Number},
    result : {type : String}
});

module.exports = mongoose.model('Outpus', outputSchema);