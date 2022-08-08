// Require schema and model from mongoose
const { Schema, model } = require('mongoose');
const mongoose = require('mongoose');

// Construct a new instance of the schema class
const userSchema = new mongoose.Schema(
  {
    username: { 
      type: String, 
      required: true, 
      unique: true, 
      trim: true 
    },
    email: { 
      type: String, 
      required: true, 
      unique: true, 
      trim: true 
    },
    thoughts: [{ type: Schema.Types.ObjectId, ref: 'thought' }],
    friends: [{ type: Schema.Types.ObjectId, ref: 'user' }],
  },
  {
    toJSON: {
      virtuals: true,
    },
    id: false,
  }
);

userSchema.virtual('friendCount').get(function () {
  return this.friends.length;
});

const User = mongoose.model('user', userSchema);

// Create new instances of the model, a document
// User.create([
//   { username: 'user1', email:'user1@gmail.com', thoughts: [], friends: [] },
//   { username: 'user2', email:'user2@gmail.com', thoughts: [], friends: [] },
//   { username: 'user3', email:'user3@gmail.com', thoughts: [], friends: [] },
//   { username: 'user4', email:'user4@gmail.com', thoughts: [], friends: [] },
//   { username: 'user5', email:'user5@gmail.com', thoughts: [], friends: [] },
//   { username: 'user6', email:'user6@gmail.com', thoughts: [], friends: [] },
//   { username: 'user7', email:'user7@gmail.com', thoughts: [], friends: [] },
// ]);

User.find({}).exec((err, collection) => {
  if (collection.length === 0) {
    User.insertMany(
      [
        { username: 'user1', email:'user1@gmail.com', thoughts: [], friends: [] },
        { username: 'user2', email:'user2@gmail.com', thoughts: [], friends: [] },
        { username: 'user3', email:'user3@gmail.com', thoughts: [], friends: [] },
        { username: 'user4', email:'user4@gmail.com', thoughts: [], friends: [] },
        { username: 'user5', email:'user5@gmail.com', thoughts: [], friends: [] },
        { username: 'user6', email:'user6@gmail.com', thoughts: [], friends: [] },
        { username: 'user7', email:'user7@gmail.com', thoughts: [], friends: [] },
      ],
      (insertErr) => {
        if (insertErr) {
          handleError(insertErr);
        }
      }
    );
  }
});

module.exports = User;

module.exports = User;
