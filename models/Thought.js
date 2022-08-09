// Require schema and model from mongoose
const mongoose = require('mongoose');
const { ObjectId } = require('mongoose').Types;
const { Schema, model } = require('mongoose');

const reactionSchema = new mongoose.Schema(
  {
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
  {
    toJSON: {
      virtuals: true,
    },
    id: false,
  }
);

reactionSchema.virtual('formattedReactionDate').get(function () {
  const now = new Date(this.createdAt);
  return now.toDateString();
});

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
      type: [reactionSchema],
      required: false
    },
  },
  {
    toJSON: {
      virtuals: true,
    },
    id: false,
  }
);

thoughtSchema.virtual('reactionCount').get(function () {
  return this.reactions.length;
});

thoughtSchema.virtual('formattedThoughtDate').get(function () {
  const now = new Date(this.createdAt);
  return now.toDateString();
});

module.exports = mongoose.model('thought', thoughtSchema);
