const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: String,
    email: {
      type:  String,
      unique: true,
      require: true,
    },
    password: String,
    role: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Role'
    }
});

module.exports = mongoose.model('User', userSchema);
