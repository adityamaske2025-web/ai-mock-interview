const express = require("express");
const passport = require("passport");

const router = express.Router();

router.get(
    "/google",
    passport.authenticate("google", {
        scope: ["profile", "email"],
    })
);

router.get(
    "/google/callback",
    passport.authenticate("google", {
        failureRedirect: "/login",
    }),
    (req, res) => {

        const jwt = require("jsonwebtoken");

        const token = jwt.sign(
            { id: req.user._id },
            "secretkey",
            { expiresIn: "7d" }
        );
        console.log("TOKEN GENERATED:", token);
        res.redirect(
            `http://localhost:5173/google-success?token=${token}`
        );
});

module.exports = router;