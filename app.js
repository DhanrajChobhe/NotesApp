const express = require("express");
const bcrypt = require("bcryptjs");
const dotenv = require("dotenv");
const jwt = require("jsonwebtoken");

dotenv.config();

var Datastore = require("nedb");
const db = new Datastore({
  filename: "./notes.db",
  autoload: true,
});
const app = express();
const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Notes app listening at http://localhost:${port}`);
});

app.use("/user", express.static("public"));
app.use(
  express.json({
    limit: "10mb",
  })
);

const timestamp = Date.now();
const dateString = new Date(timestamp).toDateString();
const timeString = new Date(timestamp).toTimeString().split(" ")[0];

app.post("/io", (request, response) => {
  const data = request.body;
  const headers = request.headers.authorization;
  console.log("headers" + headers);
  const token = headers.split(" ")[1];
  console.log("token" + token);
  const result = verifytoken(token, process.env.S_K);
  console.log("r " + result);
  if (result !== "") {
    console.log("1");
    const timestamp = Date.now();
    const timeString = new Date(timestamp).toTimeString().split(" ")[0];
    if (data.getPost == "post") {
      console.log("1");
      db.update(
        { name: result },
        {
          $push: {
            notes: {
              $each: [
                {
                  date: dateString,
                  topic: data.topic,
                  note: data.note,
                  time: timeString,
                },
              ],
            },
          },
        }
      );
      response.json({
        status: "success",
        date: dateString,
        timestamp: timeString,
        topic: data.topic,
        note: data.note,
        append: "done",
      });
    } else if (data.getPost == "get") {
      // const user = request.body;
      // const username = user.name;
      db.find({ name: result }, (err, docs) => {
        if (err) throw err;
        const data = docs;
        const res = {
          notes: data[0].notes,
        };
        response.json(res);
      });
    }
  }
});

app.post("/new", (request, response) => {
  const data = request.body;
  console.log(data);

  const username = data.name;
  // const userpass = data.pass;
  const new_user = data.new;
  console.log(new_user);
  const timestamp = Date.now();
  const timeString = new Date(timestamp).toTimeString().split(" ")[0];
  if (new_user == true) {
    db.find({ name: username }, (err, docs) => {
      if (err) throw err;
      if (docs == "") {
        response.json({
          name: username,
          availibility: true,
        });

        bcrypt.genSalt(10, function (err, salt) {
          if (err) throw err;
          bcrypt.hash(data.pass, salt, function (err, hash) {
            if (err) throw err;
            const hashed = hash;
            user = {
              name: username,
              password: hashed,
              joined: dateString,
              notes: [],
            };
            db.insert(user);
          });
        });
      } else {
        response.json({
          name: username,
          availibility: false,
        });
      }
    });
  } else if (new_user == false) {
    db.find({ name: username }, (err, docs) => {
      if (err) throw err;

      if (docs == "") {
        response.json({
          name: username,
          account_present: false,
          password_match: null,
        });
      } else {
        bcrypt.compare(data.pass, docs[0].password, function (err, res) {
          if (err) throw err;

          if (res) {
            jwt.sign(
              { name: username },
              process.env.S_K,
              { algorithm: "HS256" },
              function (err, token) {
                if (err) {
                  console.log(err);
                }
                const tok = token;
                console.log(tok);
                response.json({
                  token: tok,
                  account_present: true,
                  password_match: true,
                });
                // response.redirect("http://localhost:3000/user/noteIt");
              }
            );
          } else {
            jwt.sign(
              { name: username },
              process.env.S_K,
              { algorithm: "HS256" },
              function (err, token) {
                const tok = token;
                response.json({
                  token: tok,
                  account_present: true,
                  password_match: false,
                });
              }
            );
          }
        });
      }
    });
  }
});

app.post("/remove", (request, response) => {
  const data = request.body;
  const headers = request.headers.authorization;
  console.log("headers" + headers);
  const token = headers.split(" ")[1];
  console.log("token" + token);
  const result = verifytoken(token, process.env.S_K);
  console.log("r " + result);

  if (data.remove == true && result !== "") {
    db.update(
      { name: result },
      { $pull: { notes: { topic: data.topic, note: data.note } } }
    );
  }
  response.json({
    removed: "done",
    topic: data.topic,
  });
});

// app.get("/io", (req, res) => {
//   const user = req.body;
//   const username = user.name;
//   db.find({ name: username }, (err, docs) => {
//     if (err) throw err;
//     const data = docs;
//     const response = {
//       notes: data[0].notes,
//     };
//     res.json(response);
//   });
// });
function verifytoken(token, secret) {
  const verresult = jwt.verify(token, secret, function (err, decoded) {
    if (err) console.log(err);
    console.log("decoded " + decoded);
    const user = decoded.name;
    console.log("user" + user);
    return user;
  });
  return verresult;
}
