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

  // Compare provided password with the stored one
  const passwordMatch = await bcrypt.compare(oldPassword, user.password);
  if (!passwordMatch) {
    res.status(401);
    throw new Error("Old password is incorrect");
  }

  // Hash new password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(newPassword, salt);

  // Update user password
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

  // Check if the new email is already in use
  const userWithNewEmail = await User.findOne({ email: newEmail });
  if (userWithNewEmail) {
    res.status(400);
    throw new Error("Email is already in use");
  }

  // Update user email
  user.email = newEmail;
  const updatedUser = await user.save();

  res.status(200).json({
    message: "Email updated successfully",
    user: {
      _id: updatedUser.id,
      firstName: updatedUser.firstName,
      lastName: updatedUser.lastName,
      email: updatedUser.email,
      type: updatedUser.type,
      specialization: updatedUser.specialization,
      cuim: updatedUser.cuim,
      token: generateToken(updatedUser._id),
      // include any other user fields you want here
    },
  });
});

exports.forgotPassword = asyncHandler(async (req, res) => {
  // 1. Get user based on POSTed email
  const user = await User.findOne({ email: req.body.email });

  // 2. If there is no user, send an error
  if (!user) {
    res.status(404);
    throw new Error("There is no user with that email.");
  }

  // 3. If user exists, generate the reset token
  // This could be a random string, but we will use a JWT
  const resetToken = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
    expiresIn: "10m", // token will expire in 10 minutes
  });

  // 4. Create reset URL
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
    // 5. Send it to user's email
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
  // Get the token from the URL
  const { token } = req.params;

  // Get the new password and confirmation password from the request body
  const { newPassword, confirmPassword } = req.body;

  if (!newPassword || !confirmPassword) {
    res.status(400);
    throw new Error("New password and confirmation password are required");
  }

  // Compare the new password and confirmation password
  if (newPassword !== confirmPassword) {
    res.status(400);
    throw new Error("New password and confirmation password do not match");
  }

  try {
    // Decode the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Get the user with the decoded id
    const user = await User.findById(decoded.id);
    if (!user) {
      res.status(404);
      throw new Error("User not found");
    }

    // Hash the new password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);

    // Update the user's password in the database
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
