const express = require("express");
const app = express();
const morgan = require("morgan");
const fs = require("fs");
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: true }));
// app.get("/", (req, res) => {
//   res.send("hello world");
// });

app.get("/api/v1/todos", (req, res) => {
  fs.readFile(`${__dirname}/dev-data 2/todos.json`, (err, data) => {
    if (err) {
      res.status(500).send(err);
    } else {
      let dataUsers = JSON.parse(data);
      res.status(200).json(dataUsers);
    }
  });
});
app.get("/api/v1/todos/:id", (req, res) => {
  let id = req.params.id;
  fs.readFile(`${__dirname}/dev-data 2/todos.json`, (err, data) => {
    if (err) {
      res.status(500).send(err);
    } else {
      let dataUsers = JSON.parse(data);
      let findId = dataUsers.find((e) => e.id == id);
      res.status(200).json(findId);
    }
  });
});
app.post("/api/v1/todos", (req, res) => {
  let createTodo = req.body;
  console.log(createTodo);
  fs.readFile(`${__dirname}/dev-data 2/todos.json`, (err, data) => {
    if (err) {
      res.status(500).send(err);
    } else {
      let readFileId = JSON.parse(data);
      let todos = readFileId.find((e) => createTodo.title == e.title);
      if (!todos) {
        let newTodo = {
          ...req.body,
          id: Number(req.body.id),
        };
        readFileId.push(newTodo);
        fs.writeFile(
          `${__dirname}/dev-data 2/todos.json`,
          JSON.stringify(readFileId),
          (err) => {
            if (err) {
              throw err;
            } else {
              res.status(200).json({ message: "Create Successfully" });
            }
          }
        );
      } else {
        res.status(200).json({ message: "Todo already exists" });
      }
    }
  });
});
app.put("/api/v1/todos/:id", (req, res) => {
  let put = req.body;
  let dataId = req.params.id;
  // console.log(dataParams);
  fs.readFile(`${__dirname}/dev-data 2/todos.json`, (err, data) => {
    let fileData = JSON.parse(data);
    // console.log(fileData);
    let idData = fileData.find((e) => e.id == dataId);
    // console.log(idData);
    if (idData) {
      let newData = {
        ...req.body,
        id: Number(req.idData),
      };
      fileData.push(newData);
      fs.writeFile(
        `${__dirname}/dev-data 2/todos.json`,
        JSON.stringify(fileData),
        (err) => {
          if (err) {
            console.log("error", err);
            return;
          } else {
            res.status(200).json({ message: "Update successfully" });
          }
        }
      );
    } else {
      res.status(200).json({ message: "todos not found" });
    }
  });
});

app.delete("/api/v1/todos/:id", (req, res) => {
  let dataDel = req.params.id;
  //   console.log(dataDel);
  fs.readFile(`${__dirname}/dev-data 2/todos.json`, (err, data) => {
    let fileData = JSON.parse(data);
    // console.log(fileData);
    const deleted = fileData.find((e) => e.id == dataDel);
    // console.log(idData);
    if (deleted) {
      let index = fileData.indexOf(deleted);
      fileData[index] = fileData;
      console.log(fileData[index]);
      fileData.splice(index, 1);
      fs.writeFile(
        `${__dirname}/dev-data 2/todos.json`,
        JSON.stringify(fileData),
        (err) => {
          if (err) throw err;

          res.status(200).json({ message: "Question success" });
        }
      );
      //   res.send(fileData.splice(deleted, 1));
    } else {
      res.status(404).json({ message: "Question not found" });
    }
  });
});

app.get("/", (req, res) => {
  res.status(200).sendFile(`${__dirname}/public/index.html`);
});

app.listen(3000, () => {
  console.log(" server running on http://127.0.0.1:3000");
});
