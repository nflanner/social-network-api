// Require schema and model from mongoose
const mongoose = require('mongoose');
const { ObjectId } = require('mongoose').Types;

// Construct a new instance of the schema class
const thoughtSchema = new mongoose.Schema(
  {
    thoughtText: { 
      type: String, 
      required: true, 
      minLength: 1,
      maxLength: 280, 
    },
    createdAt: { 
      type: Date,
      default: Date.now,
    },
    username: { 
      type: String,
      required: true,
    },
    reactions: {
      reactionId: { 
        type: ObjectId,
        default: new ObjectId,
      },
      reactionBody: {
        type: String,
        required: true,
        maxLength: 280,
      },
      username: {
        type: String,
        required: true,
      },
      createdAt: {
        type: Date,
        default: Date.now,
      },
    },
  },
  {
    toJSON: {
      virtuals: true,
    },
    id: false,
  }
);

thoughtSchema.virtual('formattedThoughtDate').get(function () {
  const now = new Date(this.createdAt);
  return now.toDateString();
});

thoughtSchema.virtual('formattedReactionDate').get(function () {
  const now = new Date(this.reactions.createdAt);
  return now.toDateString();
});

const Thought = mongoose.model('thought', thoughtSchema);

module.exports = Thought;
