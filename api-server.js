const axios = require("axios");
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const helmet = require("helmet");
require('dotenv').config();
let supertokens = require("supertokens-node");
let Session = require("supertokens-node/recipe/session");
let ThirdParty = require("supertokens-node/recipe/thirdparty");

const apiPort = process.env.REACT_APP_API_PORT || 3001;
const apiDomain = process.env.REACT_APP_API_URL || `http://localhost:${apiPort}`;
const websitePort = process.env.REACT_APP_WEBSITE_PORT || 3000;
const websiteDomain = process.env.REACT_APP_WEBSITE_URL || `http://localhost:${websitePort}`

supertokens.init({
    supertokens: {
        connectionURI: "https://try.supertokens.io",
    },
    appInfo: {
        appName: "SuperTokens Demo App",
        apiDomain,
        websiteDomain
    },
    recipeList: [
        ThirdParty.init({
            signInAndUpFeature: {
                providers: [
                    {
                        id: "osso",
                        get: async (redirectURI, authCodeFromRequest) => {
                            return {
                                accessTokenAPI: {
                                    url: `${process.env.OSSO_BASE_URL}/oauth/token`,
                                    params: {
                                        client_id:  process.env.OSSO_CLIENT_ID,
                                        client_secret:  process.env.OSSO_CLIENT_SECRET,
                                        grant_type: "authorization_code",
                                        redirect_uri: redirectURI,
                                        code: authCodeFromRequest,
                                    }
                                },
                                authorisationRedirect: {
                                    url: `${process.env.OSSO_BASE_URL}/oauth/authorize`,
                                    params: {
                                        client_id: process.env.OSSO_CLIENT_ID,
                                        response_type: "code",
                                        // email: 'sam@example.com'
                                    }
                                },
                                getProfileInfo: async (accessTokenAPIResponse) => {
                                    let authHeader = `Bearer ${accessTokenAPIResponse.access_token}`;
                                    let response = await axios({
                                        method: "get",
                                        url: `${process.env.OSSO_BASE_URL}/oauth/me`,
                                        headers: {
                                            Authorization: authHeader,
                                        },
                                    });
                                   
                                    return {
                                        id: response.data.id,
                                        email: {
                                            id: response.data.email, // emailID
                                            isVerified: true,
                                        }
                                    }
                                }
                            }
                        }
                    }
                ]
            }
        }),
        Session.init()
    ]
});

const app = express();


app.use(cors({
    origin: websiteDomain,
    allowedHeaders: ["content-type", ...supertokens.getAllCORSHeaders()],
    methods: ["GET", "PUT", "POST", "DELETE"],
    credentials: true,
}));

app.use(morgan("dev"));
app.use(helmet({
    contentSecurityPolicy: false,
}));
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

app.use((err, req, res, next) => {
    res.status(500).send("Internal error: " + err.message);
})

app.listen(apiPort, () => console.log(`API Server listening on port ${apiPort}`));