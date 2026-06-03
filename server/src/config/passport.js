const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;

const User = require("../models/User");
console.log("CLIENT ID:", process.env.GOOGLE_CLIENT_ID);
console.log("CALLBACK URL:", process.env.GOOGLE_CALLBACK_URL);
console.log(
    "GOOGLE_CALLBACK_URL:",
    process.env.GOOGLE_CALLBACK_URL
);
passport.use(
    new GoogleStrategy(
        {
            clientID: process.env.GOOGLE_CLIENT_ID,
            clientSecret:
                process.env.GOOGLE_CLIENT_SECRET,
            callbackURL:
                process.env.GOOGLE_CALLBACK_URL,
        },
        async (
            accessToken,
            refreshToken,
            profile,
            done
        ) => {
            try {
                let user = await User.findOne({
                    googleId: profile.id,
                });

                if (user) {
                    return done(null, user);
                }

                user = await User.findOne({
                    email: profile.emails[0].value,
                });

                if (user) {
                    user.googleId = profile.id;
                    await user.save();
                    return done(null, user);
                }

                user = await User.create({
                    googleId: profile.id,
                    name: profile.displayName,
                    email: profile.emails[0].value,
                });

                done(null, user);
            } catch (error) {
                done(error, null);
            }
        }
    )
);

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser(
    async (id, done) => {
        const user = await User.findById(id);
        done(null, user);
    }
);

module.exports = passport;