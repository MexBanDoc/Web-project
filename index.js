// const express = require('express');
// const path = require('path');
import express from "express";
import path from "path";

const rootDir = process.cwd();
const port = 80;
// const addr = "194.87.214.109";
const addr = "127.0.0.1";
const app = express();

app.use("/static", express.static("static"));

app.use("/favicon.ico", express.static("static/favicon.ico"));

app.get("/*", (_, res) => {
  res.sendFile(path.join(rootDir, "/static/index.html"));
});

app.listen(port, addr, () => console.log(`App listening on ${addr}:${port}`));
