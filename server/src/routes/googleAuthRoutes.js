const express = require("express");
const passport = require("passport");
const jwt = require("jsonwebtoken");

const router = express.Router();

router.get(
    "/google",
    passport.authenticate("google", {
        scope: ["profile", "email"],
    })
);

router.get(
    "/google/callback",
    (req, res, next) => {
        passport.authenticate(
            "google",
            (err, user) => {
                if (err) {
                    return res.status(500).json({
                        error: err.message,
                    });
                }

                if (!user) {
                    return res
                        .status(401)
                        .send("Google returned no user");
                }
                console.log("JWT_SECRET =", process.env.JWT_SECRET);
                const token = jwt.sign(
                    { id: user._id },
                    process.env.JWT_SECRET,
                    { expiresIn: "7d" }
                );


                res.redirect(
                    `http://localhost:5173/google-success?token=${token}`
                );
            }
        )(req, res, next);
    }
);

module.exports = router;