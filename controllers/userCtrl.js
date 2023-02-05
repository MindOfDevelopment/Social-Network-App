const { User } = require("../models");

module.exports = {
  async getAllUsers(req, res) {
    try {
      const users = await User.find({});
      return await res.json(users);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
  async createUser(req, res) {
    try {
      const { email, username } = req.body;
      const user = await User.create({ email, username });
      return await res.status(201).json(user);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
  async getUserById(req, res) {
    try {
      const user = await User.findById(req.params.id)
        .populate({ path: "thoughts" })
        .populate({ path: "friends" });
      return await res.json(user);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
  async updateUserById(req, res) {
    try {
      const { email, username } = req.body;
      const user = await User.findByIdAndUpdate(
        req.params.id,
        {
          email,
          username,
        },
        { new: true }
      );
      return await res.json(user);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
  async deleteUserById(req, res) {
    try {
      const user = await User.findByIdAndDelete(req.params.id);
      return await res.json(user);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
  async addFriendById(req, res) {
    try {
      const user = await User.findByIdAndUpdate(
        req.params.userId,
        {
          $set: { friends: req.params.friendId },
        },
        { new: true }
      );
      return await res.json(user);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
  async deleteFriendById(req, res) {
    try {
      const user = await User.findByIdAndUpdate(
        req.params.userId,
        {
          $pull: { friends: req.params.friendId },
        },
        { new: true }
      );
      return await res.json(user);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
};
