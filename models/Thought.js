const { Schema, model, mongoose } = require('mongoose');

const reactionSchema = new mongoose.Schema({
    reactionId: {
        type: Schema.Types.ObjectId,
        default: mongoose.Types.ObjectId
    },
    reactionBody: {
        type: String,
        maxlength: 280,

    },
    username: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now()
    }
})

const thoughtSchema = new mongoose.Schema(
    {
        thoughtText: {
            type: String,
            required: true, 
            minlength: 1,
            maxlength: 280

        },
        createdAt: {
            type: Date,
            default: Date.now
        },
        username: {
            type: String,
            required: true 

        },
        reactions: [reactionSchema]
    }
)

const Thought = mongoose.model('Thought', thoughtSchema);

module.exports = Thought