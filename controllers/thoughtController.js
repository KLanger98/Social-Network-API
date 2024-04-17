const Thought = require('../models/Thought');

module.exports ={
    async getThoughts(req, res) {
    try {
      const thoughts = await Thought.find();
      res.json(thoughts);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  async getSingleThought(req, res) {
    try {
      const thought = await Thought.findOne({ _id: req.params.thoughtId });

      if (!thought) {
        return res.status(404).json({ message: 'No thought with that ID' });
      }

      res.json(thought);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  // create a new thought
  async createThought(req, res) {
    try {
      const dbthoughtData = await Thought.create(req.body);
      res.json(dbthoughtData);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  //Update existing thought
  async updateThought(req, res) {
    try{
      const thought = await Thought.findOneAndUpdate({_id: req.params.thoughtId}, {thoughtText: req.body.thoughtText})
      res.json(thought)
    } catch(err){
      res.status(500).json(err)
    }
  },

  //Delete a thought
  async deleteThought(req, res) {
    try {
      const thought = await Thought.findOneAndDelete({ _id: req.params.thoughtId });
      
      res.json(thought);
    } catch (err) {
      res.status(500).json(err);
    }
  },
}