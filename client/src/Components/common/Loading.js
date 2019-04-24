import React from "react";
import { Spinner, Collapse, Row } from "react-bootstrap";

function Loading(props) {
  const { isLoading, children } = props;

  if (isLoading) {
    return (
      <Row className="d-flex text-center justify-content-md-center">
        <Spinner
          className="m-auto"
          style={{ width: "4rem", height: "4rem" }}
          animation="border"
        />
      </Row>
    );
  } else {
    return (
      <Collapse appear in={!isLoading}>
        {children}
      </Collapse>
    );
  }
}

export default Loading;
