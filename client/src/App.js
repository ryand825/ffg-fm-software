import React, { Component } from "react";
import { Router } from "@reach/router";
import { sp } from "@pnp/sp";

import Navigation from "./Components/Navigation/Navigation";
import CreateJob from "./Components/CreateJob/CreateJob";
import JobList from "./Components/JobList/JobList";
import EditJob from "./Components/EditJob/EditJob";

class App extends Component {
  onInit() {
    return super.onInit().then(_ => {
      // other init code may be present
      sp.setup({
        spfxContext: this.context
      });
    });
  }
  componentDidMount() {
    const baseUrl =
      process.env.NODE_ENV === "development"
        ? "https://localhost:4323/sites/devnet/"
        : "https://ffgoffice.sharepoint.com/sites/devnet/";

    sp.setup({
      sp: {
        headers: {
          Accept: "application/json;odata=verbose"
        },
        baseUrl
      }
    });
  }

  render() {
    return (
      <>
        <Navigation />
        <div className="p-2">
          <Router>
            <CreateJob path="/sites/devnet/test/index.aspx/create-job" />
            <JobList path="/sites/devnet/test/index.aspx/job-list" />
            <EditJob path="/sites/devnet/test/index.aspx/edit-job/:jobId" />
          </Router>
        </div>
      </>
    );
  }
}

export default App;
