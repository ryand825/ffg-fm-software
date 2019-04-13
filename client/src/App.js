import React, { Component } from "react";
import CreateJob from "./Components/CreateJob/CreateJob";
import { UserAgentApplication } from "msal";
import axios from "axios";

import config from "./api/config";
import { getUserDetails, batchModelsByIds } from "./api/graphService";

class App extends Component {
  constructor(props) {
    super(props);

    this.userAgentApplication = new UserAgentApplication(
      config.appId,
      config.authority,
      null
    );

    var user = this.userAgentApplication.getUser();

    this.state = {
      isAuthenticated: user !== null,
      user: {},
      error: null
    };

    if (user) {
      // Enhance user object with data from Graph
      this.getUserProfile();
    }
  }

  async login() {
    try {
      await this.userAgentApplication.loginPopup(config.scopes);
      await this.getUserProfile();
    } catch (err) {
      console.log(err);
    }
  }

  async getUserProfile() {
    try {
      // Get the access token silently
      // If the cache contains a non-expired token, this function
      // will just return the cached token. Otherwise, it will
      // make a request to the Azure OAuth endpoint to get a token

      var accessToken = await this.userAgentApplication.acquireTokenSilent(
        config.scopes,
        config.authority
      );

      if (accessToken) {
        // Get the user's profile from Graph
        var user = await getUserDetails(accessToken);
        this.setState({
          isAuthenticated: true,
          user: {
            displayName: user.displayName,
            email: user.mail || user.userPrincipalName
          },
          error: null
        });
      }
    } catch (err) {
      console.log(err);
      var error = {};
      if (typeof err === "string") {
        var errParts = err.split("|");
        error =
          errParts.length > 1
            ? { message: errParts[1], debug: errParts[0] }
            : { message: err };
      } else {
        error = {
          message: err.message,
          debug: JSON.stringify(err)
        };
      }

      this.setState({
        isAuthenticated: false,
        user: {},
        error: error
      });
    }
  }

  getLocations() {
    axios
      .get("https://graph.microsoft.com/v1.0/me/")
      .then(res => console.log(res));
  }

  render() {
    return (
      <div className="p-2">
        <CreateJob />
        <button onClick={this.login.bind(this)}>Login</button>
        <button onClick={this.getLocations.bind(this)}>test</button>
        {/* <Auth /> */}
      </div>
    );
  }
}

export default App;
