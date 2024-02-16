
const { User, Thought } = require('../models');

module.exports = {
 
  async getThoughts(req, res) {
    try {
      const thoughts = await Thought.find();
     
     res.json(thoughts);
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  },
  // Get a single student
  async getSingleThought(req, res) {
    try {
      const thought = await Thought.findOne({ _id: req.params.thoughtId})
    

      if (!thought) {
        return res.status(404).json({ message: 'No thought with that ID' });
      }

      res.json(thought);
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  },

  async createThought(req, res) {
    try {
      const thought = await Thought.create(req.body);
      const updatedUser = await User.findOneAndUpdate({_id: req.body.userId}, {$push: {thoughts: thought._id}}, {new: true})
      
      if (!updatedUser) {
        return res.status(404).json({ message: 'No user with that ID' });
      }
      res.json({message: 'Created thought'});
    } catch (err) {
      res.status(500).json(err);
    }
  },

  async addReaction(req, res) {
    try {
      const thought = await Thought.findOneAndUpdate({_id: req.params.thoughtId}, {$addToSet:{reactions: req.body}}, {new: true, runValidators: true});
      res.json(thought);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  async removeReaction(req, res) {
    try {
      const thought = await Thought.findOneAndUpdate({_id: req.params.thoughtId}, {$pull: {reactions: {reactionId: req.params.reactionId}} }, {new: true});
      res.json(thought);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  
  async deleteThought(req, res) {
    try {
      const thought = await Thought.findOneAndRemove({_id: req.params.thoughtId});

      if (!thought) {
        return res.status(404).json({ message: 'No thought with that ID' });
      }
      const updatedUser = User.findOneAndUpdate({thoughts:req.params.thoughtId}, {$pull: {thoughts:req.params.thoughtId}}, {new: true})
      if (!updatedUser) {
        return res.status(404).json({ message: 'No user with that ID' });
      }
      res.json(updatedUser)
    } catch (err) {
      res.status(500).json(err);
    }
  },

};
