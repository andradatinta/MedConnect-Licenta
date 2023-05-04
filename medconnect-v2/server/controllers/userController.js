const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const asyncHandler = require("express-async-handler");
const User = require("../models/user");

// generate jwt
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
};
exports.registerUserDoctor = asyncHandler(async (req, res) => {
  const { firstName, lastName, email, password, specialization, cuim } =
    req.body;
  const type = "doctor";
  if (
    !firstName ||
    !lastName ||
    !email ||
    !password ||
    !type ||
    !specialization ||
    !cuim
  ) {
    res.status(400);
    throw new Error("Please add all fields");
  }
  // check if the user exists

  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(400);
    throw new Error("User already exists");
  }

  // hash password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  // create user
  const newUser = await User.create({
    firstName,
    lastName,
    email,
    password: hashedPassword,
    type,
    specialization,
    cuim,
  });
  if (newUser) {
    res.status(201).json({
      _id: newUser.id,
      firstName: newUser.firstName,
      lastName: newUser.lastName,
      email: newUser.email,
      type: newUser.type,
      specialization: newUser.specialization,
      cuim: newUser.cuim,
      token: generateToken(newUser._id),
    });
  } else {
    res.status(400);
    throw new Error("Invalid user data");
  }
  // res.json({ message: "Register Doctor" });
});

exports.registerUserCMR = asyncHandler(async (req, res) => {
  const { firstName, lastName, email, password } = req.body;
  const type = "cmr_member";
  if (!firstName || !lastName || !email || !password || !type) {
    res.status(400);
    throw new Error("Please add all fields");
  }

  if (!email.endsWith("@cmr.ro")) {
    res.status(400);
    throw new Error("Invalid email domain for a CMR member account");
  }

  // check if the user exists

  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(400);
    throw new Error("User already exists");
  }

  // hash password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  // create user
  const newUser = await User.create({
    firstName,
    lastName,
    email,
    password: hashedPassword,
    type,
  });
  if (newUser) {
    res.status(201).json({
      _id: newUser.id,
      firstName: newUser.firstName,
      lastName: newUser.lastName,
      email: newUser.email,
      type: newUser.type,
      token: generateToken(newUser._id),
    });
  } else {
    res.status(400);
    throw new Error("Invalid user data");
  }
  // res.json({ message: "Register CMR" });
});

exports.loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  // check for user email
  const user = await User.findOne({ email });
  if (user && (await bcrypt.compare(password, user.password))) {
    res.status(201).json({
      _id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      type: user.type,
      // s ar putea sa pun aici specialization?: ca pot si sa nu existe
      specialization: user.specialization,
      cuim: user.cuim,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("Invalid user data");
  }
  // res.json({ message: "Authenticate user" });
});

exports.getLoggedInUser = asyncHandler(async (req, res) => {
  const { _id, firstName, lastName, email, type, specialization, cuim } =
    await User.findById(req.user.id);
  res.status(200).json({
    id: _id,
    firstName,
    lastName,
    email,
    type,
    specialization,
    cuim,
  });
  // res.json({ message: "Get current user's data" });
});

exports.getSearchedForUsers = asyncHandler(async (req, res) => {
  const search = req.query.search || "";

  const searchedUsers = await User.find({
    lastName: { $regex: search, $options: "i" },
  });
  res.status(200).json(searchedUsers);
});
