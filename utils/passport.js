const passport = require("passport");
const { Strategy: LocalStrategy } = require("passport-local");
const { Strategy: JWTStrategy, ExtractJwt } = require("passport-jwt");
const User = require("../models/User");

// Local Srategy authentication
passport.use(
  new LocalStrategy(
    async (username, password, done) => {
      try {
        const user = await User.findByEmailAndPassword(username, password);
        return done(null, user);
      } catch (err) {
        if (err.name === "AuthError")
          done(null, false, { message: err.message });
        done(err);
      }
    }
  )
);

// JWT Strategy authentication
const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromExtractors([
    ExtractJwt.fromAuthHeaderWithScheme("JWT"),
    (req) => req.cookies.accessToken,
  ]),
  secretOrKey: process.env.JWT_SECRET_KEY,
};

passport.use(
  new JWTStrategy(jwtOptions, async ({ id }, done) => {
    try {
      const user = await User.findById(id);
      if (!user) return done(null, false, { message: "Incorrect Credentials" });
      done(null, user);
    } catch (err) {
      console.log(err);
      if (err.name === "Error") {
        done(err);
      }
    }
  })
);
