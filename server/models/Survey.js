const mongoose = require('mongoose');
const { Schema } = mongoose;

const surveySchema = new Schema({
  _user: { type: Schema.Types.ObjectId, ref: 'User' },
  title: String,
  dataColumns: String,
  labelColumns: String,
  dateSent: Date,
  r2: Number
});

mongoose.model('surveys', surveySchema);
