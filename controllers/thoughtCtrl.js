const { Thought, User } = require("../models");
const { reactionSchema } = require("../models/thought");

module.exports = {
  async getAllThoughts(req, res) {
    try {
      const thoughts = await Thought.find({});
      return await res.json(thoughts);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
  async createThought(req, res) {
    try {
      const { thoughtText, username } = req.body;
      const thought = await Thought.create({ thoughtText, username });
      const updatedUser = User.findOneAndUpdate(
        { username },
        { $set: { thoughts: thought._id } },
        { new: true }
      );
      return await res.status(201).json(thought);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
  async getThoughtById(req, res) {
    try {
      const thought = await Thought.findById(req.params.id);
      return await res.json(thought);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
  async updateThoughtById(req, res) {
    try {
      const { thoughtText, username } = req.body;
      const thought = await Thought.findByIdAndUpdate(
        req.params.id,
        {
          thoughtText,
          username,
        },
        { runValidators: true, new: true }
      );
      return await res.json(thought);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
  async deleteThoughtById(req, res) {
    try {
      const deleted = await Thought.findByIdAndDelete(req.params.id);
      return await res.json(deleted);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
  async addReaction(req, res) {
    try {
      const { reactionBody, username } = req.body;
      const updated = await Thought.findByIdAndUpdate(
        req.params.thoughtId,
        {
          $set: { reactions: new reactionSchema({ reactionBody, username }) },
        },
        { runValidators: true }
      );
      return await res.status(201).json(updated);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
  async deleteReaction(req, res) {
    try {
      const deleted = await Thought.findByIdAndUpdate(
        req.params.thoughtId,
        {
          $pull: { reactions: { reactionId: req.params.reactionId } },
        },
        { runValidators: true }
      );
      return await res.status(201).json(deleted);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
};
