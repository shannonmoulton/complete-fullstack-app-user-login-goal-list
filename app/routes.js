module.exports = function (app, passport, db, listItemModel, ObjectId) {
  app.get("/", function (req, res) {
    res.render("index.ejs");
  });

  // app.get("/profile", isLoggedIn, function (req, res) {
  //   db.collection("listItems")
  //     .find({ ownerId: req.user._id.valueOf() })
  //     .toArray((err, result) => {
  //       if (err) return console.log(err);
  //       res.render("profile.ejs", {
  //         user: req.user,
  //         listItems: result,
  //       });
  //     });
  // });

  app.get("/profile", isLoggedIn, async function (req, res) {
    var response = await listItemModel
      .find({ ownerId: req.user._id.valueOf() })
      .then((response) => {
        console.log(response);
        return response;
      });
    return res.render("profile.ejs", {
      user: req.user,
      listItems: response,
    });
  });

  app.get("/logout", function (req, res) {
    req.logout();
    res.redirect("/");
  });

  app.get("/create", isLoggedIn, function (req, res) {
    db.collection("listitems")
      .find()
      .toArray((err, result) => {
        if (err) return console.log(err);
        res.render("create.ejs", {
          user: req.user,
          listItems: result,
        });
      });
  });

  app.post("/profile", (req, res) => {
    var listItem = new listItemModel();
    listItem.ownerId = req.user._id;
    listItem.category = req.body.category;
    listItem.idea = req.body.idea;
    listItem.notes = req.body.notes;
    listItem.completed = false
    var response = listItem
      .save()
      .then((response) => {
        return response;
      })
      .catch((error) => {
        console.log(error);
        return error;
      });
    return res.redirect("/profile");
  });

  app.put('/update', (req, res) => {
    db.collection('listitems')
    .findOneAndUpdate({_id: ObjectId(req.body.id)}, {
      $set: {
        completed: true
      }
    }, {
      sort: {_id: -1},
      upsert: true
    }, (err, result) => {
      if (err) return res.send(err)
      res.send(result)
    })
  })

  app.delete("/listItems", (req, res) => {
    db.collection("listitems").findOneAndDelete(
      {
        _id: ObjectId(req.body.id)
        
      },
      (err, result) => {
        if (err) return res.send(500, err);
        res.send("Message deleted!");
      }
    );
  });

  app.get("/login", function (req, res) {
    res.render("login.ejs", { message: req.flash("loginMessage") });
  });

  app.post(
    "/login",
    passport.authenticate("local-login", {
      successRedirect: "/profile",
      failureRedirect: "/login",
      failureFlash: true,
    })
  );

  app.get("/signup", function (req, res) {
    res.render("signup.ejs", { message: req.flash("signupMessage") });
  });

  app.post(
    "/signup",
    passport.authenticate("local-signup", {
      successRedirect: "/profile",
      failureRedirect: "/signup",
      failureFlash: true,
    })
  );

  app.get("/unlink/local", isLoggedIn, function (req, res) {
    var user = req.user;
    user.local.email = undefined;
    user.local.password = undefined;
    user.save(function (err) {
      res.redirect("/profile");
    });
  });
};

function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) return next();

  res.redirect("/");
}
