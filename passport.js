import passport from "passport";
import GithubStrategy from "passport-github";
import User from "./models/User";

passport.use(User.createStrategy());

passport.use(new GithubStrategy({}));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
