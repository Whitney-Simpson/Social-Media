const { Schema, model } = require('mongoose');


// Schema to create Student model
const userSchema = new Schema(
  {
    userName: {
      type: String,
      required: true,
      trim: true,
      unique: true
    },
    email: {
      type: String,
      required: true,
      unique: true,
      match: [/.+@.+\..+/, 'must be a valid email']
    },
    thoughts: [
        {type: Schema.Types.ObjectId, ref: 'Thought'},
    ],
    friends: [
        {type: Schema.Types.ObjectId, ref: 'User'}
    ]
  },
  {
    toJSON: {
      virtuals: true,
    },
  }
);

userSchema.virtual('friendCount').get(function()
{
    return this.friends.length;
}
);
const User = model('User', userSchema);



module.exports = User;
