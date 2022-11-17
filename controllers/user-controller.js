const { user } = require('../models/Thought');

const userController = {
  // get all users
  getAllUser(req, res) {
    user.find({})
      .populate({
        path: 'comments',
        select: '-__v'
      })
      .select('-__v')
      .sort({ _id: -1 })
      .then(dbUserData => res.json(dbUserData))
      .catch(err => {
        console.log(err);
        res.sendStatus(400);
      });
  },

  // get one user by id
  getUserById({ params }, res) {
    user.findOne({ _id: params.id })
      .populate({
        path: 'comments',
        select: '-__v'
      })
      .select('-__v')
      .then(dbuserData => res.json(dbuserData))
      .catch(err => {
        console.log(err);
        res.sendStatus(400);
      });
  },

  // createuser
  createUser({ body }, res) {
    user.create(body)
      .then(dbuserData => res.json(dbuserData))
      .catch(err => res.json(err));
  },

  // update user by id
  updateUser({ params, body }, res) {
    user.findOneAndUpdate({ _id: params.id }, body, {
      new: true,
      runValidators: true
    })
      .then(dbuserData => {
        if (!dbuserData) {
          res.status(404).json({ message: 'No user found with this id!' });
          return;
        }
        res.json(dbuserData);
      })
      .catch(err => res.json(err));
  },

  // delete user
  deleteUser({ params }, res) {
    user.findOneAndDelete({ _id: params.id })
      .then(dbuserData => res.json(dbuserData))
      .catch(err => res.json(err));
  }
};

module.exports = userController;
