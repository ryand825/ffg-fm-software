import React, { useState } from "react";
import { Link } from "@reach/router";
import { Button } from "react-bootstrap";

function NavLink(props) {
  const [active, setActive] = useState(false);

  return (
    <Link
      to={props.to}
      getProps={({ isCurrent }) => {
        // the object returned here is passed to the
        // anchor element's props
        setActive(isCurrent);
      }}
    >
      <Button className="mr-1 mb-1" variant={active ? "secondary" : "light"}>
        {props.children}
      </Button>
    </Link>
  );
}

export default NavLink;
