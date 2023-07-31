const { model, models, Schema } = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new Schema({
  email: {
    type: String,
    required: [true, "Email or Username is required!"],
    unique: true,
    validate: {
      validator: function (value) {
        // Check if the value is a valid email or a username
        return (
          /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/.test(value) ||
          /^[A-Za-z0-9_]+$/.test(value)
        );
      },
      message: "Invalid Email or Username",
    },
  },
  name: { type: String, trim: true },
  password: { type: String, required: [true, "Password is required!"] },
  role: { type: String, enum: ["admin", "user", "manager"], default: "user" },
});

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    throw error;
  }
});

userSchema.methods.comparePassword = async function (password) {
  try {
    return await bcrypt.compare(password, this.password);
  } catch (error) {
    throw error;
  }
};

const UserModel = models.User || model("User", userSchema);

module.exports = UserModel;
