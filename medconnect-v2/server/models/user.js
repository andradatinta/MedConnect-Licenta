const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  type: {
    type: String,
    required: true,
    enum: ["doctor", "cmr_member"],
  },
  specialization: {
    type: String,
    validate: {
      validator: function (value) {
        return (
          (this.type === "doctor" && value != null) ||
          this.type === "cmr_member"
        );
      },
      message: "Specialization is required for doctor accounts",
    },
  },
  cuim: {
    type: String,
    validate: {
      validator: function (value) {
        return (
          (this.type === "doctor" && value != null) ||
          this.type === "cmr_member"
        );
      },
      message: "CUIM is required for doctor accounts",
    },
  },
  signedUpEvents: {
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: "Event" }],
    default: [],
  },
});

module.exports = mongoose.model("User", userSchema);
