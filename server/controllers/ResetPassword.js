const User = require("../models/User");
const mailSender = require("../utils/mailSender");
const bcrypt = require("bcrypt");
const crypto = require("crypto");


exports.resetPasswordToken = async (req, res) => {
  try {
    const email = req.body.email;

    const user = await User.findOne({ email: email });
    if (!user) {
      return res.status(500).json({
        success: false,
        message: `This Email: ${email} is not Registered With Us Enter a Valid Email `,
      });
    }

    const token = crypto.randomBytes(20).toString("hex");
    console.log(token)

    const updatedDetails = await User.findOneAndUpdate(
      { email: email },
      {
        token: token,
        resetPasswordExpires: Date.now() + 3600000,
      },
      {
        new: true,
      }
    );
    console.log("DETAILS", updatedDetails);


    const url = `http://localhost:3000/update-password/${token}`;

    await mailSender(
      email, 
      "Password Reset",
			`Your Link for email verification is ${url}. Please click this url to reset your password.`
    );

    res.status(200).json({
      success: true,
      message: "Email Sent Successfully, Please Check Your Email to Continue Further",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: `Some Error in Sending the Reset Message`,
    });
  }
};

exports.resetPassword = async (req, res) => {
  try {

    const {password, confirmPassword, token} = req.body;

    if (password !== confirmPassword){
        return res.status(500).json({
            success: false,
            message: "Passwords does not match",
          });
    }

    const userDetails = await User.findOne({token:token});

    console.log(userDetails)

    if (!userDetails){
        return res.status(500).json({
            success: false,
            message: "Token is invalid",
          });
    }

    if (userDetails.resetPasswordExpires < Date.now()){
        return res.status(500).json({
            success: false,
            message: "Token is Expired, Please Regenerate Your Token",
          });
    }

    const hashedPassword = await bcrypt.hash(password,10);

    await User.findOneAndUpdate({token:token},{password:hashedPassword},{new:true})

    res.status(200).json({
      success: true,
      message: "Password Reset Successful"
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Some Error in Updating the Password",
    });
  }
};