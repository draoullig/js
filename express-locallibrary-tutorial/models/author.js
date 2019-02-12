var mongoose = require('mongoose');
var moment = require('moment');

var Schema = mongoose.Schema;

var AuthorSchema = new Schema(
  {
    first_name: {type: String, required: true, max: 100},
    family_name: {type: String, required: true, max: 100},
    date_of_birth: {type: Date},
    date_of_death: {type: Date},
  }
);

// Virtual for author's full name
AuthorSchema
.virtual('name')
.get(function () {
  return this.family_name + ', ' + this.first_name;
});

// Virtual for author's lifespan
/*AuthorSchema
.virtual('lifespan')
.get(function () {
  return (this.date_of_death.getYear() - this.date_of_birth.getYear()).toString();
});*/

// Virtual for author's URL
AuthorSchema
.virtual('url')
.get(function () {
  return '/catalog/author/' + this._id;
});

AuthorSchema
.virtual('due_birth_formatted')
.get(function () {
  return this.date_of_birth ? moment(this.date_of_birth).format('MMMM Do, YYYY') : '';
});

AuthorSchema
.virtual('birth_formatted')
.get(function () {
  return this.date_of_birth ? moment(this.date_of_birth).format('YYYY-MM-DD') : '';
});

AuthorSchema
.virtual('due_death_formatted')
.get(function () {
  return this.date_of_death ? moment(this.date_of_death).format('MMMM Do, YYYY') : '';
});

AuthorSchema
.virtual('death_formatted')
.get(function () {
  return this.date_of_death ? moment(this.date_of_death).format('YYYY-MM-DD') : '';
});

AuthorSchema
.virtual('lifespan')
.get(function () {
  let rtn = "";
  if(this.date_of_birth) {
    rtn += moment(this.date_of_birth).format('MMMM Do, YYYY');
  }
  if(this.date_of_death) {
    rtn += " - " + moment(this.date_of_death).format('MMMM Do, YYYY');
  }
  if(rtn !== "") {
    rtn = "( " + rtn + " )";
  }
  return rtn;
});

//Export model
module.exports = mongoose.model('Author', AuthorSchema);