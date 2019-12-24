const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema(
    {
        username: String
    },
    {
        toJSON: {
            transform: function (doc, ret) {
                delete ret.__v;
            }
        }
    }
);

// Register UserSchema for 'User' model
mongoose.model('User', UserSchema);

module.exports = UserSchema;
