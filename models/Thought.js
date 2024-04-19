const { Schema, model, mongoose } = require('mongoose');

const Reaction = require('./Reaction')

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
        reactions: [Reaction]
    },
    {
        toJSON: {
            virtuals: true
        },
        id: false
    }
)

thoughtSchema
    .virtual('reactionCount')
    .get(function(){
        return this.reactions.length;
    })

thoughtSchema
    .virtual('formattedDate')
    .get(function(){
        const year = this.createdAt.getFullYear();
        const month = String(this.createdAt.getMonth() + 1).padStart(2, '0'); // Adding 1 to month since it's zero-based
        const day = String(this.createdAt.getDate()).padStart(2, '0');
        const hours = String(this.createdAt.getHours()).padStart(2, '0');
        const minutes = String(this.createdAt.getMinutes()).padStart(2, '0');
        const seconds = String(this.createdAt.getSeconds()).padStart(2, '0');

        return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`
    })

const Thought = model('thought', thoughtSchema);

module.exports = Thought