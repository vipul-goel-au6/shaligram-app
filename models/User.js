const { Schema, model } = require("mongoose");
const { hash, compare } = require("bcryptjs");
const { sign } = require("jsonwebtoken");
const { ObjectId } = Schema.Types;

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      trim: true,
      default: null,
    },
    phoneNumber: {
      type: String,
      trim: true,
      default: null,
    },
    userName: {
      unique: true,
      type: String,
      required: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
      trim: true,
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    accessToken: {
      type: String,
      trim: true,
    },
    userDetails: {
      profilePic: {
        type: String,
        default:"https://res.cloudinary.com/dpad3bwv8/image/upload/v1593763032/d_dicqns.png",
      },
      bio: {
        type: String,
        default: "",
      },
      followers: [{ type: ObjectId, ref: "User" }],
      following: [{ type: ObjectId, ref: "User" }],
    },
    resetPassword: {
      token: String,
      expiresIn: Date
    }
  },
  { timestamps: true }
);

userSchema.statics.findByEmailAndPassword = async (username, password) => {
  try {
    const user = await User.findOne({$or: [
      {email: username},
      {phoneNumber: username},
      {userName: username}
    ]});
    if (!user) throw new Error("Incorrect Credentials");
    const isMatched = await compare(password, user.password);
    if (!isMatched) throw new Error("Incorrect Credentials");
    return user;
  } catch (err) {
    err.name = "AuthError";
    throw err;
  }
};

userSchema.methods.generateToken = async function () {
  const user = this;
  const accessToken = sign({ id: user._id }, process.env.JWT_SECRET_KEY, {
    expiresIn: "12h",
  });
  user.accessToken = accessToken;
  await user.save();
  return accessToken;
};

userSchema.pre("save", async function (next) {
  const user = this;
  try {
    if (user.isModified("password")) {
      const hashedPassword = await hash(user.password, 10);
      user.password = hashedPassword;
      next();
    }
  } catch (err) {
    console.log(err.message);
    next(err);
  }
});

const User = model("User", userSchema);
module.exports = User;
