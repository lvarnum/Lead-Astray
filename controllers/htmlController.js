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
 * Profile page
 */
router.get("/profile", isAuthenticated, function(req, res) {
  // Join Posts to Pets and double join Location to the object
  db.Post.findAll({
    where: { UserId: req.user.id },
    raw: true,
    include: [{ model: db.Pet, include: [db.Location] }]
  }).then(dbModel => {
    // Check if the user has any posts before going to the profile
    if (dbModel.length !== 0) {
      // Set values to distinguish between elements of lost pets and found pets
      for (let i = 0; i < dbModel.length; i++) {
        if (dbModel[i]["Pet.name"] !== null) {
          dbModel[i].petName = true;
        }
        if (dbModel[i]["Pet.reward"] === 1) {
          dbModel[i].petReward = true;
        }
        if (dbModel[i]["Pet.microchip"] === 1) {
          dbModel[i].petMicrochip = true;
        }
      }
      // For formatting posts
      if (dbModel.length === 1) {
        dbModel.single = true;
      }
      res.render("profile", { user: req.user, dbModel });
    } else {
      res.render("profile", { user: req.user });
    }
  });
});

/**
 * Lost Pets page
 */
router.get("/view/lost", function(req, res) {
  // Find all Posts titled lost and join the Pet model then render the page
  db.Post.findAll({
    where: { title: "Lost" },
    raw: true,
    include: [db.Pet]
  })
    .then(dbModel => {
      res.render("viewLost", { user: req.user, posts: dbModel });
    })
    .catch(err => res.status(422).json(err));
});

/**
 * Found Pets page
 */
router.get("/view/found", function(req, res) {
  // Find all Posts titled found and join the Pet model then render the page
  db.Post.findAll({
    where: { title: "Found" },
    raw: true,
    include: [db.Pet]
  })
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
router.get("/view/pet/:id", function(req, res) {
  // Find the Post with the given id and join Pet and User models
  db.Post.findOne({
    where: { id: req.params.id },
    raw: true,
    include: [db.Pet, db.User]
  }).then(dbModel => {
    // Find the correct pet and join it's location then render the page
    db.Pet.findOne({
      where: { id: dbModel.PetId },
      raw: true,
      include: [db.Location]
    }).then(petModel => {
      res.render("viewPet", { user: req.user, dbModel, petModel });
    });
  });
});

/**
 * Generic Error Page
 */
router.get("*", function(req, res) {
  res.render("errors/404", { user: req.user });
});

module.exports = router;
