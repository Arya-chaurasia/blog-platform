const User = require("../../modals/user.schema");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const apiResponse = require("../../helper/apiResponse");

exports.register = async (req, res) => {
  const { email, password } = req.body;

  try {
    const existingUser = await User.findOne({ email: email.toLowerCase() });

    if (existingUser) {
      return apiResponse.ErrorResponse(res, "Email already exists");
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      email: email.toLowerCase(),
      password: hashedPassword,
      profileImage: req.file ? req.file.path : null,
    });

    // Return success response
    return apiResponse.successResponseWithData(
      res,
      "User successfully registered",
      user
    );
  } catch (error) {
    console.log(error);
    return apiResponse.ErrorResponse(res, "Error creating user: " + error);
  }
};


exports.login = (req, res) => {
    const { email, password } = req.body;
  
    User.findOne({ email: email.toLowerCase() }).then((user) => {
      if (!user) {
        return apiResponse.unauthorizedResponse(res, "Email does not exist");
      }
  
      bcrypt.compare(password, user.password).then((isPasswordValid) => {
        if (!isPasswordValid) {
          return apiResponse.unauthorizedResponse(res, "Invalid password");
        } else {
          const tokenPayload = {
            email: user.email,
            userId: user._id,
          };
  
          const token = jwt.sign(tokenPayload, process.env.SECRET_KEY, {
            expiresIn: "1h",
          });
  
          const responseData = {
            ...user.toObject(),
            ...tokenPayload,
            token,
          };
  
          return apiResponse.successResponseWithData(
            res,
            "Logged in successfully",
            responseData
          );
        }
      })
      .catch((err) => {
          console.log(err)
          return apiResponse.ErrorResponse(res, "server error" + err)
      })
    }).catch((err) => {
      console.log(err);
      return apiResponse.ErrorResponse(res, "Server error: " + err)
    })
  };

