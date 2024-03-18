
const { User, Thought } = require('../models');

module.exports = {
 
  async getUsers(req, res) {
    try {
      const users = await User.find().populate('thoughts').populate('friends');

     
     res.json(users);
    } catch (err) {
      console.log(err);
     res.status(500).json(err);
    }
  },
  // Get a single student
  async getSingleUser(req, res) {
    try {
      const user = await User.findOne({ _id: req.params.userId})
    

      if (!user) {
        return res.status(404).json({ message: 'No user with that ID' });
      }

      res.json(user);
    } catch (err) {
      console.log(err);
     res.status(500).json(err);
    }
  },

  async createUser(req, res) {
    try {
      const user = await User.create(req.body);

      res.json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  async addFriend(req, res) {
    try {
      const user = await User.findOneAndUpdate({_id: req.params.userId}, {$push:{friends: {_id: req.params.friendId}}}, {new: true});
      res.json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  async removeFriend(req, res) {
    try {
      const user = await User.findOneAndUpdate({_id: req.params.userId}, {$pull:{friends: req.params.friendId}}, {new: true});
      res.json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  // Delete a student and remove them from the course
  async deleteUser(req, res) {
    try {
      const user = await User.findOneAndRemove({ _id: req.params.userId });

      if (!user) {
        return res.status(404).json({ message: 'No such user exists' })
      } 
      await Thought.deleteMany({_id: {$in: user.thoughts}})

      res.json({ message: 'User successfully deleted' });
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },

  async updatedUser(req, res) {
    try {
      const user = await User.findOneAndUpdate({ _id: req.params.userId }, {$set: req.body}, {new: true, runValidators: true});

      if (!user) {
        return res.status(404).json({ message: 'No update was made' })
      } 
      res.json({ message: 'User successfully updated' });
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },
};
