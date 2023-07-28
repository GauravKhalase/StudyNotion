const jwt = require("jsonwebtoken");
require("dotenv").config();
const User = require("../models/User");

exports.auth = (req, res, next) => {
  try {
    const token = req.header("Authorization").replace("Bearer ", ""); // space after bearer is compulsory
    // req.body.token ||
    // req.cookies.token ||
    // req.header("Authorization").replace("Bearer ", "");

    // console.log(req.body.token);
    // console.log(req.cookies.token); 
    console.log(req.header("Authorization").replace("Bearer", ""));
    console.log(req.header("Authorization").replace("Bearer ", ""));

    if (!token || token === undefined) {
      return res.status(401).json({
        success: false,
        message: "Token is Missing",
      });
    }

    //verify the token
    try {
      const payload = jwt.verify(token, process.env.JWT_SECRET); //decoding
      console.log(payload);      
      //why this ?
      req.user = payload;
    } catch (error) {
      return res.status(401).json({
        success: false,
        message: "token is invalid",
      });
    }
    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: "Something went wrong, while verifying the token",
      error: error.message,
    });
  }
};

exports.isStudent = (req, res, next) => {
  try {
    if (req.user.accountType !== "Student") {
      return res.status(401).json({
        success: false,
        message: "This is a protected route for Students",
      });
    }
    next();
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "User role cannot be verified, please try again",
    });
  }
};

exports.isInstructor = (req, res, next) => {
  try {
    if (req.user.accountType !== "Instructor") {
      return res.status(401).json({
        success: false,
        message: "This is a protected route for Instructor",
      });
    }
    next();
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "User role cannot be verified, please try again",
    });
  }
};

exports.isAdmin = (req, res, next) => {
  try {
    if (req.user.accountType !== "Admin") {
      return res.status(401).json({
        success: false,
        message: "This is a protected route for Admin",
      });
    }
    next();
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "User role cannot be verified, please try again",
    });
  }
};
