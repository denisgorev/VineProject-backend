const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const multer = require('multer')
require('dotenv').config()
const path = require('path')

const dcRoutes = require("./routes/dc-routes");

const app = express();

app.use(bodyParser.json());

app.use('/upload/images', express.static(path.join('upload', 'images')))

app.use((req, res, next) => {
	res.setHeader("Access-Control-Allow-Origin", "*");
	res.setHeader(
		"Access-Control-Allow-Headers",
		"Origin, X-Requested-With, Content-Type, Accept, Authorization"
	);
	res.setHeader("Access-Control-Allow-Methods", "*");
	next();
});

app.use("/api/drinks", dcRoutes);

app.use((req, res, next) => {
	console.log("ошибка");
});

app.use((error, req, res, next) => {
	console.log(error);
});

mongoose
	.connect(
		process.env.MONGO_CREDS,
		{ useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false }
	)
	.then(() => {
		console.log("connection established");
		app.listen(5000, () => console.log("Server is started"));
	})
	.catch((err) => console.log(err));
