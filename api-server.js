const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const helmet = require("helmet");

const app = express();

const port = process.env.API_PORT || 3001;
const websitePort = process.env.WEBSITE_PORT || 3000;
const websiteUrl = process.env.WEBSITE_URL || `http://localhost:${websitePort}`;

app.use(morgan("dev"));
app.use(helmet());
app.use(cors({ origin: websiteUrl }));


app.listen(port, () => console.log(`API Server listening on port ${port}`));