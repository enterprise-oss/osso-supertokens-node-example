import './App.css';
import SuperTokens, { getSuperTokensRoutesForReactRouterDom } from "supertokens-auth-react"
import EmailPassword from "supertokens-auth-react/recipe/emailpassword";
import Session from "supertokens-auth-react/recipe/session";
import Home from "./Home";
import { Switch, BrowserRouter as Router, Route } from "react-router-dom";
import Footer from "./Footer";

const apiPort = process.env.API_PORT || 3001;
const apiUrl = process.env.API_URL || `http://localhost:${apiPort}`;
const websitePort = process.env.WEBSITE_PORT || 3000;
const websiteUrl = process.env.WEBSITE_URL || `http://localhost:${websitePort}`;

SuperTokens.init({
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


function App() {
  return (
    <div className="App">
      <Router>
        <div className="fill">
          <Switch>
            {getSuperTokensRoutesForReactRouterDom()}
            <Route path="/">
              <Home />
            </Route>
          </Switch>
        </div>
        <Footer />
      </Router >
    </div>
  );
}

export default App;
