const express = require("express");
var Datastore = require("nedb");
const db = new Datastore({
  filename: "./notes.db",
  autoload: true,
});
const app = express();
const port = process.env.PORT;

app.listen(port, () => {
  console.log(`Notes app listening at http://localhost:${port}`);
});

app.use("/noteIt", express.static("public"));
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
  const timestamp = Date.now();
  const timeString = new Date(timestamp).toTimeString().split(" ")[0];
  if (data.getPost == "post") {
    db.update(
      { name: data.name },
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
    const user = request.body;
    const username = user.name;
    db.find({ name: username }, (err, docs) => {
      if (err) throw err;
      const data = docs;
      const res = {
        notes: data[0].notes,
      };
      response.json(res);
    });
  }
});

app.post("/new", (request, response) => {
  const data = request.body;
  const username = data.name;
  const userpass = data.pass;
  const new_user = data.new;
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
        user = {
          name: username,
          password: userpass,
          joined: dateString,
          notes: [],
        };
        db.insert(user);
      } else {
        response.json({
          name: username,
          availibility: false,
        });
      }
    });
  } else {
    db.find({ name: username }, (err, docs) => {
      if (err) throw err;

      if (docs == "") {
        response.json({
          name: username,
          account_present: false,
          password_match: null,
        });
      } else {
        const database_name = docs[0].name;
        const database_password = docs[0].password;
        if (database_password == data.pass) {
          response.json({
            name: username,
            account_present: true,
            password_match: true,
          });
        } else {
          response.json({
            name: username,
            account_present: true,
            password_match: false,
          });
        }
      }
    });
  }
});

app.post("/remove", (request, response) => {
  const data = request.body;
  if (data.remove == true) {
    db.update(
      { name: data.name },
      { $pull: { notes: { topic: data.topic, note: data.note } } }
    );
  }
  response.json({
    removed: "done",
    topic: data.topic,
  });
});

app.get("/io", (req, res) => {
  const user = req.body;
  const username = user.name;
  db.find({ name: username }, (err, docs) => {
    if (err) throw err;
    const data = docs;
    const response = {
      notes: data[0].notes,
    };
    res.json(response);
  });
});
