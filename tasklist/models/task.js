/**
 * Created by FERRAND on 29/04/2015.
 */

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var TaskSchema = new Schema({
    itemName      : String,
    itemCategory  : String,
    itemCompleted : { type: Boolean, default: false },
    itemDate      : { type: Date, default: Date.now }
});

module.exports = mongoose.model('TaskModel', TaskSchema);