import React from "react";
import { signIn, getGraph } from "../../api/MSAuth";

function Auth() {
  return (
    <div>
      <button onClick={signIn}>Sign In</button>
      <button
        onClick={() =>
          getGraph("https://graph.microsoft.com/v1.0/me")
            .then(res => {
              console.log(res);
            })
            .catch(err => console.log(err))
        }
      >
        Get
      </button>
    </div>
  );
}

export default Auth;
