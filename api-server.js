const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const helmet = require("helmet");
let supertokens = require("supertokens-node");
let Session = require("supertokens-node/recipe/session");
let EmailPassword = require("supertokens-node/recipe/emailpassword");

const port = process.env.API_PORT || 3001;
const websitePort = process.env.WEBSITE_PORT || 3000;
const websiteUrl = process.env.WEBSITE_URL || `http://localhost:${websitePort}`;

supertokens.init({
    supertokens: {
        connectionURI: "http://localhost:3567",
    },
    appInfo: {
        appName: "SuperTokens Demo App",
        apiDomain: "http://localhost:" + port,
        websiteDomain: websiteUrl
    },
    recipeList: [
        EmailPassword.init(),
        Session.init()
    ]
});

const app = express();


app.use(cors({
    origin: websiteUrl,
    allowedHeaders: ["content-type", ...supertokens.getAllCORSHeaders()],
    methods: ["GET", "PUT", "POST", "DELETE"],
    credentials: true,
}));

app.use(morgan("dev"));
app.use(helmet());
app.use(cors({ origin: websiteUrl }));
app.use(supertokens.middleware());

// TODO: Custom route

app.use(supertokens.errorHandler())

app.listen(port, () => console.log(`API Server listening on port ${port}`));