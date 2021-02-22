import './App.css';
import SuperTokens, { getSuperTokensRoutesForReactRouterDom } from "supertokens-auth-react"
import ThirdParty, { ThirdPartyAuth } from "supertokens-auth-react/recipe/thirdparty";
import Session from "supertokens-auth-react/recipe/session";
import Home from "./Home";
import { Switch, BrowserRouter as Router, Route } from "react-router-dom";
import Footer from "./Footer";

export function getApiDomain() {
  const apiPort = process.env.REACT_APP_API_PORT || 3001;
  const apiUrl = process.env.REACT_APP_API_URL || `http://localhost:${apiPort}`;
  return apiUrl;
}

export function getWebsiteDomain() {
  const websiteUrl = process.env.REACT_APP_WEBSITE_URL || `http://localhost:3000`;
  return websiteUrl;
}

SuperTokens.init({
  appInfo: {
    appName: "SuperTokens Demo App",
    apiDomain: getApiDomain(),
    websiteDomain: getWebsiteDomain()
  },
  recipeList: [
    ThirdParty.init({
      signInAndUpFeature: {
        providers: [
          {
            id: "osso",
            name: "SAML SSO"
        }
        ]
      },
    }),
    Session.init()
  ]
});


function App() {
  return (
    <div className="App">
      <Router>
        <div className="fill">
          <Switch>
            {getSuperTokensRoutesForReactRouterDom()}
            <Route path="/">
              <ThirdPartyAuth>
                <Home />
              </ThirdPartyAuth>
            </Route>
          </Switch>
        </div>
        <Footer />
      </Router >
    </div>
  );
}

export default App;
