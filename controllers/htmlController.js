// Requiring path to so we can use relative routes to our HTML files
const router = require("express").Router();
const db = require("../models");

// Requiring our custom middleware for checking if a user is logged in
const isAuthenticated = require("../config/middleware/isAuthenticated");

/**
 * Home Page
 */
router.get("/", function(req, res) {
  res.render("index", { user: req.user });
});

/**
 * Home Page, again
 */
router.get("/home", function(req, res) {
  res.render("index", { user: req.user });
});

/**
 * Signup page
 */
router.get("/signup", function(req, res) {
  if (req.user) {
    res.redirect("/");
  } else {
    res.render("signup", { user: req.user });
  }
});

/**
 * Login page
 */
router.get("/login", function(req, res) {
  if (req.user) {
    res.redirect("/");
  } else {
    res.render("login", { user: req.user });
  }
});

/**
 * Get comment creation page for testing purposes only*******
 */
router.get("/comment", isAuthenticated, function(req, res) {
  res.render("comment", { user: req.user });
});

// Only need to be logged in to post a comment not see them (forum = comment)******
/**
 * Forum Page -
 * Notice loading our posts, with that include!
 */
router.get("/forum", isAuthenticated, function(req, res) {
  db.Post.findAll({ raw: true, include: [db.User] }) // Joins User to Posts! And scrapes all the seqeulize stuff off
    .then(dbModel => {
      res.render("forum", { user: req.user, posts: dbModel });
    })
    .catch(err => res.status(422).json(err));
});

/**
 * Profile page
 */
router.get("/profile", isAuthenticated, function(req, res) {
  res.render("profile", { user: req.user });
});

// ***** Might need to get all pets or posts and send them in the res.render as well for the routes ****
/**
 * Lost Pets page
 */
router.get("/view/lost", function(req, res) {
  db.Post.findAll({ where: { title: "Lost" }, raw: true, include: [db.Pet] })
    .then(dbModel => {
      console.log(dbModel); // Take out when done testing functionality
      res.render("viewLost", { user: req.user, posts: dbModel });
    })
    .catch(err => res.status(422).json(err));
});

/**
 * Found Pets page
 */
router.get("/view/found", function(req, res) {
  db.Post.findAll({ where: { title: "Found" }, raw: true, include: [db.Pet] })
    .then(dbModel => {
      res.render("viewFound", { user: req.user, posts: dbModel });
    })
    .catch(err => res.status(422).json(err));
});

/**
 * Post Lost Pets page
 */
router.get("/post/lost", isAuthenticated, function(req, res) {
  res.render("postLost", { user: req.user });
});

/**
 * Post Found Pets page
 */
router.get("/post/found", isAuthenticated, function(req, res) {
  res.render("postFound", { user: req.user });
});

/**
 * View Single Pet Page
 */
router.get("/view/pet", function(req, res) {
  res.render("viewPet", { user: req.user });
});

/**
 * Generic Error Page
 */
router.get("*", function(req, res) {
  res.render("errors/404", { user: req.user });
});

module.exports = router;
