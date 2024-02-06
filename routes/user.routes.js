const express = require("express");
const { UserModel } = require("../model/user.model");

const userRouter = express.Router();


userRouter.post("/", async (req, res) => {
  try {
    const user = new UserModel(req.body);
    await user.save();
    res.status(200).send({ msg: "The new user has been added" });
  } catch (err) {
    res.status(400).send({ err: err });
  }
});

userRouter.get("/", async (req, res) => {
  try {
    const users = await UserModel.find(req.query);
    res.status(200).send({ msg: "The list of all the users", users });
  } catch (err) {
    res.status(400).send({ err: err });
  }
});


userRouter.patch("/:userId", async (req, res) => {
  const { userId } = req.params;
  try {
    await UserModel.findByIdAndUpdate({ _id: userId }, req.body);
    res
      .status(200)
      .send({ msg: `the user with id ${userId} has been updated` });
  } catch (err) {
    res.status(400).send({ err: err });
  }
});

userRouter.delete("/:userId", async (req, res) => {
  const { userId } = req.params;
  try {
    await UserModel.findByIdAndDelete({ _id: userId });
    res
      .status(200)
      .send({ msg: `the user with id ${userId} has been Deleted` });
  } catch (err) {
    res.status(400).send({ err: err });
  }
});

module.exports = { userRouter };