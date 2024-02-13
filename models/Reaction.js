const { Schema, Types } = require('mongoose');


// Schema to create Reaction id
const reactionSchema = new Schema(
  {
    reactionId: {
      type: Schema.Types.ObjectId, 
    default: () => new Types.ObjectId ()
    },
    reactionBody: {
      type: String,
      required: true,
      maxlenght: 280
    },
    createdAt: {
        type: Date,
        default: Date.now
      },
  
      userName: {type: String, required: true},
  },
  {
    toJSON: {
      virtuals: true,
    },
  }
);





module.exports = reactionSchema;
