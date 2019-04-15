import React, { Component } from "react";
import CreateJob from "./Components/CreateJob/CreateJob";
import { sp } from "@pnp/sp";

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
      <div className="p-2">
        <CreateJob />
      </div>
    );
  }
}

export default App;
