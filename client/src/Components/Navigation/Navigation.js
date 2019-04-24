import React, { useState } from "react";
import { Link } from "@reach/router";
import {
  Navbar,
  Nav,
  NavDropdown,
  Form,
  FormControl,
  Button
} from "react-bootstrap";

import NavLink from "./NavLink";

function Navigation() {
  const [searchField, setSearchField] = useState("");

  return (
    <Navbar bg="light" expand="lg">
      <Link to="/">
        <Navbar.Brand>ffg-FM</Navbar.Brand>
      </Link>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          {/* <ButtonToolbar> */}
          {/* <Nav.Link>Home</Nav.Link> */}

          {/* <Navbar.Text> */}
          <NavLink to="/sites/devnet/test/index.aspx/home">Home</NavLink>
          {/* </Navbar.Text> */}
          {/* <Navbar.Text> */}
          <NavLink to="/sites/devnet/test/index.aspx/create-job">
            Create Job
          </NavLink>
          <NavLink to="/sites/devnet/test/index.aspx/job-list">
            Job List
          </NavLink>
          {/* </Navbar.Text> */}
          <NavDropdown title="Dropdown" id="basic-nav-dropdown">
            <NavDropdown.Item>Action</NavDropdown.Item>
            <NavDropdown.Item>Another action</NavDropdown.Item>
            <NavDropdown.Item>Something</NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item>Separated link</NavDropdown.Item>
          </NavDropdown>
          {/* </ButtonToolbar> */}
        </Nav>
        <Form inline>
          <FormControl
            value={searchField}
            onChange={e => setSearchField(e.target.value)}
            type="text"
            placeholder="Search"
            className="mr-sm-2"
          />
          <Button variant="outline-success">Search</Button>
        </Form>
      </Navbar.Collapse>
    </Navbar>
  );
}

export default Navigation;
