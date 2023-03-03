import { UserModel } from '../models/user.model';
import mongoose from 'mongoose';

const ObjectID = mongoose.Types.ObjectId;

const getAllUSers = async (req, res) => {
  const users = await UserModel.find().select('-password');
  res.status(200).json(users);
};

const userInfo = (req, res) => {
  if (!ObjectID.isValid(req.params.id))
    return res.status(400).send(`ID unknow : ${req.params.id}`);

  UserModel.findById(req.params.id, (err, docs) => {
    !err ? res.send(docs) : console.log(`ÌD unknow : ${err}`);
  }).select('-password');
};

const updateUser = async (req, res) => {
  if (!ObjectID.isValid(req.params.id))
    return res.status(400).send(`ID unknow : ${req.params.id}`);

  try {
    UserModel.findOneAndUpdate(
      {
        _id: req.params.id,
      },
      {
        $set: {
          email: req.body.email,
        },
      },
      {
        new: true,
        upsert: true,
        setDefaultsOnInsert: true,
        runValidators: true,
      },
      (err, docs) => {
        if (!err) return res.send(docs);
        if (err) return res.status(500).send({ message: err });
      }
    );
  } catch (err) {
    return res.status(500).json({ message: err });
  }
};

const deleteUser = (req, res) => {
  if (!ObjectID.isValid(req.params.id))
    return res.status(400).send(`ID unknow : ${req.params.id}`);

  try {
    UserModel.deleteOne({ _id: req.params.id }).exec();
    res.status.json({ message: 'Successfully Delete' });
  } catch (err) {
    return res.status(500).json({ message: err });
  }
};

const follow = async (req, res) => {
  if (
    !ObjectID.isValid(req.params.id) ||
    !ObjectID.isValid(req.body.idToFolllow)
  )
    try {
      UserModel.findByIdAndUpdate(
        req.params.id,
        { $addToSet: { following: req.body.idToFollow } },
        { new: true, upsert: true },
        (err, docs) => {
          if (!err) res.status(201).json(docs);
          else return res.status(400).json(err, 'dede');
        }
      );
      UserModel.findByIdAndUpdate(
        req.body.idToFollow,
        { $addToSet: { followers: req.params.id } },
        { new: true, upsert: true },
        (err, docs) => {
          if (err) return res.status(400).json(err);
        }
      );
    } catch {
      return res.status(500).json({ message: err });
    }
};

const unfollow = async (req, res) => {
  if (
    !ObjectID.isValid(req.params.id) ||
    !ObjectID.isValid(req.body.idToUnFollow)
  )
    return res.status(400).send(`ID unknow : ${req.params.id}`);

  try {
    UserModel.findByIdAndUpdate(
      req.params.id,
      { $pull: { following: req.body.idToUnFollow } },
      { new: true, upsert: true },
      (err, docs) => {
        if (!err) res.status(201).json(docs);
        else return res.status(400).json(err);
      }
    );
    UserModel.findByIdAndUpdate(
      req.body.idToUnFollow,
      { $pull: { followers: req.params.id } },
      { new: true, upsert: true },
      (err, docs) => {
        if (err) return res.status(400).json(err);
      }
    );
  } catch {
    return res.status(500).json({ message: err });
  }
};

export const userController = {
  getAllUSers,
  userInfo,
  updateUser,
  deleteUser,
  follow,
  unfollow,
};
