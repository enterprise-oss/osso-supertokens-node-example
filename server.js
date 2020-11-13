const express = require("express");
const morgan = require("morgan");
const helmet = require("helmet");
const { join } = require("path");

const app = express();

const apiPort = process.env.API_PORT || 3001;
const apiUrl = process.env.API_URL || `http://localhost:${apiPort}`;
const websitePort = process.env.WEBSITE_PORT || 3000;
const websiteUrl = process.env.WEBSITE_URL || `http://localhost:${websitePort}`;

app.use(morgan("dev"));
app.use(helmet());
app.use(express.static(join(__dirname, "build")));

app.listen(websitePort, () => console.log(`Server listening on port ${websitePort}`));