const User = require('../models/User');
const Thought = require('../models/Thought')

module.exports ={
    async getUsers(req, res) {
    try {
      const users = await User.find()
        .select('-__v')
        .populate('thoughts')
        .populate('friends')
      res.json(users);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  async getSingleUser(req, res) {
    try {
      const user = await User.findOne({ _id: req.params.userId })
        .select('-__v')
        .populate('thoughts')
        .populate('friends')


      if (!user) {
        return res.status(404).json({ message: 'No user with that ID' });
      }

      res.json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  // create a new user
  async createUser(req, res) {
    try {
      const dbUserData = await User.create(req.body)

      res.json(dbUserData);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  //Update a username
  async updateUser(req, res){
    try{
      const user = await User.findOneAndUpdate({_id: req.params.userId}, {username: req.body.username}, {new: true})
        .select('-__v');
      res.json(user);
    } catch(err){
      res.status(500).json(err);
    }
  },
  //Delete a user
  async deleteUser (req,res) {
    try{
      const user = await User.findOneAndDelete({_id: req.params.userId});
      
      for(let i = 0; i < user.thoughts.length; i++){
        await Thought.findOneAndDelete({_id: user.thoughts[i]})
      }

      res.json({message: "User successfully deleted"});
    } catch(err){
      res.status(500).json(err);
    }
  },
  async addFriend(req, res) {
    try {
      const user = await User.findOneAndUpdate(
        {_id: req.params.userId},
        {$set: {friends: req.body.friendId}},
        {runValidators: true, new: true}
      )
      
      if(!user){
        return res.status(400).json({message: 'Unable to find user with this ID'})
      }

      res.json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  async deleteFriend(req, res) {
    try {
      const user = await User.findOneAndUpdate(
        {_id: req.params.userId},
        {$pull: {friends: req.params.friendId}},
        {runValidators: true, new: true}
      )
        .select('-__v')
      
      if(!user){
        return res.status(400).json({message: "Unable to find user with that ID"})
      }
      res.json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  }
}