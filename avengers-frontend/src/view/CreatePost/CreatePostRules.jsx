import React, { Component } from "react";
import CardBody from "components/Card/CardBody.jsx";
import Card from "components/Card/Card.jsx";
import { Image, Table } from "react-bootstrap";

export default class extends Component {
  render() {
    return (
      <Card>
        <CardBody plain>
          <Table striped bordered>
            <thead>
              <tr>
                <th>
                  <Image src="/logo.png" rounded />
                </th>
                <th>Posting to Avengers: Rules</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>1</td>
                <td>Don't be judgemental</td>
              </tr>
              <tr>
                <td>2</td>
                <td>Act like a human</td>
              </tr>
              <tr>
                <td>3</td>
                <td>You can't post any text</td>
              </tr>
              <tr>
                <td>4</td>
                <td>Don't upload inappropriate pictures</td>
              </tr>
              <tr>
                <td>5</td>
                <td>Don't upload text-based images</td>
              </tr>
            </tbody>
          </Table>
        </CardBody>
      </Card>
    );
  }
}
