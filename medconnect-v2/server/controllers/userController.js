const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const asyncHandler = require("express-async-handler");
const User = require("../models/user");
const Event = require("../models/event");
const File = require("../models/file");
const sendEmail = require("../util/sendEmail");

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

  if (password.length < 8) {
    res.status(400);
    throw new Error("Password should be at least 8 characters");
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
    throw new Error("Datele introduse sunt greșite");
  }
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

  if (password.length < 8) {
    res.status(400);
    throw new Error("Password should be at least 8 characters");
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
});

exports.loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (user && (await bcrypt.compare(password, user.password))) {
    res.status(201).json({
      _id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      type: user.type,
      specialization: user.specialization,
      cuim: user.cuim,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("Datele introduse sunt greșite");
  }
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

  const event = await Event.findById(eventId);
  if (!event) {
    res.status(404);
    throw new Error("Event not found");
  }

  const user = await User.findById(userId);
  if (!user) {
    res.status(404);
    throw new Error("User not found");
  }

  if (user.signedUpEvents.includes(eventId)) {
    res.status(400);
    throw new Error("User has already signed up for this event");
  }

  user.signedUpEvents.push(eventId);

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

exports.getUserAccreditationDate = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.userId);
  if (user.accreditationDate) {
    res.status(200).json({ accreditationDate: user.accreditationDate });
  } else {
    res.status(404).json({ message: "Accreditation date not found" });
  }
});

exports.changePassword = asyncHandler(async (req, res) => {
  const { oldPassword, newPassword } = req.body;

  const user = await User.findById(req.user.id);
  if (!user) {
    res.status(404);
    throw new Error("User not found");
  }

  const passwordMatch = await bcrypt.compare(oldPassword, user.password);
  if (!passwordMatch) {
    res.status(401);
    throw new Error("Parola curentă introdusă este greșită!");
  }

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(newPassword, salt);

  user.password = hashedPassword;
  await user.save();

  res.status(200).json({ message: "Password changed successfully" });
});

exports.changeEmail = asyncHandler(async (req, res) => {
  const { newEmail } = req.body;

  const user = await User.findById(req.user.id);
  if (!user) {
    res.status(404);
    throw new Error("User not found");
  }

  const userWithNewEmail = await User.findOne({ email: newEmail });
  if (userWithNewEmail) {
    res.status(400);
    throw new Error("Adresa de email este deja folosită!");
  }

  user.email = newEmail;
  const updatedUser = await user.save();

  res.status(200).json({
    message: "Adresa de email a fost schimbată!",
    user: {
      _id: updatedUser.id,
      firstName: updatedUser.firstName,
      lastName: updatedUser.lastName,
      email: updatedUser.email,
      type: updatedUser.type,
      specialization: updatedUser.specialization,
      cuim: updatedUser.cuim,
      token: generateToken(updatedUser._id),
    },
  });
});

exports.forgotPassword = asyncHandler(async (req, res) => {
  const user = await User.findOne({ email: req.body.email });

  if (!user) {
    res.status(404);
    throw new Error("There is no user with that email.");
  }

  const resetToken = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
    expiresIn: "10m",
  });

  const resetUrl = `http://localhost:3000/reset-password?token=${resetToken}`;

  const message = `<div style="font-family: 'Poppins', 'Roboto', 'Helvetica', 'Arial', sans-serif;">
  <h1>Ați solicitat resetarea parolei</h1>
  <p style="font-weight: 400">Ați primit acest email deoarece ați solicitat resetarea parolei pentru contul dumneavoastră.</p>
  <p style="font-weight: 400">Vă rugăm să dați click pe butonul de mai jos pentru a finaliza procesul în următoarele 10 minute:</p>
  <div style="text-align: center;">
    <a href="${resetUrl}" style="background-color: #034694; color: white; padding: 15px 32px; text-align: center; text-decoration: none; display: inline-block; font-size: 16px; margin: 4px 2px; cursor: pointer; border: none;">Resetează Parola</a>
  </div>
  <p style="font-weight: 400">Dacă nu ați solicitat acest lucru, vă rugăm să ignorați acest email și parola dumneavoastră va rămâne neschimbată.</p>
</div>`;

  try {
    await sendEmail({
      email: user.email,
      subject:
        "Token-ul dumneavoastră pentru resetarea parolei (valabil pentru 10 minute)",
      message,
    });

    res.status(200).json({ message: "Token-ul a fost trimis pe email!" });
  } catch (err) {
    console.log(err);
    res.status(500);
    throw new Error("A apărut o eroare în timpul trimiterii email-ului");
  }
});

exports.resetPassword = asyncHandler(async (req, res) => {
  const { token } = req.params;

  const { newPassword, confirmPassword } = req.body;

  if (!newPassword || !confirmPassword) {
    res.status(400);
    throw new Error("New password and confirmation password are required");
  }

  if (newPassword !== confirmPassword) {
    res.status(400);
    throw new Error("New password and confirmation password do not match");
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findById(decoded.id);
    if (!user) {
      res.status(404);
      throw new Error("User not found");
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);
    user.password = hashedPassword;
    await user.save();

    res.status(200).json({
      message: "Password updated successfully",
    });
  } catch (error) {
    res.status(400);
    throw new Error("Invalid or expired token");
  }
});
