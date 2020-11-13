const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const helmet = require("helmet");
let supertokens = require("supertokens-node");
let Session = require("supertokens-node/recipe/session");
let EmailPassword = require("supertokens-node/recipe/emailpassword");

const apiPort = process.env.API_PORT || 3001;
const apiUrl = process.env.API_URL || `http://localhost:${apiPort}`;
const websitePort = process.env.WEBSITE_PORT || 3000;
const websiteUrl = process.env.WEBSITE_URL || `http://localhost:${websitePort}`;

supertokens.init({
    supertokens: {
        connectionURI: "http://localhost:3567",
    },
    appInfo: {
        appName: "SuperTokens Demo App",
        apiDomain: apiUrl,
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
app.use(supertokens.middleware());

// custom API that requires session verification
app.get("/sessioninfo", Session.verifySession(), async (req, res) => {
    let session = req.session;
    res.send({
        sessionHandle: session.getHandle(),
        userId: session.getUserId(),
        jwtPayload: session.getJWTPayload(),
        sessionData: await session.getSessionData(),
    });
});


app.use(supertokens.errorHandler());

app.listen(apiPort, () => console.log(`API Server listening on port ${apiPort}`));