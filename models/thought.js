const mongoose = require("mongoose");
const moment = require("moment");

const reactionShema = new mongoose.Schema(
  {
    reactionId: {
      type: mongoose.Schema.Types.ObjectId,
      default: () => new mongoose.Schema.Types.ObjectId(),
    },
    reactionBody: {
      type: String,
      required: true,
      maxlength: 280,
    },
    username: {
      type: String,
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now(),
      get: (date) => moment(date).format("LLL"),
    },
  },
  {
    toJSON: {
      getters: true,
    },
  }
);

const thoughtSchema = new mongoose.Schema(
  {
    thoughtText: {
      type: String,
      required: true,
      minlength: 1,
      maxlenght: 280,
    },
    createdAt: {
      type: Date,
      default: Date.now(),
      get: (date) => moment(date).format("LLL"),
    },
    username: { type: String, required: true },
    reactions: [reactionShema],
  },
  {
    toJSON: {
      virtuals: true,
      getters: true,
    },
    id: false,
  }
);

const Thought = mongoose.model("Thought", thoughtSchema);

thoughtSchema.virtual("reactionCount").get(function () {
  this.reactions.length;
});

// exports.reactionSchema = this.reactionSchema;
module.exports = Thought;
