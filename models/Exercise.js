const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ExerciseSchema = new Schema(
    {
        description: {type: String,},
        duration: {type: Number,},
        date: {
            type: Date,
            default: Date.now()
        },
        userId: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    },
    {
        toJSON: {
            transform: function (doc, ret) {
                delete ret.__v;
            }
        }
    }
);
ExerciseSchema.statics.findOneOrCreate = function findOneOrCreate(condition, callback) {
    const self = this
    self.findOne(condition, (err, result) => {
        return result ? callback(err, result) : self.create(condition, (err, result) => { return callback(err, result) })
    })
}

// Register UserSchema for 'User' model
mongoose.model('Exercise', ExerciseSchema);

module.exports = ExerciseSchema;
