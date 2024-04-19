const { Schema, model, mongoose, Types } = require('mongoose');

const reactionSchema = new mongoose.Schema(
    {
    reactionId: {
        type: Schema.Types.ObjectId,
        default: () => new mongoose.Types.ObjectId()
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
    },
    {   
        toJSON: {
            getters: true,
        },
        id: false
    }
)

reactionSchema
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


module.exports = reactionSchema;