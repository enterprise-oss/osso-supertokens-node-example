import './App.css';
import SuperTokens, { getSuperTokensRoutesForReactRouterDom } from "supertokens-auth-react"
import EmailPassword from "supertokens-auth-react/recipe/emailpassword";
import Session from "supertokens-auth-react/recipe/session";
import Home from "./Home";
import { Switch, BrowserRouter as Router, Route } from "react-router-dom";
import Footer from "./Footer";

SuperTokens.init({
  appInfo: {
    appName: "SuperTokens Demo App",
    apiDomain: "http://localhost:3001",
    websiteDomain: "http://localhost:3000"
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
