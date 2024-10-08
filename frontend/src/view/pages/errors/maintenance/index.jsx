import React from "react";
import { Link } from "react-router-dom";

import { Row, Col, Button } from "antd";

import Line from "../line";
import Header from "../header";
import Footer from "../footer";

export default function Maintenance() {
  return (
    <Row className="hp-text-center hp-overflow-hidden">
      <Line />
      
      <Header />

      <Col className="hp-error-content hp-py-32" span={24}>
        <Row className="hp-h-100" align="middle" justify="center">
          <Col>
            <h2 className="h1 hp-mb-16">Under Maintenance!</h2>

            <p className="hp-mb-32 hp-p1-body hp-text-color-black-100 hp-text-color-dark-0">We are trying to fix the problem.</p>

            <Link to="/">
              <Button type="primary">Back to Home</Button>
            </Link>
          </Col>
        </Row>
      </Col>

    </Row>
  );
}