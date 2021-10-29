var mongoose = require("mongoose");
var listItemSchema = mongoose.Schema({
  ownerId: String,
  category: String,
  idea: String,
  notes: String,
  completed: Boolean
});
module.exports = mongoose.model("listItems", listItemSchema);
