const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const asyncHandler = require("express-async-handler");
const User = require("../models/user");
const Event = require("../models/event");
const File = require("../models/file");

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
  const page = parseInt(req.query.page) - 1 || 0;
  const limit = parseInt(req.query.limit) || 5;

  const searchedUsers = await User.find({
    $or: [
      { firstName: { $regex: search, $options: "i" } },
      { lastName: { $regex: search, $options: "i" } },
    ],
    type: "doctor",
  })
    .skip(page * limit)
    .limit(limit);

  const totalSearchedUsers = await User.countDocuments({
    $or: [
      { firstName: { $regex: search, $options: "i" } },
      { lastName: { $regex: search, $options: "i" } },
    ],
    type: "doctor",
  });

  const response = { searchedUsers, limit, page: page + 1, totalSearchedUsers };
  res.status(200).json(response);
});

exports.getUserDetails = asyncHandler(async (req, res) => {
  const doctorData = await User.findById(req.params.userId);
  if (doctorData) {
    res.status(200).json(doctorData);
  } else {
    res.status(404).json({ message: "User not found" });
  }
});

exports.signUpForEvent = asyncHandler(async (req, res) => {
  const { eventId } = req.body;
  const userId = req.user.id;

  // Check if the event exists
  const event = await Event.findById(eventId);
  if (!event) {
    res.status(404);
    throw new Error("Event not found");
  }

  // Find the user
  const user = await User.findById(userId);
  if (!user) {
    res.status(404);
    throw new Error("User not found");
  }

  // Check if the user has already signed up for the event
  if (user.signedUpEvents.includes(eventId)) {
    res.status(400);
    throw new Error("User has already signed up for this event");
  }

  // Add the event to the user's signedUpEvents
  user.signedUpEvents.push(eventId);

  // Save the user
  await user.save();

  res.json({ success: true });
});

exports.calculateUserCredits = asyncHandler(async (req, res) => {
  const { userId } = req.params;
  const { years } = req.query;
  const givenYearsAgo = new Date();
  givenYearsAgo.setFullYear(givenYearsAgo.getFullYear() - years);

  const user = await User.findById(userId);
  if (!user) {
    res.status(404);
    throw new Error("User not found");
  }

  let startDate = givenYearsAgo;
  if (user.accreditationDate && user.accreditationDate > givenYearsAgo) {
    startDate = user.accreditationDate;
  }

  const files = await File.find({
    owner: userId,
    validated: true,
    validationDate: { $gte: startDate },
  });

  const totalCredits = files.reduce(
    (sum, file) => sum + file.extractedCredits,
    0
  );

  res.status(200).json({ totalCredits });
});
