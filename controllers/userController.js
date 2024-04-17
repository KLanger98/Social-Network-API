const User = require('../models/User');

module.exports ={
    async getUsers(req, res) {
    try {
      const users = await User.find();
      res.json(users);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  async getSingleUser(req, res) {
    try {
      const user = await User.findOne({ _id: req.params.userId })
        .select('-__v');

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
      const dbUserData = await User.create(req.body);
      res.json(dbUserData);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  //Update a username
  async updateUser(req, res){
    try{
      const user = await User.findOneAndUpdate({_id: req.params.userId}, {username: req.body.username});
      res.json(user);
    } catch(err){
      res.status(500).json(err);
    }
  },
  //Delete a user
  async deleteUser (req,res) {
    try{
      const user = await User.findOneAndDelete({_id: req.params.userId});
      res.json(user);
    } catch(err){
      res.status(500).json(err);
    }
  },
  async addFriend(req, res) {
    try {
      let userId = req.params.userid;
      let friendId = req.params.friendId;
      const dbUserData = await User.create(req.body);
      res.json(dbUserData);
    } catch (err) {
      res.status(500).json(err);
    }
  }
}