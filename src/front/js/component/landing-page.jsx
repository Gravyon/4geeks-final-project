import React, { Component } from "react";
import { Link } from "react-router-dom";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";

export const LandingPage = () => {
  return (
    <div>
      <Card style={{ width: "18rem" }}>
        <Card.Img variant="top" src="holder.js/100px180" />
        <Card.Body>
          <Card.Title>Frame Title</Card.Title>
          <Card.Text>
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Qui sit
            perferendis tenetur inventore, quos, eius ducimus iste molestiae
            excepturi perspiciatis veniam ut eum aliquid illum? Porro corrupti
            quaerat odit eos.
          </Card.Text>
          <Button variant="primary">Read More...</Button>
        </Card.Body>
      </Card>
    </div>
  );
};
