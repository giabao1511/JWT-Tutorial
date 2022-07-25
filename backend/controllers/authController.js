const bcrypt = require("bcrypt");
const User = require("../models/User");
const jwt = require("jsonwebtoken");
let refreshTokens = [];

const authController = {
  generateAccessToken: (user) => {
    return jwt.sign(
      {
        id: user.id,
        admin: user.admin,
      },
      process.env.SECRET_JWT_KEY,
      {
        expiresIn: "30s",
      }
    );
  },

  generateRefreshToken: (user) => {
    return jwt.sign(
      {
        id: user.id,
        admin: user.admin,
      },
      process.env.SECRET_REFRESH_KEY,
      {
        expiresIn: "365d",
      }
    );
  },

  registerUser: async (req, res) => {
    try {
      const salt = await bcrypt.genSalt(10);
      const hashed = await bcrypt.hash(req.body.password, salt);

      // create new user
      const newUser = new User({
        username: req.body.username,
        email: req.body.email,
        password: hashed,
      });

      const isExisted = await User.findOne({
        username: newUser.username,
        email: newUser.email,
      });

      if (!isExisted) {
        const user = await newUser.save();
        res.json({
          status: 201,
          msg: "Register Successfully",
          ...user._doc,
        });
      } else {
        res.json({
          status: 403,
          msg: "This username or email have been registered!",
        });
      }
    } catch (err) {
      return res.status(500).json(err);
    }
  },

  loginUser: async (req, res) => {
    try {
      const user = await User.findOne({ username: req.body.username });

      if (!user) {
        return res.json({
          status: 403,
          msg: "Wrong password or username",
        });
      }

      const confirmPassword = await bcrypt.compare(
        req.body.password,
        user.password
      );
      if (!confirmPassword) {
        return res.json({
          status: 403,
          msg: "Wrong password or username",
        });
      }

      if (user && confirmPassword) {
        const accessToken = authController.generateAccessToken(user);
        const refreshToken = authController.generateRefreshToken(user);
        refreshTokens.push(refreshToken);

        res.cookie("refreshToken", refreshToken, {
          httpOnly: true,
          sameSite: "strict",
          path: "/",
          secure: false,
        });

        const { password, ...info } = user._doc;
        res.status(200).json({
          status: 200,
          msg: "Login Successfully",
          ...info,
          accessToken,
        });
      }
    } catch (err) {
      return res.status(500).json(err);
    }
  },

  requestRefreshToken: async (req, res) => {
    try {
      const refreshToken = req.cookies.refreshToken;
      if (!refreshToken) {
        return res.status(403).json("You're not authenticated");
      }
      if (!refreshTokens.includes(refreshToken)) {
        return res.status(403).json("Token is not valid");
      }

      jwt.verify(refreshToken, process.env.SECRET_REFRESH_KEY, (err, user) => {
        if (err) {
          return res.status(403).json(err);
        }
        refreshTokens = refreshTokens.filter((token) => token !== refreshToken);

        const newAccessToken = authController.generateAccessToken(user);
        const newRefreshToken = authController.generateRefreshToken(user);

        refreshTokens.push(newRefreshToken);
        res.cookie("refreshToken", newRefreshToken, {
          httpOnly: true,
          sameSite: "strict",
          path: "/",
          secure: false,
        });
        res.status(200).json({ accessToken: newAccessToken });
      });
    } catch (err) {
      return res.status(500).json(err);
    }
  },

  logOutUser: async (req, res) => {
    res.clearCookie("refreshToken");
    refreshTokens = refreshTokens.filter(
      (token) => token !== req.cookies.refreshToken
    );
    res.json({
      status: 200,
      msg: "Logged out!!",
    });
  },
};

module.exports = authController;
