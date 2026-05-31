const jwt = require("jsonwebtoken");
const User = require("../models/User");

const protect = async (req, res, next) => {
  let token;

  try {

    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {

      token = req.headers.authorization.split(" ")[1];

      // verify token
      const decoded = jwt.verify(token, "secretkey");

      // get user from token
      req.user = await User.findById(decoded.id).select("-password");

      next();

    } else {

      return res.status(401).json({
        message: "Not authorized, no token",
      });

    }

  } catch (error) {

    console.log(error);

    res.status(401).json({
      message: "Not authorized",
    });

  }
};

module.exports = { protect };