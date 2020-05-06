// These are our required libraries to make the server work.

import express from "express";
import fetch from "node-fetch";


//THIS IS NO LONGER IN USE AS BABEL HAS REPLACED IT.  WE USED TOOLING TO MAKE THE PROCESS EASIER
//const sqlite3 = require('sqlite3').verbose(); // We're including a server-side version of SQLite, the in-memory SQL server.
//const open = require(sqlite).open; // We're including a server-side version of SQLite, the in-memory SQL server.


//THIS IS A LIBRARY THAT WE ARE TAKING FROM SQLITE3
import sqlite3 from "sqlite3";
//THIS OPEN IS USED IN THE CODE BELOW.  
import { open } from "sqlite";
//THIS IMPORTS THE WRITEUSER FUNCTION FROM ANOTHER FILE.  WILL COMMENT OUT FOR NOW
//import writeUser from "./libraries/writeuser";

const dbSettings = {
  filename: "./tmp/database.db",
  driver: sqlite3.Database,
};

const app = express();
const port = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

//This is babel code.  Majority of data processing done here
async function writeUser(username, settings) {
  const db = await open(settings);
  await db.exec("CREATE TABLE IF NOT EXISTS user (name)");
  await db.exec('INSERT INTO user VALUES ("${username}")');
  const result = await db.each("SELECT * FROM user");
  console.log("Expected Result", result);
  return result;
}

//This is the old code/function that would have been used we not installed babel. 
function processDataForFrontEnd(req, res) {
  const baseURL = ""; // Enter the URL for the data you would like to retrieve here

  // Your Fetch API call starts here
  // Note that at no point do you "return" anything from this function -
  // it instead handles returning data to your front end at line 34.
  fetch(baseURL)
    .then((r) => r.json())
    .then((data) => {
      console.log(data);
      res.send({ data: data }); // here's where we return data to the front end
    })
    .catch((err) => {
      console.log(err);
      res.redirect("/error");
    });
}

// Syntax change - we don't want to repeat ourselves,
// or we'll end up with spelling errors in our endpoints.
//
app
  .route("/api")
  .get((req, res) => {
    // processDataForFrontEnd(req, res)
    (async () => {
      const db = await open(dbSettings);
      const result = await db.all("SELECT * FROM user");
      console.log("Expected result", result);
      res.json(result);
    })();
  })
  .put((req, res) => {
    console.log("/api post request", req.body);
    if (!req.body.name) {
      console.log(req.body);
      res.status("418").send("something went wrong, additionally i am a teapot");
    } else {
      writeUser(req.body.name, dbSettings)
      .then((result) => {
        console.log(result);
        res.send("your request was successful"); // simple mode
      })
      .catch((err) => {
        console.log(err);
      });
    }
  });

app.listen(port, () => {
  console.log(`Example app listening on port ${port}!`);
});
